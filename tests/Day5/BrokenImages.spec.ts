import { expect, test } from "@playwright/test";

test.use({
    baseURL: 'https://automatenow.io/sandbox-automation-testing-practice-website/'
});

test.beforeEach(async ({ page }) => {
    await page.goto('/broken-images/');
});

test("Test to check for broken images", async ({ page, request }) => {
    const xPathForImageElements: string = "//div[@class='wp-block-columns is-layout-flex wp-container-4']//div[@class='wp-block-column is-layout-flow']//img";
    var images: string[] = await page.$$eval<string[], HTMLImageElement>(xPathForImageElements, async (imageElementsArray) => {
        let imageURLs: string[] = new Array();
        for await (const imageElement of imageElementsArray) {
            imageURLs.push(imageElement.src);
        }
        return imageURLs;
    });
    for await (const image of images) {
        const imageResult = await request.get(image);
        if (imageResult.status() == 200) {

            expect(imageResult.body).toBeTruthy();
        }
        else {
            expect(imageResult.status()).toBeGreaterThanOrEqual(400);
        }
    }
});