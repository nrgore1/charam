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

export interface PendingPledge {
  id: string;
  org: string;
  amount: number;
  currency: string;
  ts: number;
}

const PENDING_KEY = "charam-pending-pledge";
const PENDING_TTL = 48 * 3600 * 1000; // 48h

export function savePending(p: PendingPledge): void {
  try {
    localStorage.setItem(PENDING_KEY, JSON.stringify(p));
  } catch {
    /* no-op */
  }
}

export function loadPending(): PendingPledge | null {
  try {
    const raw = localStorage.getItem(PENDING_KEY);
    if (!raw) return null;
    const p = JSON.parse(raw) as PendingPledge;
    if (!p || typeof p.ts !== "number" || Date.now() - p.ts > PENDING_TTL) return null;
    return p;
  } catch {
    return null;
  }
}

export function clearPending(): void {
  try {
    localStorage.removeItem(PENDING_KEY);
  } catch {
    /* no-op */
  }
}
