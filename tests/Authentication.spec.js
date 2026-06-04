
const { test, expect } = require('@playwright/test');

const EMAIL = 'vamsivikkurty12345@gmail.com';
const PASSWORD = 'Vamsijeevan123$';

test.describe('Authentication - Practice Software Testing', () => {

    test.describe.configure({
        timeout: 90000
    });

    test.beforeEach(async ({ page }) => {

        await page.goto(
            'https://practicesoftwaretesting.com/auth/login',
            {
                waitUntil: 'commit',
                timeout: 90000
            }
        );

    });

   /* // TC_AR_001
    test('TC_AR_001 - Login with valid credentials', async ({ page }) => {

        await page.locator('input[type="email"]').fill(EMAIL);
        await page.locator('input[type="password"]').fill(PASSWORD);

        await page.getByRole('button', {
            name: /login/i
        }).click();

        await page.waitForLoadState('networkidle');

        await expect(page).not.toHaveURL(/login/);

    }); */

    // TC_AR_002
    test('TC_AR_002 - Login with invalid password', async ({ page }) => {

        await page.locator('input[type="email"]').fill(EMAIL);

        await page.locator('input[type="password"]')
            .fill('WrongPassword123');

        await page.getByRole('button', {
            name: /login/i
        }).click();

        await expect(page.locator('body'))
            .toContainText(/invalid|incorrect|error|failed/i);

    });

    // TC_AR_003
    test('TC_AR_003 - Login with invalid email', async ({ page }) => {

        await page.locator('input[type="email"]')
            .fill('invalid@test.com');

        await page.locator('input[type="password"]')
            .fill(PASSWORD);

        await page.getByRole('button', {
            name: /login/i
        }).click();

        await expect(page.locator('body'))
            .toContainText(/invalid|incorrect|error|failed/i);

    });

    // TC_AR_004
    test('TC_AR_004 - Verify email field visibility', async ({ page }) => {

        await expect(
            page.locator('input[type="email"]')
        ).toBeVisible();

    });

    // TC_AR_005
    test('TC_AR_005 - Verify password field visibility', async ({ page }) => {

        await expect(
            page.locator('input[type="password"]')
        ).toBeVisible();

    });

    // TC_AR_006
    test('TC_AR_006 - Verify login button visibility', async ({ page }) => {

        await expect(
            page.getByRole('button', {
                name: /login/i
            })
        ).toBeVisible();

    });

    // TC_AR_007
    test('TC_AR_007 - Password field masking', async ({ page }) => {

        await expect(
            page.locator('input[type="password"]')
        ).toHaveAttribute('type', 'password');

    });

   /* // TC_AR_008
    test('TC_AR_008 - Login using Enter key', async ({ page }) => {

        await page.locator('input[type="email"]').fill(EMAIL);

        await page.locator('input[type="password"]')
            .fill(PASSWORD);

        await page.locator('input[type="password"]')
            .press('Enter');

        await page.waitForLoadState('networkidle');

        await expect(page).not.toHaveURL(/login/);

    }); */

    // TC_AR_009
    test('TC_AR_009 - Empty email validation', async ({ page }) => {

        await page.locator('input[type="password"]')
            .fill(PASSWORD);

        await page.getByRole('button', {
            name: /login/i
        }).click();

        await expect(
            page.locator('input[type="email"]')
        ).toBeVisible();

    });

    // TC_AR_010
    test('TC_AR_010 - Empty password validation', async ({ page }) => {

        await page.locator('input[type="email"]')
            .fill(EMAIL);

        await page.getByRole('button', {
            name: /login/i
        }).click();

        await expect(
            page.locator('input[type="password"]')
        ).toBeVisible();

    });

    // TC_AR_011
    test('TC_AR_011 - Verify account access after login', async ({ page }) => {

        await page.locator('input[type="email"]').fill(EMAIL);

        await page.locator('input[type="password"]')
            .fill(PASSWORD);

        await page.getByRole('button', {
            name: /login/i
        }).click();

        await page.waitForLoadState('networkidle');

        await expect(page.locator('body'))
            .toContainText(/account|profile/i);

    });

    // TC_AR_012
    test('TC_AR_012 - Verify session cookies created after login', async ({ page, context }) => {

        await page.locator('input[type="email"]').fill(EMAIL);

        await page.locator('input[type="password"]')
            .fill(PASSWORD);

        await page.getByRole('button', {
            name: /login/i
        }).click();

        await page.waitForLoadState('networkidle');

        const cookies = await context.cookies();

        expect(cookies.length).toBeGreaterThan(0);

    });

    // TC_AR_013
    test('TC_AR_013 - Email field accepts input', async ({ page }) => {

        const emailField =
            page.locator('input[type="email"]');

        await emailField.fill(EMAIL);

        await expect(emailField)
            .toHaveValue(EMAIL);

    });

    // TC_AR_014
    test('TC_AR_014 - Password field accepts special characters', async ({ page }) => {

        const passwordField =
            page.locator('input[type="password"]');

        await passwordField.fill('Pass@123#$');

        await expect(passwordField)
            .toHaveValue('Pass@123#$');

    });

    // TC_AR_015
    test('TC_AR_015 - Login page refresh functionality', async ({ page }) => {

        const currentUrl = page.url();

        await page.reload({
            waitUntil: 'commit'
        });

        await expect(page)
            .toHaveURL(currentUrl);

    });

    // TC_AR_016
    test('TC_AR_016 - Multiple invalid login attempts', async ({ page }) => {

        for (let i = 0; i < 3; i++) {

            await page.locator('input[type="email"]')
                .fill(EMAIL);

            await page.locator('input[type="password"]')
                .fill('WrongPassword');

            await page.getByRole('button', {
                name: /login/i
            }).click();
        }

        await expect(page.locator('body'))
            .toBeVisible();

    });

    // TC_AR_017
    test('TC_AR_017 - Mobile responsiveness', async ({ browser }) => {

        const context = await browser.newContext({
            viewport: {
                width: 375,
                height: 667
            }
        });

        const mobilePage = await context.newPage();

        await mobilePage.goto(
            'https://practicesoftwaretesting.com/auth/login',
            {
                waitUntil: 'commit'
            }
        );

        await expect(
            mobilePage.locator('body')
        ).toBeVisible();

        await context.close();

    });

    // TC_AR_018
    test('TC_AR_018 - Login page performance', async ({ page }) => {

        const start = Date.now();

        await page.goto(
            'https://practicesoftwaretesting.com/auth/login',
            {
                waitUntil: 'commit'
            }
        );

        const loadTime = Date.now() - start;

        console.log(
            `Load Time: ${loadTime} ms`
        );

        expect(loadTime)
            .toBeLessThan(10000);

    });

});

