#!/usr/bin/env node
require('dotenv').config();
const fs = require('fs');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const LEDGER_PATH = './data/royalty_ledger.json';
const isDry = process.argv.includes('--dry-run') || process.argv.includes('--autonomous') === false;

function load() { return JSON.parse(fs.readFileSync(LEDGER_PATH)); }
function save(l) { fs.writeFileSync(LEDGER_PATH, JSON.stringify(l, null, 2)); }

async function run() {
  const ledger = load();
  let changed = false;
  const threshold = parseFloat(process.env.ROYALTY_PAYOUT_THRESHOLD || '25');
  const canPay = process.env.PRODUCTION_MODE === 'true' && process.env.ROYALTY_AUTONOMOUS_ENABLED === 'true' && !isDry;

  console.log(`[Royalty Engine] ${new Date().toISOString()} — DRY=${isDry} CAN_PAY=${canPay}`);

  for (const p of ledger.pending_royalties) {
    if (p.status !== 'pending' || p.royalty_amount < threshold) continue;
    const author = ledger.authors[p.author_id] || ledger.authors.default;
    if (canPay && author.stripe_account_id) {
      const t = await stripe.transfers.create({ amount: Math.round(p.royalty_amount*100), currency:'usd', destination: author.stripe_account_id });
      p.status = 'paid'; p.payout_id = t.id; p.paid_at = new Date().toISOString();
      author.total_paid = (author.total_paid||0) + p.royalty_amount;
      ledger.payout_history.push({...p, transfer_id: t.id});
      console.log('✅ PAID', t.id, p.royalty_amount);
      changed = true;
    } else {
      console.log(`[DRY] Would pay ${p.royalty_amount} to ${p.author_id}`);
    }
  }
  if (changed) save(ledger);
  console.log('Engine run complete.');
}
run().catch(console.error);
