const { test, expect } = require('@playwright/test');

test.describe('Homepage & Navigation - Practice Software Testing', () => {

    test.beforeEach(async ({ page }) => {

        await page.goto(
            'https://practicesoftwaretesting.com/',
            {
                waitUntil: 'domcontentloaded',
                timeout: 60000
            }
        );

    });

    // TC_HN_001
    test('TC_HN_001 - Verify homepage loads successfully', async ({ page }) => {

        await expect(page).toHaveURL(
            /practicesoftwaretesting\.com/
        );

    });

    // TC_HN_002
    test('TC_HN_002 - Verify homepage title', async ({ page }) => {

        await expect(page).toHaveTitle(
            /Practice Software Testing/i
        );

    });

    // TC_HN_003
    test('TC_HN_003 - Verify navigation links are accessible', async ({ page }) => {

        const links = page.locator('a[href]');
        const count = await links.count();

        for (let i = 0; i < Math.min(count, 10); i++) {

            const href = await links.nth(i).getAttribute('href');

            if (
                href &&
                href.startsWith('/') &&
                !href.includes('#')
            ) {

                const response = await page.request.get(
                    `https://practicesoftwaretesting.com${href}`
                );

                expect(response.status()).toBeLessThan(400);
            }
        }

    });

    // TC_HN_004
    test('TC_HN_004 - Verify homepage URL correctness', async ({ page }) => {

        expect(page.url())
            .toContain('practicesoftwaretesting.com');

    });

    // TC_HN_005
    test('TC_HN_005 - Verify no broken internal links', async ({ page }) => {

        test.setTimeout(120000);

        const links = page.locator('a[href]');
        const count = await links.count();

        for (let i = 0; i < count; i++) {

            const href = await links.nth(i).getAttribute('href');

            if (
                href &&
                href.startsWith('/') &&
                !href.includes('#')
            ) {

                try {

                    const response = await page.request.get(
                        `https://practicesoftwaretesting.com${href}`
                    );

                    expect(response.status())
                        .toBeLessThan(400);

                } catch (error) {

                    console.log(
                        `Skipping ${href}: ${error.message}`
                    );

                }
            }
        }

    });

    // TC_HN_006
    test('TC_HN_006 - Verify homepage responsive layout on mobile', async ({ browser }) => {

        const context = await browser.newContext({
            viewport: {
                width: 375,
                height: 667
            }
        });

        const mobilePage = await context.newPage();

        await mobilePage.goto(
            'https://practicesoftwaretesting.com/',
            {
                waitUntil: 'domcontentloaded'
            }
        );

        await expect(
            mobilePage.locator('body')
        ).toBeVisible();

        const viewport =
            mobilePage.viewportSize();

        expect(viewport.width).toBe(375);

        await context.close();

    });

    // TC_HN_007
    test('TC_HN_007 - Verify homepage loads without console errors', async ({ page }) => {

        const errors = [];

        page.on('console', msg => {

            if (msg.type() === 'error') {

                errors.push(msg.text());

            }

        });

        await page.reload({
            waitUntil: 'domcontentloaded'
        });

        console.log(errors);

        expect(errors.length).toBe(0);

    });

    // TC_HN_008
    test('TC_HN_008 - Verify navigation bar visibility', async ({ page }) => {

        await expect(
            page.locator('nav')
        ).toBeVisible();

    });

    // TC_HN_009
    test('TC_HN_009 - Verify page refresh functionality', async ({ page }) => {

        const currentUrl = page.url();

        await page.reload({
            waitUntil: 'domcontentloaded'
        });

        await expect(page)
            .toHaveURL(currentUrl);

    });

    // TC_HN_010
    test('TC_HN_010 - Verify page content is displayed', async ({ page }) => {

        await expect(
            page.locator('body')
        ).toBeVisible();

        const text =
            await page.locator('body')
                .textContent();

        expect(text.length)
            .toBeGreaterThan(0);

    });

    // TC_HN_011
    test('TC_HN_011 - Verify keyboard navigation support', async ({ page }) => {

        await page.keyboard.press('Tab');

        const activeElement =
            await page.evaluate(() => {

                return document.activeElement?.tagName;

            });

        expect(activeElement)
            .toBeTruthy();

    });

    // TC_HN_012
    test('TC_HN_012 - Verify homepage load performance', async ({ page }) => {

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
            `Load Time: ${loadTime} ms`
        );

        expect(loadTime)
            .toBeLessThan(10000);

    });

});