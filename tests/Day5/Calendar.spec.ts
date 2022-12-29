import { expect, test } from "@playwright/test";
import moment from "moment";

const inputDateToBeSelected: string = moment().add(1, 'day').format("MMMM DD, YYYY");
test.use({
    baseURL: 'https://automatenow.io/sandbox-automation-testing-practice-website/'
});

test.beforeEach(async ({ page }) => {
    await page.goto('/calendars/');
})
test("should check for a valid date of a calendar", async ({ page }) => {

    await page.click("//input[@class='date jp-contact-form-date hasDatepicker']");
    const datePicker = page.locator("//input[@class='date jp-contact-form-date hasDatepicker']");
    await datePicker.type(inputDateToBeSelected);
    await datePicker.press("Tab");
    await page.getByRole('button', { name: 'Submit' }).click();
    const result = await page.locator("//div[@class='field-value']").innerText();
    expect(result).toContain(inputDateToBeSelected);
});