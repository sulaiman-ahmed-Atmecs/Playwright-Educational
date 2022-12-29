import { Page } from "@playwright/test";

export default class TablesService {
    constructor(public page: Page) { }

    async clickOnSearchButton(): Promise<void> {
        return await this.page.getByLabel('Search:').click();
    }

    async enterSearchTextInSearchBox(searchText: string): Promise<void> {
        return await this.page.getByLabel('Search:').fill(searchText);
    }

}