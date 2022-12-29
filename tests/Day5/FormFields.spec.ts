import { expect, test } from "@playwright/test";
import FormFieldDataService from "../PageObjectModel-POM/FormFieldDataService";

test.use({
    baseURL: 'https://automatenow.io/sandbox-automation-testing-practice-website/'
});

test.describe('Handle Form Fields', async () => {
    let formDataService;
    test.beforeEach(async ({ page }) => {
        formDataService = new FormFieldDataService();
        await page.goto('/form-fields/');
    });

    test('should validate the form fields with valid data', async ({ page }) => {
        await expect(page).toHaveURL(/.*form-fields/);
        const inputTextForName = page.getByLabel('Name(required)');
        await inputTextForName.click();
        const validFormData = formDataService.getValidFormData();
        await inputTextForName.fill(validFormData.formName);
        await page.getByLabel(validFormData.FavoriteDrink).check();
        await page.getByText(validFormData.FavoriteColour).click();
        await page.getByRole('textbox', { name: 'Email' }).fill(validFormData.email);
        await page.getByRole('combobox', { name: 'Do you have any siblings?' }).selectOption('Yes');
        await page.getByRole('button', { name: 'Submit' }).click();

        const result = await page.locator("//h4[@id='contact-form-success-header']").innerText();
        expect(result).toBe('Your message has been sent');
    });
    test("should validate the form with required valid data", async ({ page }) => {
        await expect(page).toHaveURL(/.*form-fields/);
        
        const inputTextForName = page.getByLabel('Name(required)');
        await inputTextForName.click();
        const validFormData = formDataService.getRequiredValidFormData()
        await inputTextForName.fill(validFormData.formName);
        await page.getByRole('button', { name: 'Submit' }).click();
    
        const result = await page.locator("//h4[@id='contact-form-success-header']").innerText();
        expect(result).toBe('Your message has been sent');
    });

    test("should validate the form with invalid data", async ({ page }) => {
        await expect(page).toHaveURL(/.*form-fields/);
        await page.waitForLoadState();
        const inputTextForName = page.locator("//div[@class='wp-block-jetpack-contact-form']//input[@class='name']");
        await page.getByRole('button', { name: 'Submit' }).click();

        await expect(page).toHaveURL(/.*form-fields/);
        await expect(inputTextForName).toBeFocused();
    });
});