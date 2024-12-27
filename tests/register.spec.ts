import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://46.101.111.107:3000/');
  await page.getByRole('link', { name: 'List Your Restaurant' }).click();
  await expect(page.getByRole('heading', { name: 'Register Your Restaurant!' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Register' })).toBeVisible();
});