import { Currency } from "../enums/Currency";
import { Exchange } from "./Exchange";

export type AccountType = "credit" | "debit"

export type Statement = {
    year: number;
    month: number;
    movements: (Account | Exchange)[];
}

export type Account = {
    id_account: string;
    description: string;
    value: number;
    type: AccountType;
    currency: Currency;
    date: string;
    created_at: Date;
    id_user: string;
    id_category?: string;
}

export type IUpdateAccountDTO = Omit<Account, 'created_at' | 'id_user'>

export interface ICreateAccountDTO extends Omit<Account, 'id_account' | 'created_at' | 'value' | 'id_user'> {
    value: string | number;
}
