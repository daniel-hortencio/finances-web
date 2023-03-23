import { Currency } from "../enums/Currency";

/* export type Statement_ = {
    year: number;
    month: number;
    transactions: Transaction[];
} */

export type Exchange = {
    id_exchange: string;
    input_value: number;
    input_currency: Currency;
    output_value: number;
    output_currency: Currency;
    date: string;
    id_user: string;
}

export type IUpdateExchangeDTO = Omit<Exchange, 'id_user'>;

export interface ICreateExchangeDTO extends Omit<Exchange, 'id_exchange' | 'output_value' | 'input_value' | 'id_user'> {
    input_value: string | number;
    output_value: string | number;
}
