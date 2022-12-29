import { expect, test } from "@playwright/test";
import TablesService from "../PageObjectModel-POM/TablesService";


test.use({
    baseURL: 'https://automatenow.io/sandbox-automation-testing-practice-website/'
});

test.describe('Handle Tables', async () => {

    let tablesService: TablesService | null | undefined;

    test.beforeEach(async ({ page }) => {
        tablesService = new TablesService(page);
        await page.goto('/tables/');
    });

    test.afterEach(async () => tablesService = null);

    test('should check if the contents searched in search box are visible in the search results of the table', async ({ page }) => {

        await tablesService?.clickOnSearchButton();
        await tablesService?.enterSearchTextInSearchBox('ind');

        const tableRows = await page.$$('tr:has-text("Ind")');

        for await (const tableRow of tableRows) {
            let rowText = await tableRow.innerText();
            expect(rowText).toContain("Ind");
        }
    });
});