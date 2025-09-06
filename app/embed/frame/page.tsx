'use client';
export const dynamic = 'force-dynamic';
import { useSearchParams } from 'next/navigation';
import Page from '@/app/page';

export default function EmbedFrame(){
  const sp = useSearchParams(); const cid = sp.get('c')||'';
  return (
    <div style={{width:'100%',height:'100%',background:'transparent'}}>
      {/* reuse main Chat UI but fix styles for iframe */}
      <div style={{padding:8}}>
        <Page />
      </div>
      <style>{`body,html,#__next{background:transparent}`}</style>
    </div>
  );
}
