import { Currency } from "../enums/Currency";
import { Exchange } from "./Exchange";

export type TransactionType = "credit" | "debit"

export type Statement = {
    year: number;
    month: number;
    movements: (Transaction | Exchange)[];
}

export type Transaction = {
    id_transaction: string;
    description: string;
    value: number;
    type: TransactionType;
    currency: Currency;
    date: string;
    created_at: Date;
    id_user: string;
    id_category?: string;
}

export type IUpdateTransactionDTO = Omit<Transaction, 'created_at' | 'id_user'>

export interface ICreateTransactionDTO extends Omit<Transaction, 'id_transaction' | 'created_at' | 'value' | 'id_user'> {
    value: string | number;
}
