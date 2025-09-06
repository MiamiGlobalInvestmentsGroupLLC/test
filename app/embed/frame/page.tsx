// app/embed/frame/page.tsx
'use client';

import { Suspense, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

function EmbedInner() {
  const sp = useSearchParams();
  const cid = sp.get('c') || sp.get('companyId') || '';
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // نظّف أي سكربت قديم
    document.getElementById('mgi-embed-script')?.remove();

    // احقن سكربت الودجت مع companyId
    const s = document.createElement('script');
    s.id = 'mgi-embed-script';
    s.async = true;
    s.src = `/embed/widget.js?companyId=${encodeURIComponent(cid)}`;

    // اركّبه داخل الحاوية
    mountRef.current?.appendChild(s);

    return () => {
      s.remove();
    };
  }, [cid]);

  return (
    <div
      ref={mountRef}
      style={{
        minHeight: 560,
        width: '100%',
        display: 'flex',
        alignItems: 'stretch',
        justifyContent: 'center',
        background: 'transparent',
      }}
    />
  );
}

export default function EmbedFrame() {
  return (
    <Suspense fallback={<div style={{ padding: 16 }}>Loading…</div>}>
      <EmbedInner />
    </Suspense>
  );
}
