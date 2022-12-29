import { expect, test } from "@playwright/test";
import SandBoxSliderService from "../PageObjectModel-POM/SandBoxSliderService.Input";

test.use({
    baseURL: 'https://automatenow.io/sandbox-automation-testing-practice-website/',
    headless: false,
});
test.describe('Handle sliders', async () => {
    let sandBoxSliderService: SandBoxSliderService | null | undefined;
    test.beforeEach(async ({ page }) => {
        sandBoxSliderService = new SandBoxSliderService(page);
        await page.goto('/slider/');
    });

    test('should slide and check the slided count in the DOM', async ({ page }) => {
        let slider = await sandBoxSliderService?.getSlider();
        let targetAmount = "29";
        let isCompleted = false;
        if (slider) {
            while (!isCompleted) {
                let sliderBoundingBox = await slider.boundingBox();
                if (sliderBoundingBox) {
                    await page.mouse.move(sliderBoundingBox.x + sliderBoundingBox.width / 2,
                        sliderBoundingBox.y + sliderBoundingBox.height / 2)
                    await page.mouse.down();
                    // 12 pixels per step up & 12 pixels per step down
                    await page.mouse.move(sliderBoundingBox.x + 327, sliderBoundingBox.y + sliderBoundingBox.height / 2);
                    await page.mouse.up();

                    if (targetAmount) {
                        isCompleted = true;
                    }
                }
            }
            await page.waitForTimeout(5000);
            expect(await sandBoxSliderService?.getSliderResultValue()).toContain(targetAmount);
        }

    });








    test.afterEach(async () => sandBoxSliderService = null);
});