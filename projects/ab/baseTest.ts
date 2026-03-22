import AuthPage from "./pages/AuthPage";
import { test as BaseTest, request } from "@playwright/test";
import AuthorizationSteps from "./steps/authorizationSteps";
import CreateTransactionSteps from "./steps/createTransactionSteps";
import HomePage from "./pages/HomePage";

const test = BaseTest.extend<{
    authPage: AuthPage;
    homePage: HomePage;
    authorizationSteps:AuthorizationSteps;
    createTransactionSteps:CreateTransactionSteps;
}>({
    authPage: async ({ page }, use) => { await use(new AuthPage(page)) },
    homePage: async ({ page }, use) => { await use(new HomePage(page)) },
    createTransactionSteps: async ({ homePage }, use) => { await use(new CreateTransactionSteps(homePage)) },
    authorizationSteps: async ({ authPage, createTransactionSteps }, use) => { await use(new AuthorizationSteps(authPage, createTransactionSteps)) }
   })

export default test;
export const expect = test.expect;