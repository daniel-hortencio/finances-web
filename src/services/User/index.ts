import { AxiosInstance } from "axios";
import { CreateUserDTO, SignInUserDTO, RefreshTokenDTO } from "../../types/User";

import { api } from "../api";

class UserService {
    constructor(private readonly api: AxiosInstance) { }

    create(dto: CreateUserDTO) {
        return this.api.post("/create-user", dto)
    }

    signIn(dto: SignInUserDTO) {
        return this.api.post("/auth/sign-in", dto)
    }
}

export const userService = new UserService(api)

