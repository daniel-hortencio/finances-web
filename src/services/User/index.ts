import { AxiosInstance } from "axios";
import { CreateUserDTO, SignInUserDTO, UpdateUserInfosDTO, UpdateUserPreferencesDTO } from "../../types/User";

import { api } from "../api";

class UserService {
    constructor(private readonly api: AxiosInstance) { }

    create(dto: CreateUserDTO) {
        return this.api.post("/create-user", dto)
    }

    signIn(dto: SignInUserDTO) {
        return this.api.post("/auth/sign-in", dto)
    }

    updateUserPreferences(dto: UpdateUserPreferencesDTO) {
        return this.api.put("/user/preferences", dto)
    }

    updateUserInfos(dto: UpdateUserInfosDTO) {
        return this.api.put("/user/infos", dto)
    }

    logout() {
        return this.api.post("user/logout")
    }
}

export const userService = new UserService(api)

