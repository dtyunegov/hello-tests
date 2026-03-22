import { Page } from "@playwright/test"
import test from "../baseTest"
import urls from "../data/urls.json"

export default class HomePage {
    url = urls.paths.ui.base

    constructor(private page: Page) { }

    selectors = {
        toBeReceivedForm: {
            select: '//label[@data-cy = "receive--input-and-select"]//div[contains(@class, "input-select__select select__width")]',
            currencyTypeInput: (value:"CNY") =>  `//li/span[text() = '${value}']`,
            input: '//label[@data-cy = "receive--input-and-select"]//input'
        },
        toBePaidForm: {
            errorMessageLabel: '//span[text() = "К оплате"]/ancestor::div[@class = "control-wrapper__wrapper"]//span[@data-cy = "hint-message"]'
        },
        continueButton: '//button[@data-cy = "btn--continue"]'
    }

    async goto(params: {paymentCommonType: "fiat", direction: "SEND"}) {
        await test.step("Переход на главную страницу", async () => { 
            let url = `${this.url}?paymentCommonType=${params.paymentCommonType}&direction=${params.direction}`
            await this.page.goto(url)
            await this.page.waitForURL(url)
        })
    }

    async selectReceiveCurrencyType(currencyType: "CNY"){
        await test.step("Выбор валюты в форме 'К получению'", async () => { 
            await this.page.click(this.selectors.toBeReceivedForm.select)
            await this.page.click(this.selectors.toBeReceivedForm.currencyTypeInput(currencyType))
        })
    }

    async fillReceiveCurrencyAmount(value: string){
        await test.step("Заполнение суммы 'К получению'", async () => { 
            await this.page.fill(this.selectors.toBeReceivedForm.input, value)
        })
    }
}
