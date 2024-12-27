import { test, expect } from '@playwright/test';


test('test', async ({ page }) => {
  await page.goto('http://46.101.111.107:3000/');
  await expect(page.getByRole('navigation')).toContainText('Book Your Table');
  await page.getByRole('link', { name: 'Book Your Table', exact: true }).click();
  await expect(page.locator('h1')).toContainText('Book a Table');
  await expect(page.getByRole('link', { name: 'Default Restaurant' })).toBeVisible();
  await page.getByRole('link', { name: 'Default Restaurant' }).click();
  await expect(page.getByRole('heading')).toContainText('Login');
  await expect(page.getByLabel('Email')).toBeVisible();
  await expect(page.getByLabel('Password')).toBeVisible();
  await page.getByLabel('Email').click();
  await page.getByLabel('Email').fill('test@test.com');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('Rx2{81');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.locator('h1')).toContainText('Book a Table at Default Restaurant');

  const randomDate = new Date(Date.now() + Math.floor(Math.random() * 365 * 24 * 60 * 60 * 1000));
  const randomDateString = randomDate.toISOString().split('T')[0];
  const randomHour = Math.floor(Math.random() * 24).toString().padStart(2, '0');
  const randomMinute = Math.floor(Math.random() * 60).toString().padStart(2, '0');
  const randomTimeString = `${randomHour}:${randomMinute}`;

  await page.getByLabel('Date:').fill(randomDateString);
  await page.getByLabel('Time:').click();
  await page.getByLabel('Time:').fill(randomTimeString);
  await page.getByLabel('Duration:').click();
  await page.getByLabel('Duration:').fill('1');
  await page.locator('body').click();
  await page.getByRole('button', { name: 'Book Table' }).click();
  await expect(page.locator('#swal2-title')).toContainText('Success');
  await page.getByRole('button', { name: 'OK' }).click();
});