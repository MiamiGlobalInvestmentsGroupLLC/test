import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
export const runtime = 'nodejs';

export async function POST(req: NextRequest){
  const isAdmin = req.cookies.get('admin')?.value === '1';
  if (!isAdmin) return new Response(JSON.stringify({ error:'NO_ADMIN' }), { status: 401 });
  const form = await req.formData();
  const id = String(form.get('id')||'');
  const name = String(form.get('name')||'');
  const email = String(form.get('email')||'');
  const password = String(form.get('password')||'');
  if (!id || !name || !email || !password) return new Response(JSON.stringify({ error:'Missing' }), { status: 400 });
  const hash = await bcrypt.hash(password, 10);
  await prisma.company.create({ data: { id, name, email, passwordHash: hash } });
  return new Response(null, { status: 302, headers: { Location: '/admin/console' } });
}
