import { AxiosInstance } from "axios";
import { ICreateTransactionDTO, IUpdateTransactionDTO } from "../../types/Transaction";

import { api } from "../api";

class TransactionService {
    private readonly route = "/transaction"

    constructor(private readonly api: AxiosInstance) { }

    getByUser() {
        return this.api.get(this.route)
    }

    getNamesSuggest() {
        return this.api.get(`${this.route}/names-suggest`)
    }

    create(dto: ICreateTransactionDTO) {
        return this.api.post(this.route, dto)
    }

    delete(id_transaction: string) {
        return this.api.delete(`${this.route}/${id_transaction}`)
    }

    update(dto: IUpdateTransactionDTO) {
        const { id_transaction } = dto
        return this.api.put(`${this.route}/${id_transaction}`, dto)
    }

}

export const transactionService = new TransactionService(api)

