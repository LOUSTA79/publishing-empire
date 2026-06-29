const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const fs = require('fs');
dotenv.config();

const app = express();
const getRawBody = require('raw-body');

const REAL_MONEY = process.env.PRODUCTION_MODE === 'true';
const stripeSecret = process.env.STRIPE_SECRET_KEY || '';
const stripe = require('stripe')(stripeSecret);

const LEDGER_PATH = './data/royalty_ledger.json';

function loadLedger() {
  if (!fs.existsSync(LEDGER_PATH)) {
    return { version: "1.0", authors: {}, pending_royalties: [], payout_history: [], audit_log: [] };
  }
  return JSON.parse(fs.readFileSync(LEDGER_PATH, 'utf8'));
}
function saveLedger(ledger) {
  fs.writeFileSync(LEDGER_PATH, JSON.stringify(ledger, null, 2));
}
function appendAudit(action, details) {
  const ledger = loadLedger();
  ledger.audit_log.push({ ts: new Date().toISOString(), action, details });
  saveLedger(ledger);
}

app.use(cors());
app.use(express.json({ limit: '1mb' }));

// === ORIGINAL HOME + HEALTH (kept + enhanced) ===
app.get('/', (req, res) => {
  const REAL = REAL_MONEY;
  res.send(`<!doctype html>
<html><head><meta name="viewport" content="width=device-width,initial-scale=1">
<title>📚 Publishing Empire ${REAL ? '💰 LIVE' : '🧪 TEST'} | LouGrok Sovereign</title>
<style>
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:linear-gradient(135deg,#0f172a 0%,#1e2937 100%);min-height:100vh;margin:0;color:#e2e8f0}
.container{max-width:820px;margin:40px auto;padding:40px;background:#1e2937;border-radius:24px;box-shadow:0 25px 80px rgba(0,0,0,0.6);border:1px solid #334155}
h1{font-size:42px;margin:0 0 8px;text-align:center;background:linear-gradient(90deg,#60a5fa,#a78bfa);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.badge{display:inline-block;padding:8px 20px;border-radius:9999px;font-weight:700;font-size:13px;margin:12px auto}
.live{background:#10b981;color:#fff}.test{background:#f59e0b;color:#111}
.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:16px;margin:32px 0}
.card{background:#0f172a;padding:24px;border-radius:16px;text-align:center;border:1px solid #334155}
.card .val{font-size:26px;font-weight:800;color:#60a5fa}.card .lbl{font-size:12px;color:#94a3b8;margin-top:6px}
.royalty-section{margin-top:40px;background:#0f172a;padding:25px;border-radius:16px;border:1px solid #334155}
button{background:#334155;color:#e2e8f0;border:none;padding:12px 24px;border-radius:9999px;font-weight:600;cursor:pointer;margin:6px 4px}
button:hover{background:#475569}
#royalty-log{font-family:monospace;font-size:12px;background:#020617;padding:15px;border-radius:8px;margin-top:15px;white-space:pre-wrap;display:none}
.footer{text-align:center;color:#64748b;font-size:13px;margin-top:30px}
</style></head>
<body><div class="container">
<h1>📚 Publishing Empire</h1>
<div style="text-align:center"><span class="badge ${REAL ? 'live' : 'test'}">${REAL ? '💰 LIVE — REAL MONEY' : '🧪 TEST MODE — SAFE'}</span></div>

<div class="grid">
<div class="card"><div class="val">70%</div><div class="lbl">Author Royalty</div></div>
<div class="card"><div class="val">24/7</div><div class="lbl">AI Agent Support</div></div>
<div class="card"><div class="val">$0</div><div class="lbl">Setup Cost</div></div>
<div class="card"><div class="val">${REAL ? 'LIVE' : 'TEST'}</div><div class="lbl">Current Mode</div></div>
</div>

<!-- NEW ROYALTY COMMAND CENTER -->
<div class="royalty-section">
<h2 style="margin:0 0 15px;color:#60a5fa">💰 Royalty Command Center — 100% Autonomous</h2>
<div class="grid" id="royalty-grid">
<div class="card"><div class="val" id="total-earned">0</div><div class="lbl">Total Royalties Earned</div></div>
<div class="card"><div class="val" id="pending-royalties">0</div><div class="lbl">Pending Payouts</div></div>
<div class="card"><div class="val" id="total-paid">0</div><div class="lbl">Total Paid to Authors</div></div>
<div class="card"><div class="val" id="autonomous-status">OFF</div><div class="lbl">Autonomous Engine</div></div>
</div>
<button onclick="loadRoyaltyStats()">🔄 Refresh Royalty Stats</button>
<button onclick="showAutonomousInfo()">🤖 How Autonomous Payouts Work</button>
<div id="royalty-log"></div>
</div>

<div class="footer">Admin: ${process.env.ADMIN_EMAIL || 'n/a'} • LouGrok Sovereign v2.0 • <a href="/health">Health</a> • <a href="/api/status">Empire Status</a> • <a href="/api/royalties/summary">Royalty JSON</a></div>
</div></body>
<script>
async function loadRoyaltyStats() {
  try {
    const res = await fetch('/api/royalties/summary');
    const data = await res.json();
    document.getElementById('total-earned').innerText = (data.total_earned || 0).toFixed(2);
    document.getElementById('pending-royalties').innerText = (data.pending_count || 0);
    document.getElementById('total-paid').innerText = (data.total_paid || 0).toFixed(2);
    document.getElementById('autonomous-status').innerText = data.autonomous_enabled ? 'ON' : 'OFF';
    const log = document.getElementById('royalty-log');
    log.style.display = 'block';
    log.innerText = 'Last updated: ' + new Date().toLocaleTimeString() + '\\nPending items: ' + (data.pending_count || 0);
  } catch(e) { console.error(e); }
}
function showAutonomousInfo() {
  const log = document.getElementById('royalty-log');
  log.style.display = 'block';
  log.innerText = 'AUTONOMOUS ENGINE RULES:\\n• Runs every hour inside the server\\n• Only executes when PRODUCTION_MODE=true AND ROYALTY_AUTONOMOUS_ENABLED=true\\n• Payouts only above threshold AND author has stripe_account_id\\n• All actions written to immutable audit_log\\n• Set flags in .env then redeploy to activate';
}
window.onload = () => { setTimeout(loadRoyaltyStats, 800); };
</script></html>`);
});

