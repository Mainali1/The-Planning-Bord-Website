import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { stripeWebhook } from './webhook.js';
import { licenseRoutes } from './routes/license.js';
import { purchaseRoutes } from './routes/purchase.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

app.use('/webhook', express.raw({ type: 'application/json' }), stripeWebhook);

app.use(express.json());

app.use('/api/license', licenseRoutes);
app.use('/api/purchase', purchaseRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
