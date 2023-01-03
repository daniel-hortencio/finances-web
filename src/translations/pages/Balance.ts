import { Language } from "../../enums/Language"

export const TranslationsPageBalance = (language?: Language) => {
    const lang = language || "ENG"

    const translations = {
        title: {
            PT: "Histórico da Conta",
            ENG: "Account History",
            ESP: "Histórico de Cuenta"
        }
    }

    return {
        title: translations.title[lang]
    }
}