app.get('/health', (req, res) => res.json({ status: 'ok', mode: REAL_MONEY ? 'PRODUCTION' : 'TEST', royalty_autonomous: process.env.ROYALTY_AUTONOMOUS_ENABLED === 'true' }));

app.get('/api/status', (req, res) => res.json({ success: true, mode: REAL_MONEY ? 'LIVE' : 'TEST', royalty_layer: 'active' }));

// === PAYMENT (with author_id support) ===
app.post('/api/payment', async (req, res) => {
  try {
    const { amount = 0, description = 'Book purchase', author_id = 'default' } = req.body || {};
    if (!stripeSecret) return res.status(500).json({ error: 'Stripe not configured' });
    if (!REAL_MONEY) return res.json({ success: true, testMode: true, message: 'TEST MODE — no charge' });
    if (!Number.isFinite(amount) || amount <= 0) return res.status(400).json({ error: 'Invalid amount' });

    const pi = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: 'usd',
      description,
      metadata: { author_id, source: 'publishing-empire' }
    });
    res.json({ success: true, clientSecret: pi.client_secret });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// === WEBHOOK WITH SIGNATURE + ROYALTY RECORDING ===
app.post('/api/webhook', async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const buf = await getRawBody(req);
  let event;

  try {
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (endpointSecret) {
      event = stripe.webhooks.constructEvent(buf, sig, endpointSecret);
    } else {
      event = JSON.parse(buf.toString()); // testing only
    }
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'payment_intent.succeeded') {
    const pi = event.data.object;
    const amount = (pi.amount_received || pi.amount) / 100;
    const authorId = pi.metadata?.author_id || 'default';
    const royaltyAmount = Math.round(amount * 0.7 * 100) / 100;

    const ledger = loadLedger();
    const pendingId = 'roy_' + Date.now();

    ledger.pending_royalties.push({
      id: pendingId,
      sale_id: pi.id,
      author_id: authorId,
      gross_amount: amount,
      royalty_amount: royaltyAmount,
      created_at: new Date().toISOString(),
      status: 'pending'
    });

    if (!ledger.authors[authorId]) {
      ledger.authors[authorId] = { name: authorId, email: '', stripe_account_id: null, total_earned: 0, total_paid: 0 };
    }
    ledger.authors[authorId].total_earned = (ledger.authors[authorId].total_earned || 0) + royaltyAmount;

    ledger.audit_log.push({ ts: new Date().toISOString(), action: 'sale_recorded', details: { sale_id: pi.id, author_id: authorId, royalty: royaltyAmount } });
    saveLedger(ledger);

    console.log(`[royalty] Sale recorded → ${royaltyAmount} royalty pending for ${authorId}`);
  }

  res.json({ received: true });
});

