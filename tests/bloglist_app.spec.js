const { test, expect, beforeEach, describe } = require('@playwright/test');
const { loginUser, createBlog } = require('./helper');

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset');
    await request.post('/api/users', {
      data: {
        name: 'Tester',
        username: 'tester',
        password: '654321',
      },
    });
    await page.goto('/');
  });

  test('Login form is shown', async ({ page }) => {
    const locator = page.getByText('log in to application');
    await expect(locator).toBeVisible();
  });

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginUser(page, 'tester', '654321');

      const locator = await page.getByText('blogs');
      await expect(locator).toBeVisible();
    });

    test('fails with wrong credentials', async ({ page }) => {
      await loginUser(page, 'tester', '1111');

      const locator = await page.getByTestId('error');
      await expect(locator).toBeVisible();
    });
  });

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginUser(page, 'tester', '654321');
      await createBlog(page, { title: 'first test blog', url: 'http://localhost:5173/' });
    });

    test('a new blog can be created', async ({ page }) => {
      const text = await page.getByTestId('blogTitle').textContent();
      await expect(text).toBe('first test blog');
    });

    test('a new blog can be liked', async ({ page }) => {
      await page.getByRole('button', { name: 'view' }).click();
      await expect(page.getByTestId('likeNum')).toHaveText('0');

      await page.getByRole('button', { name: 'like' }).click();
      await expect(page.getByTestId('likeNum')).toHaveText('1');

      await page.getByRole('button', { name: 'like' }).click();
      await expect(page.getByTestId('likeNum')).toHaveText('2');
    });
  });
});
