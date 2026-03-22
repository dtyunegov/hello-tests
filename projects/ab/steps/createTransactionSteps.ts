import HomePage from "../pages/HomePage";

export default class CreateTransactionSteps {
    constructor(private homePage: HomePage){}

    async goto(params: {paymentCommonType: "fiat", direction: "SEND"}) {
        await this.homePage.goto(params)
    }

    async send(){}
}