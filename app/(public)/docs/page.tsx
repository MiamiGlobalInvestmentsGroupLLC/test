import Brand from "@/components/Brand";
import GradientButton from "@/components/GradientButton";

export default function Docs(){
  return (
    <main className="min-h-screen p-6 md:p-10 bg-gradient-to-br from-pink-50 via-cyan-50 to-amber-50">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Brand />
          <a href="/"><GradientButton>Home</GradientButton></a>
        </div>

        <div className="rounded-2xl p-6 bg-white/70 backdrop-blur border border-white/60 shadow-lg space-y-6">
          <h1 className="text-3xl font-extrabold">Documentation • تركيب البوت</h1>
          <p className="text-slate-700">اختر منصتك واتّبع الخطوات. جميع الطرق تعرض فقاعة عائمة (Widget) أو Iframe.</p>

          <section>
            <h2 className="text-xl font-bold mb-2">1) موقع HTML عادي</h2>
            <p>أضف هذا داخل &lt;body&gt;:</p>
            <pre className="p-4 rounded-xl bg-white border text-sm overflow-x-auto">{`<script async src="https://chat.miamiglobalgroup.com/embed/widget.js"></script>`}</pre>
            <p className="mt-2">أو Iframe:</p>
            <pre className="p-4 rounded-xl bg-white border text-sm overflow-x-auto">{`<iframe src="https://chat.miamiglobalgroup.com/embed/frame" style="width:100%;height:600px;border:none" allow="clipboard-write; microphone; camera"></iframe>`}</pre>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-2">2) Shopify</h2>
            <ol className="list-decimal pl-6 space-y-1">
              <li>من Shopify Admin → Online Store → Themes → Customize.</li>
              <li>افتح <b>Theme settings</b> ثم <b>Custom</b> (أو "Edit code" → اختر <b>theme.liquid</b>).</li>
              <li>ضع هذا السكربت قبل وسم <code>&lt;/body&gt;</code> مباشرةً:</li>
            </ol>
            <pre className="p-4 rounded-xl bg-white border text-sm overflow-x-auto">{`<script async src="https://chat.miamiglobalgroup.com/embed/widget.js"></script>`}</pre>
            <p className="text-slate-600 mt-2">واحفظ التعديلات. رح تظهر فقاعة دردشة فخمة أسفل يمين المتجر.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-2">3) WordPress</h2>
            <ol className="list-decimal pl-6 space-y-1">
              <li>ادخل لوحة التحكم → Appearance → Theme File Editor.</li>
              <li>اختر ملف <b>footer.php</b> أو أضِف <b>Custom HTML</b> عبر Widget.</li>
              <li>ألصق السكربت التالي قبل &lt;/body&gt;:</li>
            </ol>
            <pre className="p-4 rounded-xl bg-white border text-sm overflow-x-auto">{`<script async src="https://chat.miamiglobalgroup.com/embed/widget.js"></script>`}</pre>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-2">4) Wix</h2>
            <ol className="list-decimal pl-6 space-y-1">
              <li>من Wix Editor → Settings → Custom Code.</li>
              <li>أضِف كود جديد واختر مكانه في <b>Body - end</b>.</li>
              <li>ألصق السكربت واحفظ.</li>
            </ol>
            <pre className="p-4 rounded-xl bg-white border text-sm overflow-x-auto">{`<script async src="https://chat.miamiglobalgroup.com/embed/widget.js"></script>`}</pre>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-2">5) Google Sites</h2>
            <ol className="list-decimal pl-6 space-y-1">
              <li>افتح Google Sites → Insert → Embed.</li>
              <li>اختر Embed code والصق الـiframe التالي:</li>
            </ol>
            <pre className="p-4 rounded-xl bg-white border text-sm overflow-x-auto">{`<iframe src="https://chat.miamiglobalgroup.com/embed/frame" style="width:100%;height:600px;border:none" allow="clipboard-write; microphone; camera"></iframe>`}</pre>
          </section>
        </div>
      </div>
    </main>
  );
}
