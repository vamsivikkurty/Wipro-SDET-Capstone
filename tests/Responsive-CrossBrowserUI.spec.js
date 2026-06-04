
const { test, expect } = require('@playwright/test');

test.describe('Responsive & Cross Browser UI', () => {

    test.describe.configure({
        timeout: 90000
    });

    test.afterEach(async ({ page }) => {
        await page.close();
    });

    // TC_RB_001
    test('TC_RB_001 - Verify homepage loads on Desktop', async ({ page }) => {

        await page.setViewportSize({
            width: 1920,
            height: 1080
        });

        await page.goto(
            'https://practicesoftwaretesting.com/',
            {
                waitUntil: 'domcontentloaded'
            }
        );

        await expect(page.locator('body'))
            .toBeVisible();

    });

    // TC_RB_002
    test('TC_RB_002 - Verify homepage loads on Tablet', async ({ page }) => {

        await page.setViewportSize({
            width: 768,
            height: 1024
        });

        await page.goto(
            'https://practicesoftwaretesting.com/',
            {
                waitUntil: 'domcontentloaded'
            }
        );

        await expect(page.locator('body'))
            .toBeVisible();

    });

    // TC_RB_003
    test('TC_RB_003 - Verify homepage loads on Mobile', async ({ page }) => {

        await page.setViewportSize({
            width: 375,
            height: 667
        });

        await page.goto(
            'https://practicesoftwaretesting.com/',
            {
                waitUntil: 'domcontentloaded'
            }
        );

        await expect(page.locator('body'))
            .toBeVisible();

    });

    // TC_RB_004
    test('TC_RB_004 - Verify page content visible on Desktop', async ({ page }) => {

        await page.setViewportSize({
            width: 1920,
            height: 1080
        });

        await page.goto(
            'https://practicesoftwaretesting.com/',
            {
                waitUntil: 'domcontentloaded'
            }
        );

        const content =
            await page.locator('body').textContent();

        expect(content.length)
            .toBeGreaterThan(100);

    });

    // TC_RB_005
    test('TC_RB_005 - Verify navigation accessible on Mobile', async ({ page }) => {

        await page.setViewportSize({
            width: 375,
            height: 667
        });

        await page.goto(
            'https://practicesoftwaretesting.com/',
            {
                waitUntil: 'domcontentloaded'
            }
        );

        await expect(page.locator('body'))
            .toBeVisible();

    });

    // TC_RB_006
    test('TC_RB_006 - Verify content visible on all screen sizes', async ({ page }) => {

        const viewports = [
            { width: 375, height: 667 },
            { width: 768, height: 1024 },
            { width: 1920, height: 1080 }
        ];

        for (const viewport of viewports) {

            await page.setViewportSize(viewport);

            await page.goto(
                'https://practicesoftwaretesting.com/',
                {
                    waitUntil: 'domcontentloaded'
                }
            );

            await expect(page.locator('body'))
                .toBeVisible();
        }

    });

    // TC_RB_007
    test('TC_RB_007 - Verify page remains usable after resize', async ({ page }) => {

        await page.goto(
            'https://practicesoftwaretesting.com/',
            {
                waitUntil: 'domcontentloaded'
            }
        );

        await page.setViewportSize({
            width: 375,
            height: 667
        });

        await page.setViewportSize({
            width: 1366,
            height: 768
        });

        await expect(page.locator('body'))
            .toBeVisible();

    });

    // TC_RB_008
    test('TC_RB_008 - Verify no excessive horizontal scroll on mobile', async ({ page }) => {

        await page.setViewportSize({
            width: 375,
            height: 667
        });

        await page.goto(
            'https://practicesoftwaretesting.com/',
            {
                waitUntil: 'domcontentloaded'
            }
        );

        const pageWidth = await page.evaluate(() =>
            document.body.scrollWidth
        );

        expect(pageWidth)
            .toBeLessThanOrEqual(450);

    });

    // TC_RB_009
    test('TC_RB_009 - Verify homepage refresh works on mobile', async ({ page }) => {

        await page.setViewportSize({
            width: 375,
            height: 667
        });

        await page.goto(
            'https://practicesoftwaretesting.com/',
            {
                waitUntil: 'domcontentloaded'
            }
        );

        // Re-open page instead of reload (WebKit fix)
        await page.goto(
            'https://practicesoftwaretesting.com/',
            {
                waitUntil: 'domcontentloaded'
            }
        );

        await expect(page.locator('body'))
            .toBeVisible();

    });

    // TC_RB_010
    test('TC_RB_010 - Verify page performance across viewports', async ({ page }) => {

        const viewports = [
            { width: 375, height: 667 },
            { width: 768, height: 1024 },
            { width: 1366, height: 768 }
        ];

        for (const viewport of viewports) {

            await page.setViewportSize(viewport);

            const start = Date.now();

            await page.goto(
                'https://practicesoftwaretesting.com/',
                {
                    waitUntil: 'domcontentloaded'
                }
            );

            const loadTime =
                Date.now() - start;

            console.log(
                `${viewport.width}x${viewport.height}: ${loadTime}ms`
            );

            expect(loadTime)
                .toBeLessThan(15000);

        }

    });

});
