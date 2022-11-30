import { AxiosInstance } from "axios";

import { api } from "../api";

class BalanceService {
    private readonly route = "/user/balance"

    constructor(private readonly api: AxiosInstance) { }

    getByUser() {
        return this.api.get(this.route)
    }

}

export const balanceService = new BalanceService(api)

