const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    headless: false
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('http://46.101.111.107:3000/');
  await page.getByRole('link', { name: 'List Your Restaurant' }).click();
  await expect(page.getByRole('heading', { name: 'Register Your Restaurant!' })).toBeVisible();

  // ---------------------
  await context.close();
  await browser.close();
})();