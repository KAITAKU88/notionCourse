import {
  COURSE_AMOUNT,
  PAYMENT_KEY_PREFIX,
  PAYMENT_TTL_SECONDS,
  SEPAY_ACCOUNT,
  SEPAY_BANK,
  ZALO_GROUP_URL,
} from './config.js';

export function buildTransferNote(zaloName) {
  return `Notion + ${zaloName.trim()}`;
}

export function buildQrUrl(zaloName) {
  const des = encodeURIComponent(buildTransferNote(zaloName));
  return `https://qr.sepay.vn/img?acc=${SEPAY_ACCOUNT}&bank=${SEPAY_BANK}&amount=${COURSE_AMOUNT}&des=${des}`;
}

export function normalizeForMatch(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, '');
}

export function contentMatchesPayment(content, zaloName) {
  const normalizedContent = normalizeForMatch(content);
  const normalizedName = normalizeForMatch(zaloName);
  return normalizedContent.includes('notion') && normalizedContent.includes(normalizedName);
}

function paymentKey(sessionId) {
  return `${PAYMENT_KEY_PREFIX}${sessionId}`;
}

export async function pruneOldSessions(kv) {
  const cutoff = Date.now() - PAYMENT_TTL_SECONDS * 1000;
  const list = await kv.list({ prefix: PAYMENT_KEY_PREFIX });

  for (const key of list.keys) {
    const raw = await kv.get(key.name);
    if (!raw) continue;

    const payment = JSON.parse(raw);
    if (!payment.paid && payment.createdAt < cutoff) {
      await kv.delete(key.name);
    }
  }
}

export async function createPayment(kv, zaloName) {
  await pruneOldSessions(kv);

  const sessionId = crypto.randomUUID();
  const payment = {
    zaloName,
    paid: false,
    createdAt: Date.now(),
  };

  await kv.put(paymentKey(sessionId), JSON.stringify(payment), {
    expirationTtl: PAYMENT_TTL_SECONDS,
  });

  return {
    sessionId,
    qrUrl: buildQrUrl(zaloName),
    transferNote: buildTransferNote(zaloName),
    amount: COURSE_AMOUNT,
    zaloGroupUrl: ZALO_GROUP_URL,
  };
}

export async function getPaymentStatus(kv, sessionId) {
  const raw = await kv.get(paymentKey(sessionId));
  if (!raw) return null;

  const payment = JSON.parse(raw);
  return {
    paid: payment.paid,
    zaloName: payment.zaloName,
    zaloGroupUrl: ZALO_GROUP_URL,
  };
}

export async function processSepayWebhook(kv, data) {
  if (data.transferType && data.transferType !== 'in') {
    return;
  }

  const amount = Number(data.transferAmount || 0);
  const content = String(data.content || data.description || '');

  if (amount < COURSE_AMOUNT) {
    return;
  }

  const list = await kv.list({ prefix: PAYMENT_KEY_PREFIX });

  for (const key of list.keys) {
    const raw = await kv.get(key.name);
    if (!raw) continue;

    const payment = JSON.parse(raw);
    if (!payment.paid && contentMatchesPayment(content, payment.zaloName)) {
      payment.paid = true;
      payment.paidAt = Date.now();
      payment.transactionId = data.id;

      await kv.put(key.name, JSON.stringify(payment), {
        expirationTtl: PAYMENT_TTL_SECONDS,
      });
    }
  }
}
