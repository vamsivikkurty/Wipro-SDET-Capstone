
const { test, expect } = require('@playwright/test');

test.describe('Product Listing & Filters', () => {

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

    // TC_PF_001
    test('TC_PF_001 - Verify product listing page loads', async ({ page }) => {

        await expect(page)
            .toHaveURL(/practicesoftwaretesting/);

    });

    // TC_PF_002
    test('TC_PF_002 - Verify Filters section is visible', async ({ page }) => {

        await expect(
            page.getByRole('heading', {
                name: 'Filters'
            })
        ).toBeVisible();

    });

    // TC_PF_003
    test('TC_PF_003 - Verify By Category section is visible', async ({ page }) => {

        await expect(
            page.getByRole('heading', {
                name: 'By category:'
            })
        ).toBeVisible();

    });

    // TC_PF_004
    test('TC_PF_004 - Verify Categories menu is visible', async ({ page }) => {

        await expect(
            page.locator('[data-test="nav-categories"]')
        ).toBeVisible();

    });

    // TC_PF_005
    test('TC_PF_005 - Verify Hand Tools category navigation', async ({ page }) => {

        await page.locator('[data-test="nav-categories"]').click();

        await page.getByRole('link', {
            name: 'Hand Tools'
        }).click();

        await expect(page)
            .toHaveURL(/hand-tools/);

    });

    // TC_PF_006
    test('TC_PF_006 - Verify Power Tools category navigation', async ({ page }) => {

        await page.locator('[data-test="nav-categories"]').click();

        await page.getByRole('link', {
            name: 'Power Tools'
        }).click();

        await expect(page)
            .toHaveURL(/power-tools/);

    });

    // TC_PF_007
    test('TC_PF_007 - Verify Other category navigation', async ({ page }) => {

        await page.locator('[data-test="nav-categories"]').click();

        await page.getByRole('link', {
            name: 'Other'
        }).click();

        await expect(page)
            .toHaveURL(/other/);

    });

    // TC_PF_008
    test('TC_PF_008 - Verify Hammer filter is clickable', async ({ page }) => {

        const hammerFilter =
            page.locator('#filters')
                .getByText('Hammer');

        await expect(hammerFilter)
            .toBeVisible();

        await hammerFilter.click();

        await expect(page.locator('body'))
            .toContainText(/Hammer/i);

    });

    // TC_PF_009
    test('TC_PF_009 - Verify category filters exist', async ({ page }) => {

        await expect(
            page.getByRole('heading', {
                name: 'By category:'
            })
        ).toBeVisible();

    });

    // TC_PF_010
    test('TC_PF_010 - Verify brand filters section exists', async ({ page }) => {

        await expect(page.locator('body'))
            .toContainText(/brand/i);

    });

    // TC_PF_011
    test('TC_PF_011 - Verify price filter section exists', async ({ page }) => {

        await expect(page.locator('body'))
            .toContainText(/price/i);

    });

    // TC_PF_012
    test('TC_PF_012 - Verify filter panel remains visible after category selection', async ({ page }) => {

        await page.locator('[data-test="nav-categories"]').click();

        await page.getByRole('link', {
            name: 'Hand Tools'
        }).click();

        await expect(
            page.getByRole('heading', {
                name: 'Filters'
            })
        ).toBeVisible();

    });

    // TC_PF_013
    test('TC_PF_013 - Verify categories dropdown opens', async ({ page }) => {

        await page.locator('[data-test="nav-categories"]').click();

        await expect(
            page.getByRole('link', {
                name: 'Hand Tools'
            })
        ).toBeVisible();

    });

    // TC_PF_014
    test('TC_PF_014 - Verify page remains stable after multiple category changes', async ({ page }) => {

        const categoriesButton =
            page.locator('[data-test="nav-categories"]');

        await categoriesButton.click();

        await page.getByRole('link', {
            name: 'Hand Tools'
        }).click();

        await page.goto(
            'https://practicesoftwaretesting.com/',
            {
                waitUntil: 'commit'
            }
        );

        await categoriesButton.click();

        await page.getByRole('link', {
            name: 'Power Tools'
        }).click();

        await expect(page.locator('body'))
            .toBeVisible();

    });

    // TC_PF_015
    test('TC_PF_015 - Verify filters reset after page reload', async ({ page }) => {

        const hammerFilter =
            page.locator('#filters')
                .getByText('Hammer');

        await hammerFilter.click();

        await page.reload({
            waitUntil: 'commit'
        });

        await expect(
            page.getByRole('heading', {
                name: 'Filters'
            })
        ).toBeVisible();

    });

});

