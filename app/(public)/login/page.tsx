import Brand from "@/components/Brand";
import GradientButton from "@/components/GradientButton";
import Link from "next/link";

export default function LoginPage(){
  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 via-cyan-50 to-amber-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-bubble opacity-70 pointer-events-none" />
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="flex flex-col items-center text-center gap-8">
          <Brand />
          <h1 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500">
            MGI AI Chatbot
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl">
            أضِف بوت ذكي وملون لموقعك خلال دقائق — يجاوب باحتراف، منظم بإيموجيز ونقاط،
            مع عداد رسائل يومي/شهري، وWatermark مخصصة.
          </p>
          <div className="flex gap-4">
            <Link href="/dashboard">
              <GradientButton>Enter Dashboard</GradientButton>
            </Link>
            <Link href="/docs">
              <GradientButton>Docs</GradientButton>
            </Link>
            <Link href="/plans">
              <GradientButton>Plans</GradientButton>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="rounded-2xl p-6 bg-white/70 backdrop-blur border border-white/60 shadow-lg">
              <h3 className="font-bold text-xl mb-2">ألوان مبهجة</h3>
              <p className="text-slate-600">Gradients حديثة وBubbles متحركة تعطي إحساس حياة وحماس.</p>
            </div>
            <div className="rounded-2xl p-6 bg-white/70 backdrop-blur border border-white/60 shadow-lg">
              <h3 className="font-bold text-xl mb-2">تحكم كامل</h3>
              <p className="text-slate-600">Pause/Resume وحدود يومية وشهرية—مع تنبيهات أنيقة.</p>
            </div>
            <div className="rounded-2xl p-6 bg-white/70 backdrop-blur border border-white/60 shadow-lg">
              <h3 className="font-bold text-xl mb-2">دمج سريع</h3>
              <p className="text-slate-600">Widget/Embed يعمل فورًا على HTML/Shopify/Wix/WordPress/Google Sites.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