// === ROYALTY API ===
app.get('/api/royalties/summary', (req, res) => {
  const ledger = loadLedger();
  const pending = ledger.pending_royalties.filter(p => p.status === 'pending');
  const totalEarned = Object.values(ledger.authors).reduce((s, a) => s + (a.total_earned || 0), 0);
  const totalPaid = Object.values(ledger.authors).reduce((s, a) => s + (a.total_paid || 0), 0);

  res.json({
    total_earned: totalEarned,
    total_paid: totalPaid,
    pending_count: pending.length,
    pending_total: pending.reduce((s, p) => s + p.royalty_amount, 0),
    autonomous_enabled: process.env.ROYALTY_AUTONOMOUS_ENABLED === 'true',
    threshold: parseFloat(process.env.ROYALTY_PAYOUT_THRESHOLD || '25'),
    last_audit: ledger.audit_log.length ? ledger.audit_log[ledger.audit_log.length-1] : null
  });
});

app.get('/api/royalties/pending', (req, res) => {
  const ledger = loadLedger();
  res.json(ledger.pending_royalties.filter(p => p.status === 'pending'));
});

// === AUTONOMOUS ROYALTY ENGINE (runs inside server when enabled) ===
async function processPendingRoyalties() {
  const ledger = loadLedger();
  let changed = false;
  const threshold = parseFloat(process.env.ROYALTY_PAYOUT_THRESHOLD || '25');
  const autonomousOn = process.env.ROYALTY_AUTONOMOUS_ENABLED === 'true';
  const canPay = REAL_MONEY && autonomousOn;

  for (const pending of ledger.pending_royalties) {
    if (pending.status !== 'pending' || pending.royalty_amount < threshold) continue;

    const author = ledger.authors[pending.author_id] || ledger.authors['default'];

    if (canPay && author.stripe_account_id) {
      try {
        const transfer = await stripe.transfers.create({
          amount: Math.round(pending.royalty_amount * 100),
          currency: 'usd',
          destination: author.stripe_account_id,
          description: `Royalty for ${pending.sale_id}`
        });
        pending.status = 'paid';
        pending.payout_id = transfer.id;
        pending.paid_at = new Date().toISOString();
        author.total_paid = (author.total_paid || 0) + pending.royalty_amount;
        ledger.payout_history.push({ ...pending, transfer_id: transfer.id });
        ledger.audit_log.push({ ts: new Date().toISOString(), action: 'autonomous_payout_executed', details: { pending_id: pending.id, transfer_id: transfer.id, amount: pending.royalty_amount } });
        changed = true;
        console.log(`✅ AUTONOMOUS PAYOUT: ${transfer.id} → ${pending.royalty_amount} to ${pending.author_id}`);
      } catch (e) {
        console.error('Payout failed:', e.message);
        ledger.audit_log.push({ ts: new Date().toISOString(), action: 'payout_failed', details: { error: e.message, pending_id: pending.id } });
        changed = true;
      }
    } else {
      if (!canPay) {
        console.log(`[ROYALTY ENGINE] DRY RUN — would pay ${pending.royalty_amount} to ${pending.author_id}`);
      }
    }
  }
  if (changed) saveLedger(ledger);
}

// Start autonomous engine if enabled
if (process.env.ROYALTY_AUTONOMOUS_ENABLED === 'true') {
  console.log('🤖 Royalty Autonomous Engine ACTIVE — scanning every hour');
  setInterval(() => { processPendingRoyalties().catch(console.error); }, 3600 * 1000);
  setTimeout(() => processPendingRoyalties().catch(console.error), 15000); // first run soon after boot
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('════════════════════════════════════════════════════');
  console.log(`🚀 LOUGROK SOVEREIGN EMPIRE on ${PORT} | Mode: ${REAL_MONEY ? 'PRODUCTION' : 'TEST'}`);
  console.log(`   Royalty Autonomous: ${process.env.ROYALTY_AUTONOMOUS_ENABLED === 'true' ? 'ENABLED' : 'DISABLED (safe)'}`);
  console.log('════════════════════════════════════════════════════');
});
