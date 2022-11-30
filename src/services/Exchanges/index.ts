import { AxiosInstance } from "axios";
import { ICreateExchangeDTO } from "../../types/Exchange";

import { api } from "../api";

class ExchangeService {
    private readonly route = "/exchange"

    constructor(private readonly api: AxiosInstance) { }

    getByUser() {
        return this.api.get(this.route)
    }

    create(dto: ICreateExchangeDTO) {
        return this.api.post(this.route, dto)
    }

    /*  delete(id_account: string) {
         return this.api.delete(this.route, { params: { id_account } })
     }
 
     update(dto: IUpdateAccountDTO) {
         return this.api.put(`${this.route}?id_account=${dto.id_account}`, dto)
     } */

}

export const exchangeService = new ExchangeService(api)

