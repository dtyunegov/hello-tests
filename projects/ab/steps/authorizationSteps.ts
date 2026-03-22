import AuthPage from "../pages/AuthPage";
import { CredsType } from "../types/credsType";
import CreateTransactionSteps from "./createTransactionSteps";

export default class AuthorizationSteps {
    constructor(private authPage: AuthPage, private createTransactionSteps: CreateTransactionSteps) { }

    async auth(creds: CredsType) {
        await this.authPage.goto()
        await this.authPage.fillForm(creds.login)
        await this.authPage.confirmCode(creds.code)
        await this.authPage.fillPassword(creds.password)

        return {
            goto: this.createTransactionSteps.goto.bind(this.createTransactionSteps)
        }
    }
}