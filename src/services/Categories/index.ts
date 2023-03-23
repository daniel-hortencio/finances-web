import { AxiosInstance } from "axios";
import { ICreateCategoryDTO, IUpdateCategoryDTO } from "../../types/Category";

import { api } from "../api";

class CategoriesService {
    private readonly route = "/category"

    constructor(private readonly api: AxiosInstance) { }

    getByUser() {
        return this.api.get(this.route)
    }

    create(dto: ICreateCategoryDTO) {
        return this.api.post(this.route, dto)
    }

    update(dto: IUpdateCategoryDTO) {
        return this.api.put(`${this.route}/${dto.id_category}`, dto)
    }

    delete(id_category: string) {
        return this.api.delete(`${this.route}/${id_category}`)
    }

}

export const categoryService = new CategoriesService(api)

