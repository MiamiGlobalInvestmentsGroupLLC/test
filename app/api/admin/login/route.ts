import { NextRequest } from 'next/server';
export const runtime = 'nodejs';
export async function POST(req: NextRequest){
  const { email, password } = await req.json();
  if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
    return new Response(JSON.stringify({ ok:true }), { status: 200, headers: { 'Set-Cookie': `admin=1; Path=/; HttpOnly; SameSite=Lax; Max-Age=86400` }});
  }
  return new Response(JSON.stringify({ error: 'INVALID' }), { status: 401 });
}
