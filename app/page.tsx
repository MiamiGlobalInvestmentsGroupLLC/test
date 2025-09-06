'use client';

import { useState } from 'react';

type Msg = { role: 'user' | 'assistant' | 'system'; content: string };

export default function Page() {
  const [companyId, setCompanyId] = useState('demo');
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: 'system', content: 'You are a helpful assistant.' }
  ]);
  const [input, setInput] = useState('');

  async function send() {
    if (!input.trim()) return;

    const next = [...msgs, { role: 'user' as const, content: input }];
    setMsgs(next);
    setInput('');

    const res = await fetch('/api/chat', {
      method: 'POST',
      body: JSON.stringify({ messages: next, companyId })
    });

    const reader = res.body?.getReader();
    const decoder = new TextDecoder();
    let acc = '';
    setMsgs(m => [...m, { role: 'assistant' as const, content: '' }]);

    while (true) {
      const { value, done } = await reader!.read();
      if (done) break;
      const chunk = decoder.decode(value, { stream: true });
      for (const line of chunk.split('\n')) {
        const t = line.trim();
        if (!t.startsWith('data:')) continue;
        const payload = t.replace(/^data:\s*/, '');
        if (payload === '[DONE]') continue;
        try {
          const json = JSON.parse(payload);
          const delta = json.choices?.[0]?.delta?.content ?? '';
          if (delta) {
            acc += delta;
            setMsgs(m => {
              const c = [...m];
              const last = c[c.length - 1];
              if (last && last.role === 'assistant') last.content = acc;
              return c;
            });
          }
        } catch {}
      }
    }
  }

  return (
    <main style={{ maxWidth: 820, margin: '40px auto', padding: 16 }}>
      <h1 style={{ fontWeight: 800, fontSize: 28, marginBottom: 12 }}>MGI Chat</h1>

      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <input
          value={companyId}
          onChange={e => setCompanyId(e.target.value)}
          placeholder="companyId"
          style={{ padding: 10, borderRadius: 8, border: '1px solid #ddd' }}
        />
      </div>

      <div style={{ border: '1px solid #eee', borderRadius: 12, padding: 12, minHeight: 260 }}>
        {msgs.filter(m => m.role !== 'system').map((m, i) => (
          <div key={i} style={{ margin: '8px 0' }}>
            <b>{m.role === 'user' ? 'You' : 'Bot'}:</b> {m.content}
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="اكتب رسالتك…"
          style={{ flex: 1, padding: 12, borderRadius: 10, border: '1px solid #ddd' }}
        />
        <button
          onClick={send}
          style={{
            padding: '12px 16px',
            borderRadius: 10,
            background: '#4f46e5',
            color: '#fff',
            border: 'none',
            fontWeight: 700
          }}
        >
          إرسال
        </button>
      </div>
    </main>
  );
}
