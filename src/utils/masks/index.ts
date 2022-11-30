import { currencyMask } from "./currencyMask";

export const mask = {
    currency: (value: string) => currencyMask(value)
}