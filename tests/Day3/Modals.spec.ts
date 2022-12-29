import { expect, test } from "@playwright/test";
import ModalsService from "../PageObjectModel-POM/ModalsService";


test.use({
    baseURL: 'https://automatenow.io/sandbox-automation-testing-practice-website/',
    headless: false,
});

test.describe('Handle Modals', async () => {

    let modalsService: ModalsService | null | undefined;

    test.beforeEach(async ({ page }) => {
        modalsService = new ModalsService(page);
        await page.goto('/modals/');
    });

    test.afterEach(async () => modalsService = null);

    test('should check if the simple modal is visible and should close the modal', async ({ page }) => {

        await modalsService?.clickOnSimpleModal();
        const simpleModal = await modalsService?.getSimpleModalLocator();
        expect(await simpleModal?.isVisible()).toBe(true);

        await modalsService?.closeSimpleModal();
        await page.waitForTimeout(2000);
        expect(await simpleModal?.isVisible()).toBe(false);
    });


    test('should check if the form modal is visible', async ({ page }) => {

        await modalsService?.clickOnFormModal();
        const formModal = await modalsService?.getFormModalLocator();
        expect(await formModal?.isVisible()).toBe(true);

        const nameField = await modalsService?.getFormModal_NameField();
        await nameField?.fill('playwright');

        await modalsService?.clickOnFormModal_SubmitField();
        await page.waitForTimeout(2000);
        expect(await formModal?.isVisible()).toBe(false);

    });

});