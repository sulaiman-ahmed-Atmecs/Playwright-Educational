import { expect, test } from '@playwright/test';
import SauceDemoLoginPageService from '../PageObjectModel-POM/SauceDemoLoginPage.Inputs';


test.use({
    baseURL: "https://www.saucedemo.com/",
    headless: false
});

test.describe('Saucedemo login screen test suites', async () => {
    let sauceDemoLoginPageService: SauceDemoLoginPageService | null | undefined;


    test.beforeEach(({ page }) => {
        sauceDemoLoginPageService = new SauceDemoLoginPageService(page);
    });


    // TC for Successful Login.

    test('should login to saucedemo', async ({ page }) => {
        await page.goto("/");
        await sauceDemoLoginPageService?.enterUsername("standard_user");
        await sauceDemoLoginPageService?.enterPassword("secret_sauce");
        await sauceDemoLoginPageService?.clickLoginButton();
        await expect(page).toHaveURL(/inventory/);
    });

    // TC for Invalid Login

    test.only('should display login error message when username and password is empty and login button is clicked', async ({ page }) => {
        await page.goto("/");
        await sauceDemoLoginPageService?.clickLoginButton();
        expect(await sauceDemoLoginPageService?.getErrorMessageHeadingIsVisible()).toEqual(true)
    });

    test.afterEach(() => { sauceDemoLoginPageService = null })
});