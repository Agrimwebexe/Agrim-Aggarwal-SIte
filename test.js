/**
 * Automated test suite for the portfolio backend API.
 * Run with: node test.js
 */
const http = require('http');

const BASE_URL = 'http://localhost:5000';
let passed = 0;
let failed = 0;

function request(method, path, body = null) {
  return new Promise((resolve, reject) => {
    const payload = body ? JSON.stringify(body) : null;
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(payload ? { 'Content-Length': Buffer.byteLength(payload) } : {}),
      },
    };

    const req = http.request(`${BASE_URL}${path}`, options, (res) => {
      let data = '';
      res.on('data', chunk => (data += chunk));
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, headers: res.headers, body: JSON.parse(data) });
        } catch {
          resolve({ status: res.statusCode, headers: res.headers, body: data });
        }
      });
    });
    req.on('error', reject);
    if (payload) req.write(payload);
    req.end();
  });
}

function assert(label, condition, detail = '') {
  if (condition) {
    console.log(`  ✅  PASS  ${label}`);
    passed++;
  } else {
    console.log(`  ❌  FAIL  ${label}${detail ? `  →  ${detail}` : ''}`);
    failed++;
  }
}

async function run() {
  console.log('\n══════════════════════════════════════════');
  console.log('  Portfolio Backend — Test Suite');
  console.log('══════════════════════════════════════════\n');

  // ── Test 1: Health Check ──────────────────────────────────────────────────
  console.log('[ GET /api/health ]');
  const health = await request('GET', '/api/health');
  assert('Returns 200',            health.status === 200, `got ${health.status}`);
  assert('status is OK',           health.body.status === 'OK');
  assert('Has requestId header',   !!health.headers['x-request-id']);
  assert('Has uptime field',       !!health.body.uptime);
  console.log();

  // ── Test 2: Empty Payload ─────────────────────────────────────────────────
  console.log('[ POST /api/contact — empty payload ]');
  const empty = await request('POST', '/api/contact', {});
  assert('Returns 400',            empty.status === 400, `got ${empty.status}`);
  assert('success is false',       empty.body.success === false);
  assert('Returns errors array',   Array.isArray(empty.body.errors));
  assert('3 validation errors',    empty.body.errors.length === 3, `got ${empty.body.errors?.length}`);
  assert('Has requestId in body',  !!empty.body.requestId);
  console.log();

  // ── Test 3: Partial Validation ────────────────────────────────────────────
  console.log('[ POST /api/contact — invalid email ]');
  const badEmail = await request('POST', '/api/contact', {
    name: 'Agrim',
    email: 'not-an-email',
    message: 'This is a long enough test message for the validator.',
  });
  assert('Returns 400',            badEmail.status === 400);
  assert('1 validation error',     badEmail.body.errors?.length === 1, `got ${badEmail.body.errors?.length}`);
  assert('Error is about email',   badEmail.body.errors?.[0]?.toLowerCase().includes('email'));
  console.log();

  // ── Test 4: Message too short ─────────────────────────────────────────────
  console.log('[ POST /api/contact — message too short ]');
  const shortMsg = await request('POST', '/api/contact', {
    name: 'Agrim',
    email: 'aggarwalagrim72@gmail.com',
    message: 'Hi',
  });
  assert('Returns 400',            shortMsg.status === 400);
  assert('Error about message',    shortMsg.body.errors?.[0]?.toLowerCase().includes('message'));
  console.log();

  // ── Test 5: XSS Sanitization ──────────────────────────────────────────────
  console.log('[ POST /api/contact — XSS in name (sanitization check) ]');
  const xss = await request('POST', '/api/contact', {
    name: '<script>alert(1)</script>',
    email: 'bad@test.com',
    message: 'This is an XSS test with enough characters to pass.',
  });
  // Name becomes "alert(1)" after sanitize (< and > stripped) — length is ok
  // The request should fail validation as the sanitized name is too short OR succeed without injecting
  assert('Returns 400 or 500, not 200 with raw script tag',
    xss.status !== 200 || !JSON.stringify(xss.body).includes('<script>'),
    `got ${xss.status}`);
  console.log();

  // ── Test 6: 404 Route ─────────────────────────────────────────────────────
  console.log('[ GET /api/nonexistent ]');
  const notFound = await request('GET', '/api/nonexistent');
  assert('Returns 404',            notFound.status === 404);
  assert('success is false',       notFound.body.success === false);
  assert('Has requestId',          !!notFound.body.requestId);
  console.log();

  // ── Test 7: Rate Limit Headers ────────────────────────────────────────────
  console.log('[ POST /api/contact — rate limit headers present ]');
  const rl = await request('POST', '/api/contact', {
    name: 'Test',
    email: 'test@test.com',
    message: 'Checking for rate limit headers on the response.',
  });
  assert('RateLimit-Limit header present',
    !!rl.headers['ratelimit-limit'] || !!rl.headers['x-ratelimit-limit'],
    JSON.stringify(Object.keys(rl.headers)));
  console.log();

  // ── Summary ───────────────────────────────────────────────────────────────
  console.log('══════════════════════════════════════════');
  console.log(`  Results: ${passed} passed, ${failed} failed`);
  console.log('══════════════════════════════════════════\n');

  if (failed > 0) process.exit(1);
}

run().catch(err => {
  console.error('Test runner error:', err.message);
  process.exit(1);
});
