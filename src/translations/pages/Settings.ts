import { Language } from "../../enums/Language"

export const TranslationsPageSettings = (language?: Language) => {
    const lang = language || "ENG"

    const translations = {
        title: {
            PT: "Configurações",
            ENG: "Settings",
            ESP: "Configuraciones"
        }
    }

    return {
        title: translations.title[lang]
    }
}