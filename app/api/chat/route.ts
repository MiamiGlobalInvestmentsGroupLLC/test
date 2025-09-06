import { prisma } from '@/lib/prisma';
export const runtime = 'nodejs';

function streamText(text: string) {
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    start(controller) {
      // Minimal fake streaming in chunks
      const chunks = text.match(/.{1,30}/g) || [];
      let i=0;
      const timer = setInterval(()=>{
        if (i>=chunks.length) { controller.enqueue(encoder.encode('data: [DONE]\n\n')); clearInterval(timer); controller.close(); return; }
        const payload = JSON.stringify({ choices: [{ delta: { content: chunks[i++] } }] });
        controller.enqueue(encoder.encode('data: ' + payload + '\n\n'));
      }, 20);
    }
  });
  return new Response(stream, { headers: { 'Content-Type': 'text/event-stream' } });
}

export async function POST(req: Request) {
  const body = await req.json();
  const companyId: string = body.companyId || 'demo';
  // check company status & limits
  const company = await prisma.company.findUnique({ where: { id: companyId } });
  if (company?.isPaused) return streamText('⏸️ تم إيقاف البوت مؤقتًا من قبل الإدارة.');
  // record usage (simplified)
  const now = new Date(); const monthKey = `${now.getFullYear()}-${now.getMonth()+1}`;
  await prisma.usage.create({ data: { companyId, count: 1, monthKey } }).catch(()=>{});

  const reply = [
    '✅ تم استلام سؤالك!',
    '• رح نجاوبك بنقاط واضحة ومختصرة.',
    '• هذا رد تجريبي (يمكن ربطه بـ DeepSeek لاحقًا).',
    '🤝 هل ترغب بعرض الأسعار أو مزيد من التفاصيل؟'
  ].join('\n');

  return streamText(reply);
}
