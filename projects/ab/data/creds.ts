import { CredsType } from "../types/credsType";

export class Creds {
    static testUser: CredsType = {
        login: process.env.LOGIN as string,
        password: process.env.PASSWORD as string,
        code: process.env.CODE as string
    }
}