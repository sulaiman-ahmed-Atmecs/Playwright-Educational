import { expect, test } from "@playwright/test";

test.use({
    baseURL: 'https://automatenow.io/sandbox-automation-testing-practice-website/'
});

test.describe('Handle Tables', async () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/tables/');
    });

    test('should check check for the changed status on hover event', async ({ page }) => {
        await page.locator("#mouse_over").hover();
        const changedText = await page.locator('#mouse_over').textContent();
        console.log("HTML content is :" + changedText);
        expect(changedText).toBe('You did it!');
    });
});