// ✅ نسخة تعمل مع Prisma بدون monthKey — حساب الشهري عبر createdAt
import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';

export const runtime = 'nodejs';

type Msg = { role: 'user' | 'assistant' | 'system'; content: string };

export async function POST(req: NextRequest) {
  try {
    const { messages, companyId }: { messages: Msg[]; companyId: string } = await req.json();

    if (!companyId || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: 'BAD_REQUEST' }), { status: 400 });
    }

    // 1) الشركة والحدود
    const company = await prisma.company.findUnique({ where: { id: companyId } });
    if (!company) return new Response(JSON.stringify({ error: 'COMPANY_NOT_FOUND' }), { status: 404 });
    if (company.isPaused) return new Response(JSON.stringify({ error: 'PAUSED' }), { status: 403 });

    // 2) حساب بداية ونهاية الشهر الحالي
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

    // 3) عدّ الاستعمال الشهري عبر createdAt (بدون monthKey)
    const monthlyUsed = await prisma.usage.count({
      where: {
        companyId,
        createdAt: { gte: startOfMonth, lt: startOfNextMonth },
      },
    });

    if (company.monthlyLimit != null && monthlyUsed >= company.monthlyLimit) {
      return new Response(JSON.stringify({ error: 'MONTH_LIMIT_REACHED' }), { status: 429 });
    }

    // 4) تسجيل استخدام جديد (حقل companyId فقط — createdAt افتراضي)
    await prisma.usage.create({ data: { companyId } });

    // 5) رد تجريبي (اربطه بمزوّدك لاحقًا)
    const reply =
      '✅ تم استلام سؤالك!\n\n' +
      '• شكراً لتجربة البوت.\n' +
      '• هذا رد تجريبي منظّم بنقاط.\n' +
      '🤖 اربط الـ API بديبسيك داخل هذا المسار لاحقًا.';

    // SSE مبسّط
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      start(controller) {
        const chunk = `data: ${JSON.stringify({ choices: [{ delta: { content: reply } }] })}\n\n`;
        controller.enqueue(encoder.encode(chunk));
        controller.enqueue(encoder.encode('data: [DONE]\n\n'));
        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream; charset=utf-8',
        'Cache-Control': 'no-cache, no-transform',
        Connection: 'keep-alive',
      },
    });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: 'SERVER_ERROR' }), { status: 500 });
  }
}
