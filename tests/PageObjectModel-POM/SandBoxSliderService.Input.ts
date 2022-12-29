import { Locator, Page } from "@playwright/test";

export default class SandBoxSliderService {
    private readonly sliderHTMLElement_SelectorID: string = "//input[@type='range']";
    private readonly sliderResultHTMLElement_SelectorID: string = "//span[@id='value']";

    constructor(public page: Page) { }

    async getSlider(): Promise<Locator> {
        const slider = this.page.locator(this.sliderHTMLElement_SelectorID);
        return await Promise.resolve(slider);
    }
    async getSliderResultValue(): Promise<String> {
        const sliderResult = this.page.locator(this.sliderResultHTMLElement_SelectorID).innerText();
        return await sliderResult;
    }
}