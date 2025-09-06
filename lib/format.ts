export function formatAssistantText(text: string) {
  // convert lines starting with - or * to list items
  const lines = text.split(/\r?\n/).filter(Boolean);
  const html = lines.map(l => {
    const t = l.trim();
    if (/^[-*•]/.test(t)) return `<li>${escapeHtml(t.replace(/^[-*•]\s*/, ''))}</li>`;
    return `<p>${escapeHtml(t)}</p>`;
  }).join('');
  // wrap lone <li> into <ul>
  return /<li>/.test(html) ? `<ul>${html}</ul>` : html;
}
function escapeHtml(s:string){return s.replace(/[&<>"']/g, m=>({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' } as any)[m]);}
