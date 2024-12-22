import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://46.101.111.107:3000/');
  await page.getByRole('link', { name: 'Book Your Table' }).click();
  await page.getByLabel('City:').selectOption('2');
  await page.getByRole('button', { name: 'Search' }).click();
  await expect(page.getByRole('link', { name: 'Default Restaurant' })).toBeVisible();
  await page.getByRole('link', { name: 'Default Restaurant' }).click();
  await page.getByLabel('Date:').fill('2024-12-22');
  await page.getByLabel('Time:').click();
  await page.getByLabel('Time:').fill('10:00');
  await page.getByRole('button', { name: 'Book Table' }).click();
});