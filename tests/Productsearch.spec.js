
const { test, expect } = require('@playwright/test');

test.describe('Product Search Functionality', () => {

    test.describe.configure({
        timeout: 90000
    });

    test.beforeEach(async ({ page }) => {

        await page.goto(
            'https://practicesoftwaretesting.com/',
            {
                waitUntil: 'commit',
                timeout: 90000
            }
        );

    });

    // TC_PS_001
    test('TC_PS_001 - Verify search box is visible', async ({ page }) => {

        const searchBox =
            page.locator('input[placeholder*="Search"]').first();

        await expect(searchBox).toBeVisible();

    });

    // TC_PS_002
    test('TC_PS_002 - Verify search box is enabled', async ({ page }) => {

        const searchBox =
            page.locator('input[placeholder*="Search"]').first();

        await expect(searchBox).toBeEnabled();

    });

    // TC_PS_003
    test('TC_PS_003 - Search using valid product name', async ({ page }) => {

        const searchBox =
            page.locator('input[placeholder*="Search"]').first();

        await searchBox.fill('Hammer');

        await page.keyboard.press('Enter');

        await expect(page.locator('body'))
            .toContainText(/Hammer/i);

    });

    // TC_PS_004
    test('TC_PS_004 - Search using partial product name', async ({ page }) => {

        const searchBox =
            page.locator('input[placeholder*="Search"]').first();

        await searchBox.fill('Ham');

        await page.keyboard.press('Enter');

        await expect(page.locator('body'))
            .toContainText(/Ham/i);

    });

    // TC_PS_005
    test('TC_PS_005 - Verify case insensitive search', async ({ page }) => {

        const searchBox =
            page.locator('input[placeholder*="Search"]').first();

        await searchBox.fill('HAMMER');

        await page.keyboard.press('Enter');

        await expect(page.locator('body'))
            .toContainText(/Hammer/i);

    });

    // TC_PS_006
    test('TC_PS_006 - Search using lowercase text', async ({ page }) => {

        const searchBox =
            page.locator('input[placeholder*="Search"]').first();

        await searchBox.fill('hammer');

        await page.keyboard.press('Enter');

        await expect(page.locator('body'))
            .toContainText(/Hammer/i);

    });

    // TC_PS_007
    test('TC_PS_007 - Search with invalid product', async ({ page }) => {

        const searchBox =
            page.locator('input[placeholder*="Search"]').first();

        await searchBox.fill('XYZINVALID123');

        await page.keyboard.press('Enter');

        await expect(page.locator('body'))
            .toContainText('There are no products found.');

    });

    // TC_PS_008
    test('TC_PS_008 - Search with special characters', async ({ page }) => {

        const searchBox =
            page.locator('input[placeholder*="Search"]').first();

        await searchBox.fill('@#$%^&*');

        await page.keyboard.press('Enter');

        await expect(page.locator('body'))
            .toBeVisible();

    });

    // TC_PS_009
    test('TC_PS_009 - Search with numeric values', async ({ page }) => {

        await page.goto(
            'https://practicesoftwaretesting.com/',
            {
                waitUntil: 'commit'
            }
        );

        const searchBox =
            page.locator('input[placeholder*="Search"]').first();

        await expect(searchBox).toBeVisible();

        await searchBox.fill('12345');

        await page.keyboard.press('Enter');

        await expect(page.locator('body'))
            .toBeVisible();

    });

    // TC_PS_010
    test('TC_PS_010 - Search with empty input', async ({ page }) => {

        const searchBox =
            page.locator('input[placeholder*="Search"]').first();

        await searchBox.fill('');

        await page.keyboard.press('Enter');

        await expect(page.locator('body'))
            .toBeVisible();

    });

    // TC_PS_011
    test('TC_PS_011 - Verify search results update after new search', async ({ page }) => {

        const searchBox =
            page.locator('input[placeholder*="Search"]').first();

        await searchBox.fill('Hammer');

        await page.keyboard.press('Enter');

        await expect(page.locator('body'))
            .toContainText(/Hammer/i);

        await searchBox.fill('Pliers');

        await page.keyboard.press('Enter');

        await expect(page.locator('body'))
            .toContainText(/Pliers/i);

    });

    // TC_PS_012
    test('TC_PS_012 - Verify search field accepts long text', async ({ page }) => {

        const searchBox =
            page.locator('input[placeholder*="Search"]').first();

        await searchBox.fill(
            'abcdefghijklmnopqrstuvwxyz123456789'
        );

        await expect(searchBox)
            .toHaveValue(
                'abcdefghijklmnopqrstuvwxyz123456789'
            );

    });

    // TC_PS_013
    test('TC_PS_013 - Verify search performance', async ({ page }) => {

        const searchBox =
            page.locator('input[placeholder*="Search"]').first();

        const start = Date.now();

        await searchBox.fill('Hammer');

        await page.keyboard.press('Enter');

        const end = Date.now();

        const searchTime = end - start;

        console.log(
            `Search Time: ${searchTime} ms`
        );

        expect(searchTime)
            .toBeLessThan(5000);

    });

    // TC_PS_014
    test('TC_PS_014 - Verify page remains stable after multiple searches', async ({ page }) => {

        const searchBox =
            page.locator('input[placeholder*="Search"]').first();

        const products = [
            'Hammer',
            'Pliers',
            'Saw',
            'Wrench'
        ];

        for (const product of products) {

            await searchBox.fill(product);

            await page.keyboard.press('Enter');

            await expect(page.locator('body'))
                .toBeVisible();

        }

    });

});
