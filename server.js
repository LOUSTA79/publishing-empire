const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const LIVE = process.env.MODE === 'live';

app.get('/', (req, res) => {
  res.send(`
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>Publishing Empire ${LIVE ? '💰' : '🧪'}</title>
      <style>
        body {
          margin: 0;
          font-family: system-ui;
          background: linear-gradient(135deg, #667eea, #764ba2);
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        .box {
          background: white;
          padding: 40px;
          border-radius: 20px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.3);
          text-align: center;
          max-width: 400px;
        }
        h1 { font-size: 32px; margin: 0 0 20px 0; }
        .badge {
          background: ${LIVE ? '#10b981' : '#f59e0b'};
          color: white;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 14px;
          font-weight: bold;
          display: inline-block;
        }
        .stats {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
          margin: 25px 0;
        }
        .stat {
          background: #f3f4f6;
          padding: 15px;
          border-radius: 10px;
        }
        .stat-val { font-size: 24px; font-weight: bold; color: #667eea; }
        .stat-lbl { font-size: 11px; color: #666; margin-top: 5px; }
        .info { font-size: 13px; color: #999; margin-top: 20px; }
      </style>
    </head>
    <body>
      <div class="box">
        <h1>📚 Publishing Empire</h1>
        <span class="badge">${LIVE ? '💰 LIVE' : '🧪 TEST'}</span>
        <div class="stats">
          <div class="stat">
            <div class="stat-val">70%</div>
            <div class="stat-lbl">Royalties</div>
          </div>
          <div class="stat">
            <div class="stat-val">$0</div>
            <div class="stat-lbl">Setup</div>
          </div>
          <div class="stat">
            <div class="stat-val">24/7</div>
            <div class="stat-lbl">AI Support</div>
          </div>
          <div class="stat">
            <div class="stat-val">${LIVE ? 'LIVE' : 'TEST'}</div>
            <div class="stat-lbl">Status</div>
          </div>
        </div>
        <div class="info">
          📱 Deployed from Termux<br>
          By: ${NAME}
        </div>
      </div>
    </body>
    </html>
  `);
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', mode: LIVE ? 'live' : 'test' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('🚀 Server running on port ' + PORT);
  console.log('Mode: ' + (LIVE ? 'PRODUCTION 💰' : 'TEST 🧪'));
});
