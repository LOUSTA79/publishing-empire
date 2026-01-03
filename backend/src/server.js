const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'Lousta Empire', version: '1.0.0' });
});

app.get('/', (req, res) => {
  res.json({ 
    message: '🏛️ Lousta Empire API',
    target: { daily: '$59.37', monthly: '$1,781' }
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log('✅ Lousta Empire running on port:', PORT);
});
