require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const LIVE = process.env.PRODUCTION_MODE === 'true';

app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL || process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  max: 3
});

// Health check - very robust
app.get('/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ 
      status: 'ok', 
      mode: LIVE ? 'LIVE' : 'TEST',
      db: 'connected',
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    res.status(500).json({ 
      status: 'error', 
      db: err.message,
      env: Object.keys(process.env).filter(k => k.includes('POSTGRES') || k.includes('STRIPE'))
    });
  }
});

app.get('/count', async (_, res) => {
  try {
    const { rows } = await pool.query('SELECT COUNT(*) FROM books');
    res.send(rows[0].count.toString());
  } catch (e) {
    res.send('0');
  }
});

// Other endpoints (create-product, etc.)
app.post('/api/create-product', async (req, res) => {
  const { title, price = 9.99 } = req.body;
  try {
    await pool.query('INSERT INTO books (title, price) VALUES ($1, $2)', [title, price]);
    res.json({ success: true, title });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post('/api/start-production', async (req, res) => {
  const { num_books = 5 } = req.body;
  const titles = ["AI Empire 2026", "Sovereign Publishing", "Automated Revenue", "Grok Content Mastery", "Digital Freedom Protocol"];
  const created = [];
  for (let i = 0; i < num_books; i++) {
    const title = titles[i % titles.length];
    await pool.query('INSERT INTO books (title, price) VALUES ($1, $2)', [title, 12.99]);
    created.push(title);
  }
  res.json({ success: true, books_created: num_books, books: created });
});

if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port);
}

module.exports = app;
