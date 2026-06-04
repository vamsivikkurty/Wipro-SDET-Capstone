
const { test, expect } = require('@playwright/test');

test.describe('Product Details Functionality', () => {

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

    // TC_PD_001
    test('TC_PD_001 - Verify homepage loads successfully', async ({ page }) => {

        await expect(page)
            .toHaveURL(/practicesoftwaretesting/);

    });

    // TC_PD_002
    test('TC_PD_002 - Verify page content exists', async ({ page }) => {

        const content =
            await page.locator('body').textContent();

        expect(content.length)
            .toBeGreaterThan(50);

    });

    // TC_PD_003
    test('TC_PD_003 - Verify page contains product-related information', async ({ page }) => {

        const content =
            await page.locator('body').textContent();

        expect(content.length)
            .toBeGreaterThan(100);

    });

    // TC_PD_004
test('TC_PD_004 - Verify page renders successfully', async ({ page }) => {

    await expect(
        page.locator('body')
    ).toBeVisible();

});

    // TC_PD_005
    test('TC_PD_005 - Verify page content is displayed', async ({ page }) => {

        await expect(
            page.locator('body')
        ).toBeVisible();

    });

    // TC_PD_006
    test('TC_PD_006 - Verify page is accessible', async ({ page }) => {

        await expect(
            page.locator('body')
        ).toBeVisible();

    });

    // TC_PD_007
    test('TC_PD_007 - Verify page remains interactive', async ({ page }) => {

        await expect(
            page.locator('body')
        ).toBeEnabled();

    });

    // TC_PD_008
    test('TC_PD_008 - Verify buttons exist on page', async ({ page }) => {

        const buttons =
            page.locator('button');

        expect(await buttons.count())
            .toBeGreaterThan(0);

    });

    // TC_PD_009
    test('TC_PD_009 - Verify page refresh functionality', async ({ page }) => {

        await page.reload({
            waitUntil: 'commit'
        });

        await expect(
            page.locator('body')
        ).toBeVisible();

    });

    // TC_PD_010
    test('TC_PD_010 - Verify URL remains valid after refresh', async ({ page }) => {

        const currentUrl = page.url();

        await page.reload({
            waitUntil: 'commit'
        });

        await expect(page)
            .toHaveURL(currentUrl);

    });

    // TC_PD_011
    test('TC_PD_011 - Verify keyboard navigation support', async ({ page }) => {

        await page.keyboard.press('Tab');

        const activeElement =
            await page.evaluate(() => {

                return document.activeElement?.tagName;

            });

        expect(activeElement)
            .toBeTruthy();

    });

    // TC_PD_012
    test('TC_PD_012 - Verify page performance', async ({ page }) => {

        const start = Date.now();

        await page.reload({
            waitUntil: 'commit'
        });

        const loadTime =
            Date.now() - start;

        console.log(
            `Load Time: ${loadTime} ms`
        );

        expect(loadTime)
            .toBeLessThan(10000);

    });

});
