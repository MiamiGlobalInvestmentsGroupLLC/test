"use client";
import Brand from "@/components/Brand";
import Stat from "@/components/Stat";
import GradientButton from "@/components/GradientButton";
import { useEffect, useState } from "react";

type Usage = {
  daily: number;
  monthly: number;
  dailyLimit: number;
  monthlyLimit: number;
  paused: boolean;
};

export default function Dashboard(){
  const [u, setU] = useState<Usage|null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    setLoading(true);
    const r = await fetch("/api/usage", { cache: "no-store" });
    const j = await r.json();
    setU(j);
    setLoading(false);
  };

  useEffect(() => { refresh(); }, []);

  const pause = async() => { await fetch("/api/usage", { method: "PATCH", body: JSON.stringify({ paused: true })}); refresh(); };
  const resume = async() => { await fetch("/api/usage", { method: "PATCH", body: JSON.stringify({ paused: false })}); refresh(); };

  const setDemoLimits = async() => {
    await fetch("/api/usage", { method: "PATCH", body: JSON.stringify({ dailyLimit: 25, monthlyLimit: 500 })});
    refresh();
  };

  return (
    <main className="min-h-screen p-6 md:p-10 bg-gradient-to-br from-pink-50 via-cyan-50 to-amber-50">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Brand />
          <div className="flex gap-3">
            <a href="/docs"><GradientButton>Docs</GradientButton></a>
            <a href="/plans"><GradientButton>Plans</GradientButton></a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Stat label="Today's Usage" value={u ? `${u.daily}/${u.dailyLimit}` : "..."} />
          <Stat label="Monthly Usage" value={u ? `${u.monthly}/${u.monthlyLimit}` : "..."} />
          <Stat label="Status" value={u?.paused ? "Paused" : "Active"} />
          <Stat label="Watermark" value="Enabled" />
        </div>

        <div className="rounded-2xl p-6 bg-white/70 backdrop-blur border border-white/60 shadow-lg mb-6">
          <h2 className="text-2xl font-bold mb-4">Bot Controls</h2>
          <div className="flex flex-wrap gap-3">
            <GradientButton onClick={pause}>Pause</GradientButton>
            <GradientButton onClick={resume}>Resume</GradientButton>
            <GradientButton onClick={setDemoLimits}>Set Demo Limits (25/day, 500/mo)</GradientButton>
          </div>
          <p className="text-sm text-slate-600 mt-3">
            * المستخدم يرى حدود الاستهلاك لكن لا يستطيع تعديلها. عند الوصول للحد، يتوقف البوت تلقائيًا.
          </p>
        </div>

        <div className="rounded-2xl p-6 bg-white/70 backdrop-blur border border-white/60 shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Embed & Widget</h2>
          <p className="text-slate-700 mb-2">ضع هذا السكربت في موقعك لعرض فقاعة دردشة عائمة:</p>
          <pre className="p-4 rounded-xl bg-white border border-white/70 overflow-x-auto text-sm">
{`<script async src="https://chat.miamiglobalgroup.com/embed/widget.js"></script>`}
          </pre>
          <p className="text-slate-700 mt-3">أو استخدم Iframe مباشرة:</p>
          <pre className="p-4 rounded-xl bg-white border text-sm overflow-x-auto">
{`<iframe src="https://chat.miamiglobalgroup.com/embed/frame" style="width:100%;height:600px;border:none" allow="clipboard-write; microphone; camera"></iframe>`}
          </pre>
        </div>
      </div>
    </main>
  );
}
