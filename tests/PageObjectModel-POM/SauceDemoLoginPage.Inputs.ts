import { Page, Locator } from "@playwright/test";

export default class SauceDemoLoginPageService {

    private readonly userNameHTMLInputElement_SelectorPlaceholder: string = "Username"
    private readonly passwordHTMLInputElement_SelectorPlaceholder: string = "Password";
    private readonly loginButtonHTMLElement_SelectorText: string = "LOGIN";
    private readonly loginErrorHTMLElement_SelectorLocator: string = '[data-test="error"]';

    constructor(public page: Page) { }

    async enterUsername(usernameToEnter: string): Promise<void> {
        return await this.page.getByPlaceholder(this.userNameHTMLInputElement_SelectorPlaceholder).fill(usernameToEnter);
    }

    async enterPassword(passwordToEnter: string): Promise<void> {
        return await this.page.getByPlaceholder(this.passwordHTMLInputElement_SelectorPlaceholder).fill(passwordToEnter);
    }
    async clickLoginButton(): Promise<void> {
        return await this.page.getByText(this.loginButtonHTMLElement_SelectorText).click();
    }

    async clearUsername(): Promise<void> {
        return await this.page.getByPlaceholder(this.userNameHTMLInputElement_SelectorPlaceholder).clear();
    }

    async clearPassword(): Promise<void> {
        return await this.page.getByPlaceholder(this.passwordHTMLInputElement_SelectorPlaceholder).clear();
    }

    async getErrorMessageHeadingIsVisible(): Promise<boolean> {
        return await this.page.locator(this.loginErrorHTMLElement_SelectorLocator).isVisible();
    }

}