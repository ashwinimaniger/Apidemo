const { test, expect } = require('@playwright/test');

const JSON_BASE = 'https://jsonplaceholder.typicode.com';
const HTTPBIN = 'https://httpbin.org';

test('GET with query params - posts for userId=1', async ({ request }) => {
  const resp = await request.get(`${JSON_BASE}/posts?userId=1`);
  expect(resp.status()).toBe(200);
  const body = await resp.json();
  expect(Array.isArray(body)).toBeTruthy();
  expect(body.length).toBeGreaterThan(0);
  for (const item of body) expect(item.userId).toBe(1);
});

test('Auth success - basic auth', async ({ request }) => {
  const user = 'user';
  const pass = 'passwd';
  const token = Buffer.from(`${user}:${pass}`).toString('base64');
  const resp = await request.get(`${HTTPBIN}/basic-auth/${user}/${pass}`, {
    headers: { Authorization: `Basic ${token}` },
  });
  expect(resp.status()).toBe(200);
  const body = await resp.json();
  expect(body.authenticated).toBe(true);
  expect(body.user).toBe(user);
});

test('Auth failure - wrong credentials', async ({ request }) => {
  const token = Buffer.from(`bad:creds`).toString('base64');
  const resp = await request.get(`${HTTPBIN}/basic-auth/user/passwd`, {
    headers: { Authorization: `Basic ${token}` },
  });
  expect(resp.status()).toBe(401);
});

test('Negative status 404 returns 404', async ({ request }) => {
  const resp = await request.get(`${HTTPBIN}/status/404`);
  expect(resp.status()).toBe(404);
});

test('Negative status 500 returns 500', async ({ request }) => {
  const resp = await request.get(`${HTTPBIN}/status/500`);
  expect(resp.status()).toBe(500);
});
