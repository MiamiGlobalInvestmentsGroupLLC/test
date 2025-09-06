'use client';
import { useState } from 'react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  async function login(){
    setMsg(''); 
    const res = await fetch('/api/admin/login', { method:'POST', body: JSON.stringify({ email, password }) });
    const j = await res.json(); 
    setMsg(res.ok ? 'تم تسجيل الدخول ✅' : ('خطأ: '+(j.error||'غير معروف')));
    if (res.ok) location.href = '/admin/console';
  }
  return (
    <main className="card" style={{maxWidth:520, margin:'0 auto'}}>
      <h1 style={{marginTop:0}}>تسجيل دخول المدير</h1>
      <input className="input" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
      <div style={{height:8}}/>
      <input className="input" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
      <div style={{height:12}}/>
      <button className="btn" onClick={login}>دخول</button>
      <div style={{marginTop:10, opacity:.8}}>{msg}</div>
    </main>
  );
}
