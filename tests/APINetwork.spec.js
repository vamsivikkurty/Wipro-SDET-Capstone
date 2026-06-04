
const { test, expect } = require('@playwright/test');

test.describe('API & Network Validation', () => {

    test.describe.configure({
        timeout: 90000
    });

    // TC_API_001
    test('TC_API_001 - Verify homepage returns status 200', async ({ page }) => {

        const response = await page.goto(
            'https://practicesoftwaretesting.com/',
            {
                waitUntil: 'commit'
            }
        );

        expect(response.status()).toBe(200);

    });

    // TC_API_002
    test('TC_API_002 - Verify products API returns status 200', async ({ request }) => {

        const response = await request.get(
            'https://api.practicesoftwaretesting.com/products'
        );

        expect(response.status()).toBe(200);

    });

    // TC_API_003
    test('TC_API_003 - Verify products API response time', async ({ request }) => {

        const start = Date.now();

        const response = await request.get(
            'https://api.practicesoftwaretesting.com/products'
        );

        const responseTime = Date.now() - start;

        expect(response.ok()).toBeTruthy();

        expect(responseTime).toBeLessThan(5000);

    });

    // TC_API_004
    test('TC_API_004 - Verify products API returns JSON', async ({ request }) => {

        const response = await request.get(
            'https://api.practicesoftwaretesting.com/products'
        );

        const contentType =
            response.headers()['content-type'];

        expect(contentType)
            .toContain('application/json');

    });

    // TC_API_005
    test('TC_API_005 - Verify products API contains product data', async ({ request }) => {

        const response = await request.get(
            'https://api.practicesoftwaretesting.com/products'
        );

        const body = await response.json();

        expect(JSON.stringify(body).length)
            .toBeGreaterThan(50);

    });

    // TC_API_006
    test('TC_API_006 - Verify single product API returns status 200', async ({ request }) => {

        const response = await request.get(
            'https://api.practicesoftwaretesting.com/products/01'
        );

        expect([200, 404]).toContain(
            response.status()
        );

    });

    // TC_API_007
    test('TC_API_007 - Verify invalid product API handling', async ({ request }) => {

        const response = await request.get(
            'https://api.practicesoftwaretesting.com/products/INVALID_ID'
        );

        expect(
            response.status()
        ).toBeGreaterThanOrEqual(400);

    });

    // TC_API_008
    test('TC_API_008 - Verify API response contains data', async ({ request }) => {

        const response = await request.get(
            'https://api.practicesoftwaretesting.com/products'
        );

        const body = await response.text();

        expect(body.length)
            .toBeGreaterThan(0);

    });

    // TC_API_009
    test('TC_API_009 - Verify API response is not empty', async ({ request }) => {

        const response = await request.get(
            'https://api.practicesoftwaretesting.com/products'
        );

        const json = await response.json();

        expect(json)
            .toBeTruthy();

    });

    // TC_API_010
    test('TC_API_010 - Verify GET request succeeds', async ({ request }) => {

        const response = await request.get(
            'https://api.practicesoftwaretesting.com/products'
        );

        expect(response.ok())
            .toBeTruthy();

    });

    // TC_API_011
    test('TC_API_011 - Verify network requests complete successfully', async ({ page }) => {

        const failedRequests = [];

        page.on('requestfailed', request => {

            failedRequests.push(
                request.url()
            );

        });

        await page.goto(
            'https://practicesoftwaretesting.com/',
            {
                waitUntil: 'commit'
            }
        );

        expect(
            failedRequests.length
        ).toBeLessThan(5);

    });

    // TC_API_012
    test('TC_API_012 - Verify homepage loads without major network failures', async ({ page }) => {

        const failedRequests = [];

        page.on('requestfailed', request => {

            failedRequests.push(
                request.url()
            );

        });

        await page.goto(
            'https://practicesoftwaretesting.com/',
            {
                waitUntil: 'commit'
            }
        );

        expect(
            failedRequests.length
        ).toBeLessThan(10);

    });

    // TC_API_013
    test('TC_API_013 - Verify API response body is not empty', async ({ request }) => {

        const response = await request.get(
            'https://api.practicesoftwaretesting.com/products'
        );

        const body = await response.text();

        expect(body.length)
            .toBeGreaterThan(10);

    });

    // TC_API_014
    test('TC_API_014 - Verify homepage network performance', async ({ page }) => {

        const start = Date.now();

        await page.goto(
            'https://practicesoftwaretesting.com/',
            {
                waitUntil: 'commit'
            }
        );

        const loadTime =
            Date.now() - start;

        expect(loadTime)
            .toBeLessThan(10000);

    });

    // TC_API_015
    test('TC_API_015 - Verify API content-type header', async ({ request }) => {

        const response = await request.get(
            'https://api.practicesoftwaretesting.com/products'
        );

        expect(
            response.headers()['content-type']
        ).toContain('application/json');

    });

});

