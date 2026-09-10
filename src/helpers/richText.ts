/** Decode HTML entities when admin content was stored escaped. */
export function normalizeRichHtml(html?: string | null): string {
  if (!html) return "";

  const trimmed = html.trim();
  if (!trimmed.includes("&lt;") && !trimmed.includes("&gt;")) {
    return html;
  }

  const textarea = document.createElement("textarea");
  textarea.innerHTML = trimmed;
  return textarea.value;
}
