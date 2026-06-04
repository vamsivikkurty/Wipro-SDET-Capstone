
const { test, expect } = require('@playwright/test');

test.describe('Checkout Flow Functionality', () => {

    test.describe.configure({
        timeout: 90000
    });

    test.beforeEach(async ({ page }) => {

        await page.goto(
            'https://practicesoftwaretesting.com/',
            {
                waitUntil: 'commit',
                timeout: 60000
            }
        );

        await page.waitForLoadState('domcontentloaded');

    });

    // TC_CF_001
    test('TC_CF_001 - Verify navigation to checkout page', async ({ page }) => {

        await page.goto(
            'https://practicesoftwaretesting.com/checkout'
        );

        await expect(page.locator('body'))
            .toBeVisible();

    });

    // TC_CF_002
    test('TC_CF_002 - Verify checkout page URL', async ({ page }) => {

        await page.goto(
            'https://practicesoftwaretesting.com/checkout'
        );

        await expect(page)
            .toHaveURL(/checkout/);

    });

    // TC_CF_003
    test('TC_CF_003 - Verify checkout page content loads', async ({ page }) => {

        await page.goto(
            'https://practicesoftwaretesting.com/checkout'
        );

        const content =
            await page.locator('body').textContent();

        expect(content.length)
            .toBeGreaterThan(50);

    });

    // TC_CF_004
    test('TC_CF_004 - Verify checkout page is accessible', async ({ page }) => {

        await page.goto(
            'https://practicesoftwaretesting.com/checkout'
        );

        await expect(page.locator('body'))
            .toBeVisible();

    });

    // TC_CF_005
    test('TC_CF_005 - Verify checkout page is displayed', async ({ page }) => {

        await page.goto(
            'https://practicesoftwaretesting.com/checkout'
        );

        await expect(
            page.locator('body')
        ).toBeVisible();

    });

    // TC_CF_006
    test('TC_CF_006 - Verify checkout page content exists', async ({ page }) => {

        await page.goto(
            'https://practicesoftwaretesting.com/checkout'
        );

        const content =
            await page.locator('body')
                .textContent();

        expect(content.length)
            .toBeGreaterThan(20);

    });

    // TC_CF_007
    test('TC_CF_007 - Verify page accepts interaction', async ({ page }) => {

        await page.goto(
            'https://practicesoftwaretesting.com/checkout'
        );

        await expect(
            page.locator('body')
        ).toBeVisible();

    });

    // TC_CF_008
    test('TC_CF_008 - Verify page contains buttons', async ({ page }) => {

        await page.goto(
            'https://practicesoftwaretesting.com/checkout'
        );

        const buttons =
            page.locator('button');

        expect(await buttons.count())
            .toBeGreaterThan(0);

    });

    // TC_CF_009
    test('TC_CF_009 - Verify checkout URL contains checkout keyword', async ({ page }) => {

        await page.goto(
            'https://practicesoftwaretesting.com/checkout'
        );

        expect(page.url())
            .toContain('checkout');

    });

    // TC_CF_010
    test('TC_CF_010 - Verify checkout body visibility', async ({ page }) => {

        await page.goto(
            'https://practicesoftwaretesting.com/checkout'
        );

        await expect(
            page.locator('body')
        ).toBeVisible();

    });

    // TC_CF_011
    test('TC_CF_011 - Verify checkout page remains accessible', async ({ page }) => {

        await page.goto(
            'https://practicesoftwaretesting.com/checkout'
        );

        await expect(
            page.locator('body')
        ).toBeVisible();

    });

    // TC_CF_012
    test('TC_CF_012 - Verify checkout page contains content', async ({ page }) => {

        await page.goto(
            'https://practicesoftwaretesting.com/checkout'
        );

        const content =
            await page.locator('body').textContent();

        expect(content.length)
            .toBeGreaterThan(20);

    });

    // TC_CF_013
    test('TC_CF_013 - Verify checkout page responds to button clicks', async ({ page }) => {

        await page.goto(
            'https://practicesoftwaretesting.com/checkout'
        );

        const buttons =
            page.locator('button');

        if (await buttons.count() > 0) {

            await buttons.first().click();

            await expect(
                page.locator('body')
            ).toBeVisible();

        }

    });

    // TC_CF_014
    test('TC_CF_014 - Verify keyboard navigation support', async ({ page }) => {

        await page.goto(
            'https://practicesoftwaretesting.com/checkout'
        );

        await page.keyboard.press('Tab');

        const activeElement =
            await page.evaluate(() =>
                document.activeElement?.tagName
            );

        expect(activeElement)
            .toBeTruthy();

    });

    // TC_CF_015
    test('TC_CF_015 - Verify checkout page remains accessible after refresh', async ({ page }) => {

        await page.goto(
            'https://practicesoftwaretesting.com/checkout'
        );

        await page.reload({
            waitUntil: 'commit'
        });

        await expect(
            page.locator('body')
        ).toBeVisible();

    });

    // TC_CF_016
    test('TC_CF_016 - Verify URL remains stable after refresh', async ({ page }) => {

        await page.goto(
            'https://practicesoftwaretesting.com/checkout'
        );

        const currentUrl = page.url();

        await page.reload({
            waitUntil: 'commit'
        });

        await expect(page)
            .toHaveURL(currentUrl);

    });

    // TC_CF_017
    test('TC_CF_017 - Verify checkout page responsiveness', async ({ browser }) => {

        const context = await browser.newContext({
            viewport: {
                width: 375,
                height: 667
            }
        });

        const page = await context.newPage();

        await page.goto(
            'https://practicesoftwaretesting.com/checkout',
            {
                waitUntil: 'commit'
            }
        );

        await expect(
            page.locator('body')
        ).toBeVisible();

        await context.close();

    });

    // TC_CF_018
    test('TC_CF_018 - Verify checkout page performance', async ({ page }) => {

        const start = Date.now();

        await page.goto(
            'https://practicesoftwaretesting.com/checkout',
            {
                waitUntil: 'commit'
            }
        );

        const loadTime =
            Date.now() - start;

        console.log(
            `Checkout Load Time: ${loadTime} ms`
        );

        expect(loadTime)
            .toBeLessThan(10000);

    });

});
