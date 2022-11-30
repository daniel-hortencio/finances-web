import { AxiosInstance } from "axios";
import { ICreateAccountDTO, IUpdateAccountDTO } from "../../types/Account";

import { api } from "../api";

class AccountService {
    private readonly route = "/account"

    constructor(private readonly api: AxiosInstance) { }

    getByUser() {
        return this.api.get(this.route)
    }

    create(dto: ICreateAccountDTO) {
        return this.api.post(this.route, dto)
    }

    delete(id_account: string) {
        return this.api.delete(this.route, { params: { id_account } })
    }

    update(dto: IUpdateAccountDTO) {
        return this.api.put(`${this.route}?id_account=${dto.id_account}`, dto)
    }

}

export const accountService = new AccountService(api)

