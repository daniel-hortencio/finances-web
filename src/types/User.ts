import { Currency } from "../enums/Currency";
import { Language } from "../enums/Language";

export type User = {
  id_user: string;
  name: string;
  email: string;
  password: string;
  language: Language;
  created_at: Date;
  preferred_currency: Currency
}

export interface CreateUserDTO extends Omit<User, "id_user" | "created_at"> {
  confirm_password: string;
}

export type SignInUserDTO = Omit<User, "id_user" | "name" | "language" | "created_at" | "preferred_currency">

export type RefreshTokenDTO = {
  id_refresh_token: string;
  id_user: string;
}