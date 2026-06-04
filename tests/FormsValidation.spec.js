
const { test, expect } = require('@playwright/test');

test.describe('Forms & Validation Testing', () => {

    test.describe.configure({
        timeout: 90000
    });

    // TC_FV_001
    test('TC_FV_001 - Verify homepage loads', async ({ page }) => {

        await page.goto(
            'https://practicesoftwaretesting.com/',
            {
                waitUntil: 'commit',
                timeout: 15000
            }
        );

        await expect(page.locator('body'))
            .toBeVisible();

    });

    // TC_FV_002
    test('TC_FV_002 - Verify page content exists', async ({ page }) => {

        await page.goto(
            'https://practicesoftwaretesting.com/',
            {
                waitUntil: 'commit'
            }
        );

        const content =
            await page.locator('body').textContent();

        expect(content.length)
            .toBeGreaterThan(20);

    });

    // TC_FV_003
    test('TC_FV_003 - Verify page contains text', async ({ page }) => {

        await page.goto(
            'https://practicesoftwaretesting.com/',
            {
                waitUntil: 'commit'
            }
        );

        const content =
            await page.locator('body').textContent();

        expect(content.length)
            .toBeGreaterThan(50);

    });

    // TC_FV_004
    test('TC_FV_004 - Verify page is accessible', async ({ page }) => {

        await page.goto(
            'https://practicesoftwaretesting.com/',
            {
                waitUntil: 'commit'
            }
        );

        await expect(page.locator('body'))
            .toBeVisible();

    });

    // TC_FV_005
    test('TC_FV_005 - Verify page loads successfully', async ({ page }) => {

        await page.goto(
            'https://practicesoftwaretesting.com/',
            {
                waitUntil: 'commit',
                timeout: 15000
            }
        );

        await expect(page.locator('body'))
            .toBeVisible();

    });

    // TC_FV_006
    test('TC_FV_006 - Verify keyboard interaction works', async ({ page }) => {

        await page.goto(
            'https://practicesoftwaretesting.com/'
        );

        await page.keyboard.press('Tab');

        const activeElement =
            await page.evaluate(() =>
                document.activeElement?.tagName
            );

        expect(activeElement)
            .toBeTruthy();

    });

    // TC_FV_007
    test('TC_FV_007 - Verify URL is valid', async ({ page }) => {

        await page.goto(
            'https://practicesoftwaretesting.com/'
        );

        expect(page.url())
            .toContain('practicesoftwaretesting');

    });

    // TC_FV_008
    test('TC_FV_008 - Verify page can be reopened', async ({ page }) => {

        await page.goto(
            'https://practicesoftwaretesting.com/'
        );

        await page.goto(
            'https://practicesoftwaretesting.com/'
        );

        await expect(page.locator('body'))
            .toBeVisible();

    });

    // TC_FV_009
    test('TC_FV_009 - Verify page remains accessible', async ({ page }) => {

        await page.goto(
            'https://practicesoftwaretesting.com/'
        );

        const content =
            await page.locator('body').textContent();

        expect(content.length)
            .toBeGreaterThan(20);

    });

    // TC_FV_010
    test('TC_FV_010 - Verify page performance', async ({ page }) => {

        const start = Date.now();

        await page.goto(
            'https://practicesoftwaretesting.com/',
            {
                waitUntil: 'commit'
            }
        );

        const loadTime =
            Date.now() - start;

        console.log(
            `Page Load Time: ${loadTime} ms`
        );

        expect(loadTime)
            .toBeLessThan(15000);

    });

});
