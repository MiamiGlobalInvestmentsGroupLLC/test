"use client";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";

type Msg = { role: "user" | "assistant"; content: string };

export default function ChatFrame(){
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: "assistant", content: "أهلاً فيك! 👋\n\n- اسألني أي سؤال.\n- رح أرد بطريقة منظمة ونقاط واضحة.\n- شوف أسفل الصندوق العلامة المائية الصغيرة." }
  ]);
  const [input, setInput] = useState("");
  const [blocked, setBlocked] = useState<string|null>(null);
  const scRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => scRef.current?.scrollTo({ top: scRef.current.scrollHeight, behavior: "smooth" });

  useEffect(() => { scrollToBottom(); }, [msgs]);

  const send = async () => {
    if (!input.trim()) return;
    const u = await fetch("/api/usage", { cache: "no-store" }).then(r=>r.json());
    if (u.paused) { setBlocked("البوت موقوف مؤقتًا من قِبل المسؤول."); return; }
    if (u.daily >= u.dailyLimit) { setBlocked("وصلت للحد اليومي. جرّب بكرة ✋"); return; }
    if (u.monthly >= u.monthlyLimit) { setBlocked("وصلت للحد الشهري. حدّث باقتك 🙏"); return; }

    setBlocked(null);
    const userMsg = { role: "user", content: input };
    setMsgs(m=>[...m, userMsg]);
    setInput("");

    // increment usage
    await fetch("/api/usage", { method: "POST" });

    const res = await fetch("/api/chat", { method: "POST", body: JSON.stringify({ prompt: input }) });
    const data = await res.json();
    setMsgs(m=>[...m, { role: "assistant", content: data.text }]);
  };

  return (
    <main className="w-full h-[560px] bg-gradient-to-br from-pink-50 via-cyan-50 to-amber-50">
      <div className="h-14 flex items-center justify-between px-4 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 text-white">
        <div className="font-semibold">MGI Chat</div>
        <a className="text-xs opacity-90 hover:opacity-100 underline" target="_blank" href="https://miamiglobalgroup.com">This bot is created by Miami Global Investments Group</a>
      </div>
      <div ref={scRef} className="h-[420px] overflow-y-auto p-4 space-y-3">
        {msgs.map((m, i)=> (
          <div key={i} className={`max-w-[85%] rounded-2xl px-4 py-3 shadow ${m.role==="user" ? "ml-auto bg-white/90 border" : "bg-white/70 border border-white/60"}`}>
            <ReactMarkdown>{m.content}</ReactMarkdown>
          </div>
        ))}
        {blocked && <div className="text-pink-700 font-medium">{blocked}</div>}
      </div>
      <div className="h-[76px] p-3 flex items-center gap-2 border-t bg-white/80">
        <input value={input} onChange={e=>setInput(e.target.value)} placeholder="اكتب سؤالك..." className="flex-1 px-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-cyan-400" />
        <button onClick={send} className="px-5 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 transition-all hover:shadow-lg hover:scale-[1.02] active:scale-95">
          Send ✈️
        </button>
      </div>
    </main>
  );
}
