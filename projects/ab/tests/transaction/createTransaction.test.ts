import test, { expect } from "../../baseTest";
import { Creds } from "../../data/creds";
import urls from "../../data/urls.json"

test.describe.parallel("Создать транзакцию", () => {
   test('Минимальная сумма платежа ', async({authorizationSteps, homePage, page}) => {
        let auth = await authorizationSteps.auth(Creds.testUser)
        await auth.goto({paymentCommonType: "fiat", direction: "SEND"})
        
        await homePage.selectReceiveCurrencyType("CNY")
        await Promise.all([
            homePage.fillReceiveCurrencyAmount("1000"),
            page.waitForResponse(response =>
                    response.url().includes(urls.paths.api.calculateAmount)
                    && response.status() === 200
                    && response.request().method() === 'POST')
        ])
        await expect(await page.textContent(homePage.selectors.toBePaidForm.errorMessageLabel), "Проверка сообщения об ошибке").toContain("Сумма должна быть не менее ")
        await expect(page.locator(homePage.selectors.continueButton), "Проверка доступности кнопки 'Продолжить'").toBeDisabled()
    })
})