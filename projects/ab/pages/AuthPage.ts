import { Page } from "@playwright/test"
import test from "../baseTest"
import urls from "../data/urls.json"

export default class AuthPage {
    url = urls.paths.ui.base + urls.paths.ui.auth

    constructor(private page: Page) { }

    selectors = {
        emailForm: {
            emailInput: '//input[@data-cy= "input--email"]',
            nextButton: '//button[@data-cy = "btn--primary"]'
        },
        confirmForm: {
            confirmCodeInput: '//div[@class = "verification-code"]/input'
        },
        comfirmPasswordForm: {
            comfirmPasswordInput: '//input[@data-cy= "input--password"]',
            loginButton: '//button[@data-cy = "btn--primary"]'
        }
    }

    async goto() {
        await test.step("Переход на страницу авторизации", async () => {
            await this.page.goto(this.url)
        })
    }

    async fillForm(email: string) {
        await test.step("Заполнение и отправка формы авторизации", async () => {
            await this.page.fill(this.selectors.emailForm.emailInput, email)
            await Promise.all([
                this.page.click(this.selectors.emailForm.nextButton),
                this.page.waitForResponse(response =>
                    response.url().includes(urls.paths.api.confirm)
                    && response.status() === 200
                    && response.request().method() === 'POST')
            ])
        })
    }

    async confirmCode(code: string) {
        await test.step("Ввод кода подтверждения email", async () => {
            let countNumber = code.split('')
            for (let i = 0; i < countNumber.length; i++) {
                let input = await this.page.locator(this.selectors.confirmForm.confirmCodeInput).nth(i)
                await input.fill(countNumber[i])
            }
        })
    }

    async fillPassword(code: string) {
        await test.step("Ввод пароля", async () => {
            await this.page.fill(this.selectors.comfirmPasswordForm.comfirmPasswordInput, code)
            await Promise.all([
                this.page.click(this.selectors.comfirmPasswordForm.loginButton),
                this.page.waitForResponse(response =>
                    response.url().includes(urls.paths.api.login)
                    && response.status() === 200
                    && response.request().method() === 'POST')
            ])
        })
    }
}
