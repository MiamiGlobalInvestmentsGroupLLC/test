export const dynamic = 'force-dynamic';
export function GET(req: Request){
  const url = new URL(req.url); const companyId = url.searchParams.get('companyId') || '';
  const js = `
  (function(){
    if (window.MGI_WIDGET_LOADED) return; window.MGI_WIDGET_LOADED = true;
    var b = document.createElement('iframe');
    b.src = '/embed/frame?c=${companyId}';
    b.style.position='fixed'; b.style.right='18px'; b.style.bottom='18px';
    b.style.width='360px'; b.style.height='520px'; b.style.border='0';
    b.style.borderRadius='16px'; b.style.boxShadow='0 12px 30px rgba(0,0,0,.35)';
    b.style.zIndex='999999'; document.body.appendChild(b);
  })();`;
  return new Response(js, { headers: { 'Content-Type': 'application/javascript' } });
}
