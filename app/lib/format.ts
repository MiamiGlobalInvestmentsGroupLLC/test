export function formatAssistant(text: string): string {
  // Convert simple lines to markdown bullets if lines start with "- " or "• "
  const lines = text.split(/\r?\n/);
  const out: string[] = [];
  for (const ln of lines) {
    if (/^\s*[-•]/.test(ln)) out.push(ln);
    else out.push(ln.trim());
  }
  return out.join("\n");
}
