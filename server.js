import express from 'express';
import { randomUUID } from 'crypto';
import { createServer as createViteServer } from 'vite';
import { fileURLToPath } from 'url';
import { readFile } from 'fs/promises';
import { join } from 'path';

const root = fileURLToPath(new URL('.', import.meta.url));

const PORT = process.env.PORT || 5173;
const isProd = process.env.NODE_ENV === 'production';
const SEPAY_API_KEY = process.env.SEPAY_API_KEY || '';

const SEPAY_ACCOUNT = 'LOCSPAY000339068';
const SEPAY_BANK = 'ACB';
const COURSE_AMOUNT = 999000;
const ZALO_GROUP_URL = 'https://zalo.me/g/810hsjbv0rntmnrpkkhb';

/** sessionId -> { zaloName, paid, paidAt, transactionId, createdAt } */
const payments = new Map();

function buildTransferNote(zaloName) {
  return `Notion + ${zaloName.trim()}`;
}

function buildQrUrl(zaloName) {
  const des = encodeURIComponent(buildTransferNote(zaloName));
  return `https://qr.sepay.vn/img?acc=${SEPAY_ACCOUNT}&bank=${SEPAY_BANK}&amount=${COURSE_AMOUNT}&des=${des}`;
}

function normalizeForMatch(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, '');
}

function contentMatchesPayment(content, zaloName) {
  const normalizedContent = normalizeForMatch(content);
  const normalizedName = normalizeForMatch(zaloName);
  return normalizedContent.includes('notion') && normalizedContent.includes(normalizedName);
}

function pruneOldSessions() {
  const cutoff = Date.now() - 24 * 60 * 60 * 1000;
  for (const [id, payment] of payments) {
    if (!payment.paid && payment.createdAt < cutoff) {
      payments.delete(id);
    }
  }
}

const app = express();
app.use(express.json());

app.post('/api/sepay-webhook', (req, res) => {
  if (SEPAY_API_KEY) {
    const auth = req.headers.authorization || '';
    const expected = `Apikey ${SEPAY_API_KEY}`;
    if (auth !== expected && auth !== SEPAY_API_KEY) {
      return res.status(401).json({ success: false });
    }
  }

  const data = req.body || {};

  if (data.transferType && data.transferType !== 'in') {
    return res.json({ success: true });
  }

  const amount = Number(data.transferAmount || 0);
  const content = String(data.content || data.description || '');

  if (amount < COURSE_AMOUNT) {
    return res.json({ success: true });
  }

  for (const payment of payments.values()) {
    if (!payment.paid && contentMatchesPayment(content, payment.zaloName)) {
      payment.paid = true;
      payment.paidAt = Date.now();
      payment.transactionId = data.id;
    }
  }

  res.json({ success: true });
});

app.post('/api/create-payment', (req, res) => {
  const zaloName = String(req.body?.zaloName || '').trim();
  if (!zaloName || zaloName.length > 80) {
    return res.status(400).json({ error: 'Vui lòng nhập tên Zalo hợp lệ.' });
  }

  pruneOldSessions();

  const sessionId = randomUUID();
  payments.set(sessionId, {
    zaloName,
    paid: false,
    createdAt: Date.now(),
  });

  res.json({
    sessionId,
    qrUrl: buildQrUrl(zaloName),
    transferNote: buildTransferNote(zaloName),
    amount: COURSE_AMOUNT,
    zaloGroupUrl: ZALO_GROUP_URL,
  });
});

app.get('/api/payment-status/:sessionId', (req, res) => {
  const payment = payments.get(req.params.sessionId);
  if (!payment) {
    return res.status(404).json({ error: 'Phiên thanh toán không tồn tại hoặc đã hết hạn.' });
  }

  res.json({
    paid: payment.paid,
    zaloName: payment.zaloName,
    zaloGroupUrl: ZALO_GROUP_URL,
  });
});

async function start() {
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom',
    });
    app.use(vite.middlewares);

    app.use('*', async (req, res, next) => {
      if (req.originalUrl.startsWith('/api')) return next();
      try {
        const template = await readFile(join(root, 'index.html'), 'utf-8');
        const html = await vite.transformIndexHtml(req.originalUrl, template);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
      } catch (err) {
        vite.ssrFixStacktrace(err);
        next(err);
      }
    });
  } else {
    app.get('/', (_req, res) => res.sendFile(join(root, 'index.html')));
    app.get('/zalo_group_qr.jpg', (_req, res) => res.sendFile(join(root, 'zalo_group_qr.jpg')));
  }

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    if (!isProd) {
      console.log(`Webhook URL (dùng ngrok khi test): http://localhost:${PORT}/api/sepay-webhook`);
    }
  });
}

start();
