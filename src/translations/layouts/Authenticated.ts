import { Language } from "../../enums/Language"

export const TranslationsLayoutAuthenticated = (language?: Language) => {
    const lang = language || "ENG"

    const translations = {
        welcome: {
            PT: "Bem-Vindo",
            ENG: "Welcome",
            ESP: "Bienvenido"
        }
    }

    return {
        welcome: translations.welcome[lang]
    }
}