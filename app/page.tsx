'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { formatAssistantText } from '@/lib/format';

type Role = 'user'|'assistant'|'system';
type Msg = { role: Role; content: string };

export default function Page() {
  const [companyId, setCompanyId] = useState('demo');
  const [companyName, setCompanyName] = useState('MGI Demo');
  const [msgs, setMsgs] = useState<Msg[]>([{role:'assistant', content:'اهلاً 👋
كيف بقدر أساعدك اليوم؟
- اسأل عن خدمات شركتك
- اطلب عرض أسعار
- اطلب بريد التواصل'}]);
  const [input, setInput] = useState('');
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(()=>{ boxRef.current?.scrollTo({top:1e9, behavior:'smooth'}); },[msgs]);

  async function send() {
    if (!input.trim()) return;
    const next = [...msgs, { role:'user' as const, content: input }];
    setMsgs(next);
    setInput('');

    const res = await fetch('/api/chat', { method:'POST', body: JSON.stringify({ messages: next, companyId, companyName }) });
    const reader = res.body?.getReader(); const decoder = new TextDecoder(); let acc = '';
    setMsgs(m => [...m, { role:'assistant', content:'' }]);
    while (true) {
      const { value, done } = await reader!.read(); if (done) break;
      const chunk = decoder.decode(value, { stream:true });
      for (const line of chunk.split('\n')) {
        const trimmed = line.trim(); if (!trimmed.startsWith('data:')) continue;
        const payload = trimmed.replace(/^data:\s*/, ''); if (payload === '[DONE]') continue;
        try { const json = JSON.parse(payload); const delta = json.choices?.[0]?.delta?.content ?? '';
          if (delta) {
            acc += delta;
            setMsgs(m => { const c=[...m]; const last=c[c.length-1]; if (last&&last.role==='assistant'){ last.content = acc; } return c; });
          }
        } catch {}
      }
    }
  }

  const suggestions = useMemo(()=>['ما خدماتكم؟','كيف أتواصل معكم؟','بكم الاشتراك الشهري؟','هل تدعمون العربية والإنجليزية؟'],[]);

  return (
    <main className="card">
      <div style={{display:'grid', gap:12}}>
        <div style={{display:'flex', gap:8, flexWrap:'wrap'}}>
          <input className="input" value={companyId} onChange={e=>setCompanyId(e.target.value)} placeholder="Company ID" />
          <input className="input" style={{flex:1}} value={companyName} onChange={e=>setCompanyName(e.target.value)} placeholder="Company name" />
        </div>

        <div className="pills">
          {suggestions.map((s,i)=>(
            <span key={i} className="pill" onClick={()=>setInput(s)}>{s}</span>
          ))}
        </div>

        <div ref={boxRef} style={{border:'1px solid #1f2a44', borderRadius:16, padding:16, minHeight:320, maxHeight:420, overflowY:'auto', background:'#020617aa'}}>
          {msgs.filter(m=>m.role!=='system').map((m,i)=>(
            <div key={i} className={`chat-bubble ${m.role==='user'?'b-user':'b-assist'}`}>
              {m.role==='assistant' ? 
                <div dangerouslySetInnerHTML={{__html: formatAssistantText(m.content)}}/> :
                <div>{m.content}</div>
              }
            </div>
          ))}
        </div>

        <div style={{display:'flex', gap:8}}>
          <input className="input" style={{flex:1}} value={input} onChange={e=>setInput(e.target.value)} placeholder="اكتب رسالتك…"/>
          <button className="btn" onClick={send}>إرسال</button>
        </div>

        <p className="watermark">ملاحظة: العداد يعمل تلقائيًا عند ضبط متغير <code>DATABASE_URL</code> في Vercel.</p>
      </div>
    </main>
  );
}
