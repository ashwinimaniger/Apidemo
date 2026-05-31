const { test, expect } = require('@playwright/test');

test('Navigate to API list page', async ({ page }) => {
  await page.goto('https://automationexercise.com/api_list');
  await expect(page).toHaveURL(/api_list/);
  // Basic check: ensure page content has 'API list' heading or similar
  const text = await page.textContent('body');
  expect(text.toLowerCase()).toContain('api');
});

// Using public test API at jsonplaceholder.typicode.com
const BASE = 'https://jsonplaceholder.typicode.com';

test('GET request - list posts', async ({ request }) => {
  const resp = await request.get(`${BASE}/posts`);
  expect(resp.status()).toBe(200);
  const body = await resp.json();
  expect(Array.isArray(body)).toBeTruthy();
  expect(body.length).toBeGreaterThan(0);
});

test('POST request - create post', async ({ request }) => {
  const payload = { title: 'foo', body: 'bar', userId: 1 };
  const resp = await request.post(`${BASE}/posts`, { data: payload });
  // jsonplaceholder returns 201 Created
  expect(resp.status()).toBe(201);
  const body = await resp.json();
  expect(body).toMatchObject({ title: 'foo', body: 'bar', userId: 1 });
  expect(body.id).toBeTruthy();
});

test('PUT request - update post', async ({ request }) => {
  const payload = { id: 1, title: 'updated', body: 'updated body', userId: 1 };
  const resp = await request.put(`${BASE}/posts/1`, { data: payload });
  expect(resp.status()).toBe(200);
  const body = await resp.json();
  expect(body).toMatchObject({ id: 1, title: 'updated', body: 'updated body', userId: 1 });
});

test('DELETE request - delete post', async ({ request }) => {
  const resp = await request.delete(`${BASE}/posts/1`);
  // jsonplaceholder returns 200 on delete
  expect(resp.status()).toBe(200);
});
