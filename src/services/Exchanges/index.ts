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
        console.log({ id_exchange })
        return this.api.delete(`${this.route}?id_exchange=${id_exchange}`)
    }

    /*  
    update(dto: IUpdateAccountDTO) {
        return this.api.put(`${this.route}?id_account=${dto.id_account}`, dto)
    } */

}

export const exchangeService = new ExchangeService(api)

