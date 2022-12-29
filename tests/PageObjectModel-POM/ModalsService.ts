import { Locator, Page } from "@playwright/test";

export default class ModalsService {

    constructor(public page: Page) { }

    async clickOnSimpleModal(): Promise<void> {
        return await this.page.getByRole('button', { name: 'Simple Modal' }).click();
    }

    async closeSimpleModal(): Promise<void> {
        return await this.page.getByRole('button', { name: 'Close' }).click();
    }

    async getSimpleModalLocator(): Promise<Locator> {
        return await Promise.resolve(this.page.locator('#pum_popup_title_1318'));
    }

    async clickOnFormModal(): Promise<void> {
        return await Promise.resolve(this.page.getByRole('button', { name: 'Form Modal' }).click());
    }

    async clickOnFormModal_NameField(): Promise<void> {
        return await Promise.resolve(this.page.getByLabel('Name(required)').click())
    }

    async getFormModal_NameField(): Promise<Locator> {
        return await Promise.resolve(this.page.getByLabel('Name(required)'));
    }


    async clickOnFormModal_SubmitField(): Promise<void> {
        return await Promise.resolve(this.page.getByRole('button', { name: 'Submit' }).click())
    }

    async getFormModalLocator(): Promise<Locator> {
        return await Promise.resolve(this.page.locator('#popmake-674'));
    }


}