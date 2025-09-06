// ✅ نسخة نظيفة ومتوافقة مع السكيمة الحالية (بدون count)
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

    // 1) تحقق من الشركة والحدود
    const company = await prisma.company.findUnique({ where: { id: companyId } });
    if (!company) {
      return new Response(JSON.stringify({ error: 'COMPANY_NOT_FOUND' }), { status: 404 });
    }
    if (company.isPaused) {
      return new Response(JSON.stringify({ error: 'PAUSED' }), { status: 403 });
    }

    // 2) احسب مفاتيح الزمن للحصر الشهري/اليومي (السكيمة الحالية فيها monthKey فقط)
    const now = new Date();
    const monthKey = `${now.getFullYear()}-${now.getMonth() + 1}`; // مثال: 2025-9

    // 3) عدّ الاستعمال الشهري من خلال count() بدل حقل count
    const monthlyUsed = await prisma.usage.count({
      where: { companyId, monthKey },
    });

    if (company.monthlyLimit !== null && company.monthlyLimit !== undefined) {
      if (monthlyUsed >= company.monthlyLimit) {
        return new Response(JSON.stringify({ error: 'MONTH_LIMIT_REACHED' }), { status: 429 });
      }
    }

    // 4) سجّل هذه الرسالة كسطر جديد (بدون count)
    await prisma.usage.create({
      data: { companyId, monthKey }, // ✅ فقط هذول الحقول مع createdAt الافتراضي
    });

    // 5) ردّ (هنا رد بسيط؛ اربطه بمزوّدك لاحقًا)
    const reply =
      '✅ تم استلام سؤالك!\n\n' +
      '• شكراً لتجربتك البوت.\n' +
      '• رح نجاوبك بشكل منظّم وبنقاط واضحة.\n' +
      '🤖 (نص تجريبي — اربطه بـ DeepSeek في مرحلة التشغيل)';

    // Stream-like بسيط (SSE) عشان يظل الـ UI نفسه يشتغل
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      start(controller) {
        // chunk واحد فقط كمثال
        const chunk = `data: ${JSON.stringify({ choices: [{ delta: { content: reply } }] })}\n\n`;
        controller.enqueue(encoder.encode(chunk));
        controller.enqueue(encoder.encode(`data: [DONE]\n\n`));
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
