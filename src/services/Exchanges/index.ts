import { AxiosInstance } from "axios";
import { ICreateExchangeDTO } from "../../types/Exchange";

import { api } from "../api";

class ExchangeService {
    private readonly route = "/exchange"

    constructor(private readonly api: AxiosInstance) { }

    create(dto: ICreateExchangeDTO) {
        return this.api.post(this.route, dto)
    }

    delete(id_exchange: string) {
        return this.api.delete(`${this.route}/${id_exchange}`)
    }

    /*  
    update(dto: IUpdateTransactionDTO) {
        return this.api.put(`${this.route}?id_transaction=${dto.id_transaction}`, dto)
    } */

}

export const exchangeService = new ExchangeService(api)

