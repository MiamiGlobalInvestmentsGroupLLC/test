// app/dashboard/page.tsx
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function Dashboard() {
  const now = new Date();

  // بداية اليوم
  const startOfDay = new Date(now);
  startOfDay.setHours(0, 0, 0, 0);

  // بداية الشهر الحالي وبدايته الشهر الجاي (حد أعلى غير شامل)
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

  const [daily, monthly, companies] = await Promise.all([
    prisma.usage.count({
      where: { createdAt: { gte: startOfDay } },
    }),
    prisma.usage.count({
      where: { createdAt: { gte: startOfMonth, lt: startOfNextMonth } },
    }),
    prisma.company.count(),
  ]);

  return (
    <main
      style={{
        padding: 24,
        display: 'grid',
        gap: 16,
        fontFamily:
          '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial',
        background: '#0e1730',
        minHeight: '100vh',
        color: '#e6f2ff',
      }}
    >
      <h1 style={{ fontSize: 26, fontWeight: 800 }}>لوحة التحكم</h1>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 16,
        }}
      >
        <StatCard title="طلبات اليوم" value={daily} />
        <StatCard title="طلبات هذا الشهر" value={monthly} />
        <StatCard title="عدد الشركات" value={companies} />
      </div>
    </main>
  );
}

function StatCard({ title, value }: { title: string; value: number }) {
  return (
    <div
      style={{
        border: '1px solid #1f2a44',
        borderRadius: 12,
        padding: 16,
        background:
          'linear-gradient(135deg, rgba(36,99,235,.15) 0%, rgba(18,184,134,.10) 100%)',
      }}
    >
      <div style={{ opacity: 0.85, fontSize: 13 }}>{title}</div>
      <div style={{ fontSize: 28, fontWeight: 800, marginTop: 8 }}>{value}</div>
    </div>
  );
}
