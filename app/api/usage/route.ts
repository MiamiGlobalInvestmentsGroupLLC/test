import { prisma } from '@/lib/prisma';
export const runtime = 'nodejs';
export async function GET() {
  const today = new Date(); today.setHours(0,0,0,0);
  const monthKey = `${today.getFullYear()}-${today.getMonth()+1}`;
  const daily = await prisma.usage.aggregate({ _sum:{count:true}, where:{date:{gte:today}} });
  const monthly = await prisma.usage.aggregate({ _sum:{count:true}, where:{monthKey} });
  return Response.json({ daily: daily._sum.count ?? 0, monthly: monthly._sum.count ?? 0 });
}
