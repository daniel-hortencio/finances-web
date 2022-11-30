export type Category = {
  id_category: string;
  name: string;
  background_color: string;
  icon_color: string;
  icon_name: string;
  created_at: Date;
  id_user: string;
}

export type ICreateCategoryDTO = Omit<Category, "id_category" | "id_user" | "created_at">
export type IUpdateCategoryDTO = Omit<Category, "id_user" | "created_at">
