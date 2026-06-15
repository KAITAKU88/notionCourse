import {
  createPayment,
  getPaymentStatus,
  processSepayWebhook,
} from './payments.js';

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

function verifySepayAuth(request, env) {
  const apiKey = env.SEPAY_API_KEY;
  if (!apiKey) return true;

  const auth = request.headers.get('Authorization') || '';
  const expected = `Apikey ${apiKey}`;
  return auth === expected || auth === apiKey;
}

async function handleApi(request, env, pathname) {
  if (pathname === '/api/sepay-webhook' && request.method === 'POST') {
    if (!verifySepayAuth(request, env)) {
      return json({ success: false }, 401);
    }

    let data = {};
    try {
      data = await request.json();
    } catch {
      return json({ success: true });
    }

    await processSepayWebhook(env.PAYMENTS, data);
    return json({ success: true });
  }

  if (pathname === '/api/create-payment' && request.method === 'POST') {
    let body = {};
    try {
      body = await request.json();
    } catch {
      return json({ error: 'Vui lòng nhập tên Zalo hợp lệ.' }, 400);
    }

    const zaloName = String(body?.zaloName || '').trim();
    if (!zaloName || zaloName.length > 80) {
      return json({ error: 'Vui lòng nhập tên Zalo hợp lệ.' }, 400);
    }

    const result = await createPayment(env.PAYMENTS, zaloName);
    return json(result);
  }

  const statusMatch = pathname.match(/^\/api\/payment-status\/([^/]+)$/);
  if (statusMatch && request.method === 'GET') {
    const sessionId = statusMatch[1];
    const status = await getPaymentStatus(env.PAYMENTS, sessionId);

    if (!status) {
      return json({ error: 'Phiên thanh toán không tồn tại hoặc đã hết hạn.' }, 404);
    }

    return json(status);
  }

  return json({ error: 'Not found' }, 404);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname.startsWith('/api/')) {
      return handleApi(request, env, url.pathname);
    }

    return env.ASSETS.fetch(request);
  },
};
