import { prisma } from '@/lib/prisma';
export const revalidate = 0;
export const runtime = 'nodejs';

async function getStats() {
  // Simple dummy aggregate to keep page SSR without params; in real usage, use company auth
  const today = new Date(); today.setHours(0,0,0,0);
  const monthKey = `${today.getFullYear()}-${today.getMonth()+1}`;
  const [daily, monthly, companies] = await Promise.all([
    prisma.usage.aggregate({ _sum: { count:true }, where: { date: { gte: today } } }),
    prisma.usage.aggregate({ _sum: { count:true }, where: { monthKey } }),
    prisma.company.count()
  ]);
  return { daily: daily._sum.count ?? 0, monthly: monthly._sum.count ?? 0, companies };
}

export default async function Dashboard() {
  const { daily, monthly, companies } = await getStats();
  return (
    <main className="card">
      <h1 style={{marginTop:0}}>لوحة التحكم — نظرة عامة</h1>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))', gap:16}}>
        <div className="card"><b>الشركات</b><div style={{fontSize:34, fontWeight:900}}>{companies}</div></div>
        <div className="card"><b>رسائل اليوم</b><div style={{fontSize:34, fontWeight:900}}>{daily}</div></div>
        <div className="card"><b>رسائل هذا الشهر</b><div style={{fontSize:34, fontWeight:900}}>{monthly}</div></div>
      </div>
      <p className="watermark">تعديل الحدود، الإيقاف/التشغيل، والعلامة المائية يتم من حساب <b>المدير فقط</b>.</p>
    </main>
  );
}
