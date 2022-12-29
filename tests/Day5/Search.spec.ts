import { expect, test } from "@playwright/test";

test.use({
    baseURL: 'https://automatenow.io/sandbox-automation-testing-practice-website/'
});

test.beforeEach(async ({ page }) => {
    await page.goto('/search-box/');
});

test("should display the searched content when the search button is clicked", async ({ page }) => {
    const searchBox = page.locator("#wp-block-search__input-1");
    await searchBox.fill("cypress");
    await page.click("//button[@class='wp-block-search__button wp-element-button']");
    const searchResults = await page.locator("//h2[@class='entry-title'] //a").innerText();
    expect(searchResults).toContain("Cypress");
});

