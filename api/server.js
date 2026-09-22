// Charam referral ledger — zero-dependency Node service.
// POST /api/events            record pledge / outbound_click / confirmed
// GET  /api/admin/summary     aggregated ledger (basic auth)
// GET  /admin                 dashboard (basic auth)
const http = require("http");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const DATA_DIR = process.env.DATA_DIR || "/data";
const FILE = path.join(DATA_DIR, "events.ndjson");
const TYPES = new Set(["pledge", "outbound_click", "confirmed"]);
fs.mkdirSync(DATA_DIR, { recursive: true });

function send(res, code, body, type = "application/json") {
  res.writeHead(code, { "Content-Type": type });
  res.end(type === "application/json" ? JSON.stringify(body) : body);
}

function authorized(req) {
  const h = req.headers.authorization || "";
  if (!h.startsWith("Basic ")) return false;
  const [u, p] = Buffer.from(h.slice(6), "base64").toString().split(":");
  return u === process.env.ADMIN_USER && p === process.env.ADMIN_PASS && !!p;
}

function demandAuth(res) {
  res.writeHead(401, { "WWW-Authenticate": 'Basic realm="charam-admin"' });
  res.end("Authentication required");
}

function readEvents() {
  try {
    return fs.readFileSync(FILE, "utf8").split("\n").filter(Boolean).map((l) => {
      try { return JSON.parse(l); } catch { return null; }
    }).filter(Boolean);
  } catch { return []; }
}

function summarize(events) {
  const orgs = {};
  const pledgesById = {};
  const org = (n) => (orgs[n] ||= {
    clicks: 0, pledges: 0, pledged: {}, confirmed: 0, confirmedAmounts: {},
  });
  for (const e of events) {
    if (e.type === "outbound_click" && e.org) org(e.org).clicks += 1;
    if (e.type === "pledge" && e.org) {
      const o = org(e.org);
      o.pledges += 1;
      if (typeof e.amount === "number" && e.currency) {
        o.pledged[e.currency] = (o.pledged[e.currency] || 0) + e.amount;
      }
      if (e.id) pledgesById[e.id] = e;
    }
  }
  for (const e of events) {
    if (e.type !== "confirmed") continue;
    const src = (e.ref && pledgesById[e.ref]) || e;
    if (!src.org) continue;
    const o = org(src.org);
    o.confirmed += 1;
    if (typeof src.amount === "number" && src.currency) {
      o.confirmedAmounts[src.currency] = (o.confirmedAmounts[src.currency] || 0) + src.amount;
    }
  }
  return { orgs, total: events.length, recent: events.slice(-50).reverse() };
}

const PAGE = `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Charam - Referral Ledger</title><style>
body{font-family:Georgia,serif;background:#FAF8F5;color:#28231D;margin:0;padding:32px;max-width:960px;margin-inline:auto}
h1{color:#1E3B33}h2{color:#1E3B33;margin-top:36px}table{border-collapse:collapse;width:100%;background:#fff}
th,td{border:1px solid #D8C9AC;padding:8px 10px;text-align:left;font-size:14px}th{background:#F3EBDC}
.note{color:#5A5347;font-size:13px;max-width:70ch}</style></head><body>
<h1>Charam - Referral Ledger</h1>
<p class="note">Clicks and pledges are recorded when a visitor leaves charam.org for a partner organization.
"Confirmed" is self-reported by the donor and is not a verified payment. For verified figures, request referral
reports from each organization (outbound links carry utm_source=charam.org).</p>
<div id="out">Loading...</div>
<script>
fetch("/api/admin/summary").then(r=>r.json()).then(d=>{
  const fmt=o=>Object.entries(o).map(([c,v])=>c+" "+v.toLocaleString()).join("<br>")||"-";
  let h="<h2>By organization</h2><table><tr><th>Organization</th><th>Link clicks</th><th>Pledges</th><th>Pledged (unverified)</th><th>Self-confirmed</th><th>Confirmed amount (self-reported)</th></tr>";
  for(const [name,o] of Object.entries(d.orgs)){h+="<tr><td>"+name+"</td><td>"+o.clicks+"</td><td>"+o.pledges+"</td><td>"+fmt(o.pledged)+"</td><td>"+o.confirmed+"</td><td>"+fmt(o.confirmedAmounts)+"</td></tr>";}
  h+="</table><h2>Recent events ("+d.total+" total)</h2><table><tr><th>Time (UTC)</th><th>Type</th><th>Org</th><th>Amount</th><th>Source</th></tr>";
  for(const e of d.recent){h+="<tr><td>"+(e.ts||"").replace("T"," ").slice(0,19)+"</td><td>"+e.type+"</td><td>"+(e.org||"")+"</td><td>"+(e.amount?e.currency+" "+e.amount:"")+"</td><td>"+(e.source||"")+"</td></tr>";}
  h+="</table>";document.getElementById("out").innerHTML=h;
}).catch(()=>{document.getElementById("out").textContent="Failed to load summary."});
</script></body></html>`;

const server = http.createServer((req, res) => {
  const url = new URL(req.url, "http://x");
  if (req.method === "POST" && url.pathname === "/api/events") {
    let body = "";
    req.on("data", (c) => { body += c; if (body.length > 8192) req.destroy(); });
    req.on("end", () => {
      try {
        const e = JSON.parse(body);
        if (!TYPES.has(e.type)) return send(res, 400, { error: "bad type" });
        const rec = {
          id: typeof e.id === "string" && e.id.length < 64 ? e.id : crypto.randomUUID(),
          ts: new Date().toISOString(),
          type: e.type,
          org: typeof e.org === "string" ? e.org.slice(0, 80) : undefined,
          amount: typeof e.amount === "number" && e.amount >= 0 ? e.amount : undefined,
          currency: typeof e.currency === "string" ? e.currency.slice(0, 8) : undefined,
          frequency: typeof e.frequency === "string" ? e.frequency.slice(0, 16) : undefined,
          dedication: typeof e.dedication === "string" ? e.dedication.slice(0, 200) : undefined,
          source: typeof e.source === "string" ? e.source.slice(0, 40) : undefined,
          ref: typeof e.ref === "string" ? e.ref.slice(0, 64) : undefined,
        };
        fs.appendFileSync(FILE, JSON.stringify(rec) + "\n");
        send(res, 200, { id: rec.id });
      } catch { send(res, 400, { error: "bad json" }); }
    });
    return;
  }
  if (url.pathname === "/api/admin/summary") {
    if (!authorized(req)) return demandAuth(res);
    return send(res, 200, summarize(readEvents()));
  }
  if (url.pathname === "/admin" || url.pathname === "/admin/") {
    if (!authorized(req)) return demandAuth(res);
    return send(res, 200, PAGE, "text/html; charset=utf-8");
  }
  send(res, 404, { error: "not found" });
});

server.listen(8080, () => console.log("charam-api listening on 8080"));
