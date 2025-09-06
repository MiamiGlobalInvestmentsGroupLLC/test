import Brand from "@/components/Brand";
import GradientButton from "@/components/GradientButton";

const plans = [
  {
    name: "Free",
    price: "$0",
    features: ["200 رسالة/شهر", "Widget + Iframe", "Watermark مطلوبة"],
    href: "https://miamiglobalgroup.com/pages/pricing?plan=free"
  },
  {
    name: "Standard",
    price: "$29",
    features: ["5,000 رسالة/شهر", "تحكم كامل في Pause/Resume", "دعم أساسي"],
    href: "https://miamiglobalgroup.com/pages/pricing?plan=standard"
  },
  {
    name: "Premium",
    price: "$99",
    features: ["50,000 رسالة/شهر", "خصائص متقدمة", "دعم أولوية"],
    href: "https://miamiglobalgroup.com/pages/pricing?plan=premium"
  }
];

export default function Plans(){
  return (
    <main className="min-h-screen p-6 md:p-10 bg-gradient-to-br from-pink-50 via-cyan-50 to-amber-50">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Brand />
          <a href="/"><GradientButton>Home</GradientButton></a>
        </div>

        <h1 className="text-4xl font-extrabold text-center mb-10 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500">
          اختر خطتك وادفع عبر متجرنا Shopify
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((p)=> (
            <div key={p.name} className="rounded-2xl p-6 bg-white/70 backdrop-blur border border-white/60 shadow-lg flex flex-col">
              <div className="text-2xl font-bold">{p.name}</div>
              <div className="text-4xl font-extrabold my-2">{p.price}</div>
              <ul className="text-slate-700 space-y-2 mb-6">
                {p.features.map((f,i)=>(<li key={i}>• {f}</li>))}
              </ul>
              <a href={p.href} target="_blank" className="mt-auto">
                <GradientButton className="w-full">اشترك الآن</GradientButton>
              </a>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
