import { Language } from "../../enums/Language"

export const TranslationsPageCategories = (language?: Language) => {
    const lang = language || "ENG"

    const translations = {
        title: {
            PT: "Categorias",
            ENG: "Categories",
            ESP: "Categorias"
        }
    }

    return {
        title: translations.title[lang]
    }
}