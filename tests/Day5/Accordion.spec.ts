import { expect, test } from "@playwright/test";

test.use({
    baseURL: 'https://automatenow.io/sandbox-automation-testing-practice-website/'
});

test.beforeEach(async ({ page }) => {
    await page.goto('/accordions/');
});

test("should show the text inside the accordion when expanded", async ({ page }) => {
    // Clicking to expand the accordion
    await page.getByText('Click to see more').click();
    let actualAccordionText = page.getByText('This is an accordion item.');
    expect(actualAccordionText).not.toBeFalsy();
});

test("should not show the text inside the accordion when contracted", async ({ page }) => {
    await page.getByText('Click to see more').click();
    let actualAccordionText = page.getByText('This is an accordion item.');
    // Clicking to expand the accordion
    expect(actualAccordionText).not.toBeFalsy();
    // click again to contract the accordion
    await page.getByText('Click to see more').click();
    await expect(actualAccordionText).not.toBeVisible();
});