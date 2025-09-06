import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';
export const runtime = 'nodejs';
export const revalidate = 0;

export default async function AdminConsole(){
  const isAdmin = cookies().get('admin')?.value === '1';
  if (!isAdmin) { return <main className="card">غير مصرح — الرجاء تسجيل الدخول.</main>; }
  const companies = await prisma.company.findMany({ orderBy: { createdAt: 'desc' } });
  return (
    <main className="card">
      <h1 style={{marginTop:0}}>لوحة المدير</h1>
      <p>من هنا يمكنك إنشاء شركة جديدة، تفعيل/إيقاف البوت، وتفعيل العلامة المائية.</p>
      <form action="/api/admin/create-company" method="post" style={{display:'grid',gap:8, gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))'}}>
        <input className="input" name="id" placeholder="Company ID" required />
        <input className="input" name="name" placeholder="Company Name" required />
        <input className="input" name="email" placeholder="Company Email" required />
        <input className="input" type="password" name="password" placeholder="Temp Password" required />
        <button className="btn" style={{gridColumn:'1/-1'}}>إنشاء شركة</button>
      </form>
      <h2>الشركات الحالية</h2>
      <div style={{display:'grid', gap:8}}>
        {companies.map(c=>(
          <div key={c.id} className="card" style={{background:'#050a18'}}>
            <b>{c.name}</b> <span style={{opacity:.7}}>(ID: {c.id})</span>
            <div style={{display:'flex', gap:8, marginTop:8, flexWrap:'wrap'}}>
              <form method="post" action="/api/admin/toggle" style={{display:'inline'}}>
                <input type="hidden" name="id" value={c.id} />
                <input type="hidden" name="field" value="isPaused" />
                <input type="hidden" name="value" value={String(!c.isPaused)} />
                <button className="btn">{c.isPaused ? 'Resume' : 'Pause'}</button>
              </form>
              <form method="post" action="/api/admin/toggle" style={{display:'inline'}}>
                <input type="hidden" name="id" value={c.id} />
                <input type="hidden" name="field" value="watermarkEnabled" />
                <input type="hidden" name="value" value={String(!c.watermarkEnabled)} />
                <button className="btn">{c.watermarkEnabled ? 'Disable Watermark' : 'Enable Watermark'}</button>
              </form>
            </div>
            <div className="watermark">اليومي: {c.dailyLimit} | الشهري: {c.monthlyLimit}</div>
          </div>
        ))}
      </div>
    </main>
  );
}
