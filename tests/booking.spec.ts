const { chromium } = require('playwright');

function getRandomDate() {
  const start = new Date();
  const end = new Date(start.getFullYear() + 1, 11, 31);
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return date.toISOString().split('T')[0];
}

function getRandomTime() {
  const hours = Math.floor(Math.random() * 24).toString().padStart(2, '0');
  const minutes = Math.floor(Math.random() * 60).toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}

(async () => {
  const browser = await chromium.launch({
    headless: false
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('http://46.101.111.107:3000/');
  await page.getByRole('link', { name: 'List Your Restaurant' }).click();
  // await expect(page.getByRole('heading', { name: 'Register Your Restaurant!' })).toBeVisible();
  await page.getByRole('link', { name: 'Book Your Table', exact: true }).click();
  // await expect(page.getByRole('heading', { name: 'Book a Table' })).toBeVisible();
  await page.getByRole('link', { name: 'Default Restaurant' }).click();
  await page.getByLabel('Email').click();
  await page.getByLabel('Email').fill('test@test.com');
  await page.getByLabel('Email').press('Tab');
  await page.getByLabel('Password').fill('Rx2{81');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByLabel('Date:').fill(getRandomDate());
  await page.getByLabel('Time:').fill(getRandomTime());
  await page.getByLabel('Duration:').click();
  await page.getByLabel('Duration:').fill('1');
  await page.getByRole('button', { name: 'Book Table' }).click();
  await expect(page.getByRole('heading', { name: 'Success' })).toBeVisible();
  await page.getByRole('button', { name: 'OK' }).click();

  // ---------------------
  await context.close();
  await browser.close();
})();