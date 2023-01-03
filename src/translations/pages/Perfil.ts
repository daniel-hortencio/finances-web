import { Language } from "../../enums/Language"

export const TranslationsPageUser = (language?: Language) => {
    const lang = language || "ENG"

    const translations = {
        title: {
            PT: "Usuário",
            ENG: "User",
            ESP: "Usuário"
        }
    }

    return {
        title: translations.title[lang]
    }
}