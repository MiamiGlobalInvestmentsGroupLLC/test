import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
export const runtime = 'nodejs';
export async function POST(req: NextRequest){
  const isAdmin = req.cookies.get('admin')?.value === '1';
  if (!isAdmin) return new Response(JSON.stringify({ error:'NO_ADMIN' }), { status: 401 });
  const form = await req.formData();
  const id = String(form.get('id'));
  const field = String(form.get('field'));
  const valueRaw = String(form.get('value'));
  const value = valueRaw === 'true';
  await prisma.company.update({ where: { id }, data: { [field]: value } as any });
  return new Response(null, { status: 302, headers: { Location: '/admin/console' } });
}
