// app/api/usage/route.ts
import { prisma } from '@/lib/prisma';

export const runtime = 'nodejs';

// يحسب الاستعمال اليومي والشهري بالاعتماد على createdAt في جدول Usage
export async function GET() {
  try {
    const now = new Date();

    // بداية اليوم (لتجميع اليوم)
    const startOfDay = new Date(now);
    startOfDay.setHours(0, 0, 0, 0);

    // بداية الشهر الحالي
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    // بداية الشهر القادم (حد أعلى غير شامل)
    const startOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

    const [dailyUsed, monthlyUsed] = await Promise.all([
      prisma.usage.count({
        where: {
          createdAt: { gte: startOfDay },
        },
      }),
      prisma.usage.count({
        where: {
          createdAt: { gte: startOfMonth, lt: startOfNextMonth },
        },
      }),
    ]);

    return Response.json({ daily: dailyUsed, monthly: monthlyUsed });
  } catch (err) {
    console.error('[USAGE_API_ERROR]', err);
    return Response.json({ daily: 0, monthly: 0 }, { status: 200 });
  }
}
