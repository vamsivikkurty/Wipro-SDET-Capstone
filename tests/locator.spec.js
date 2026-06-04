const { test } = require('@playwright/test');

test('Find Product Locators', async ({ page }) => {

    await page.goto(
        'https://practicesoftwaretesting.com/',
        {
            waitUntil: 'commit'
        }
    );

    const dataTests = await page.locator('[data-test]')
        .evaluateAll(elements =>
            elements.map(e => e.getAttribute('data-test'))
        );

    console.log(dataTests);

    await page.pause();
});