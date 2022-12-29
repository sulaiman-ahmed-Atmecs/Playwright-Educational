import { Page } from "playwright-core";

export default class SandBoxAlertServiceInputService {

    private readonly alertBoxHTMLElement_SelectorID: string = '#alert';
    private readonly confirmBoxHTMLElement_SelectorID: string = '#confirm';
    private readonly promptBoxHTMLElement_SelectorID: string = '#prompt';
    private readonly confirmHTMLElementResult_SelectorID: string = '#confirmResult';
    private readonly promptInputResultHTMLElement_SelectorID: string = '#promptResult';


    constructor(public page: Page) { }

    async clickOnAlertButton(): Promise<void> {
        return await this.page.locator(this.alertBoxHTMLElement_SelectorID).click();
    }
    async clickOnConfirmButton(): Promise<void> {
        return await this.page.locator(this.confirmBoxHTMLElement_SelectorID).click();
    }
    async clickOnPromptButton(): Promise<void> {
        return await this.page.locator(this.promptBoxHTMLElement_SelectorID).click();
    }
    async getConfirmPopupResultMessage(): Promise<string> {
        return await this.page.locator(this.confirmHTMLElementResult_SelectorID).innerText()
    }
    async getPromptPopupResultMessage(): Promise<string> {
        return await this.page.locator(this.promptInputResultHTMLElement_SelectorID).innerText();
    }
}