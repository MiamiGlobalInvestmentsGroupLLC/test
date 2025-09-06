export const metadata = { title: 'Bot Integration Guide — MGI' };
const code = (s:string)=>(<pre style={{background:'#020617',padding:12,borderRadius:10,overflow:'auto'}}><code>{s}</code></pre>);

export default function Integration(){
  return (
    <main className="card">
      <h1 style={{marginTop:0}}>دمج البوت في موقعك</h1>
      <p>اختر منصتك واتبع الخطوات البسيطة. استخدم <b>Company ID</b> الخاص بشركتك في الكود.</p>
      <h2>موقع HTML عادي</h2>
      {code(`<script src="https://chat.miamiglobalgroup.com/embed/widget.js?companyId=YOUR_COMPANY_ID" async></script>`)}
      <ol><li>افتح ملف <b>index.html</b></li><li>ألصق الكود قبل وسم <b>&lt;/body&gt;</b></li><li>احفظ وشغّل الموقع</li></ol>
      <h2>Shopify</h2>
      <ol><li>Online Store → Themes → Customize</li><li>Edit Code → افتح <b>theme.liquid</b></li><li>ألصق الكود قبل <b>&lt;/body&gt;</b></li></ol>
      <h2>WordPress</h2>
      <ol><li>Appearance → Theme Editor</li><li>افتح <b>footer.php</b></li><li>ألصق الكود قبل <b>&lt;/body&gt;</b></li></ol>
      <h2>Google Sites</h2>
      <ol><li>Insert → Embed → Embed Code</li><li>ألصق الكود بالكامل واضغط Insert</li></ol>
      <p className="watermark">علامة مائية اختيارية يمكن للمدير تفعيلها من لوحة التحكم.</p>
    </main>
  );
}
