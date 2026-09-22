// Client-side event recording + tagged outbound links.
// Fails silently when the API is absent (e.g., local dev).
export function outboundUrl(base: string): string {
  const sep = base.includes("?") ? "&" : "?";
  return `${base}${sep}utm_source=charam.org&utm_medium=referral&utm_campaign=gratitude`;
}

export function recordEvent(type: string, data: Record<string, unknown>): void {
  try {
    void fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, ...data }),
      keepalive: true,
    }).catch(() => {});
  } catch {
    /* no-op */
  }
}
