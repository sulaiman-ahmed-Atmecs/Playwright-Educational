import { expect, test } from "@playwright/test";
import SandBoxAlertServiceInputService from "../PageObjectModel-POM/SandBoxAlertService.inputs";

test.use({
    baseURL: 'https://automatenow.io/sandbox-automation-testing-practice-website/'
});

test.describe('Handle popups', async () => {
    let sandBoxAlertServiceInputService: SandBoxAlertServiceInputService | null | undefined;

    test.beforeEach(async ({ page }) => {
        sandBoxAlertServiceInputService = new SandBoxAlertServiceInputService(page);
        await page.goto('/popups');
    });

    test('should click and close the alert', async ({ page }) => {
        page.on('dialog', async dialog => {
            expect(dialog.message()).toBe('Hi there, pal!');
            dialog.accept();
        });
        await sandBoxAlertServiceInputService?.clickOnAlertButton();
    });
    test('should click and close the confirm popup', async ({ page }) => {
        page.on('dialog', async dialog => {
            await dialog.dismiss();
        });
        await sandBoxAlertServiceInputService?.clickOnConfirmButton();
        const cancelResult = await sandBoxAlertServiceInputService?.getConfirmPopupResultMessage();
        expect(cancelResult).toContain('Cancel');

    });
    test('should click and accept the confirm popup', async ({ page }) => {
        page.on('dialog', async dialog => {
            await dialog.accept();
        });
        await sandBoxAlertServiceInputService?.clickOnConfirmButton();
        const okResult = await sandBoxAlertServiceInputService?.getConfirmPopupResultMessage();
        expect(okResult).toContain('OK');

    });
    test('should click and enter some data  prompt popup', async ({ page }) => {
        page.on('dialog', async dialog => {
            dialog.accept("playwright");
        });
        await sandBoxAlertServiceInputService?.clickOnPromptButton();
        const promptInputResult = await sandBoxAlertServiceInputService?.getPromptPopupResultMessage();
        expect(promptInputResult).toContain("playwright");
    });
    test('should click and close the prompt without entering any information in the prompt', async ({ page }) => {
        page.on('dialog', async dialog => {
            dialog.dismiss();
        });
        await sandBoxAlertServiceInputService?.clickOnPromptButton();
        const promptInputResult = await sandBoxAlertServiceInputService?.getPromptPopupResultMessage();
        expect(promptInputResult).toContain("Fine, be that way");
    });

    test.afterEach(async () => sandBoxAlertServiceInputService = null);
});