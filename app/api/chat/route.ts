import { NextRequest } from "next/server";
import { formatAssistant } from "@/lib/format";

export async function POST(req: NextRequest){
  const { prompt = "" } = await req.json().catch(()=>({}));
  // Compose a tidy, bullet-point answer with emojis
  const text = formatAssistant(`
**جواب منظم ومرتب:**
- 🔎 الفكرة الأساسية: ${prompt.slice(0,120)}...
- ✅ نقاط مهمة ومباشرة.
- 🧠 أمثلة مختصرة.
- 🚀 CTA: إذا بدك تفاصيل أكثر، اسألني مباشرة.

**معلومة إضافية:**
- ✨ البوت يدعم الإيموجيز والـMarkdown.
- 📊 فيك تتابع استهلاكك اليومي والشهري من الداشبورد.
- 🛑 لو وصلت الحد اليومي/الشهري بيتوقف تلقائيًا.
  `);
  return Response.json({ ok: true, text });
}
