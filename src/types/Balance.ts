import { Currency } from "../enums/Currency";

export type BalanceByCurrency = {
    value: number;
    currency: Currency;
}

export type Balance = {
    id_user: string;
    balances: BalanceByCurrency[]
}
