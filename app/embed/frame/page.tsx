'use client';

import { useSearchParams } from 'next/navigation';
import Page from '../../page'; // استيراد نسبي مضمون

export default function EmbedFrame() {
  // لو بدّك تمرر CompanyId عبر ?c=... استخدمها لاحقًا
  const sp = useSearchParams();
  const cid = sp.get('c') || '';

  return <Page />;
}
