import { destroyCookie, parseCookies } from "nookies"

const cookies_names = {
    refreshToken: "FinancesWeb.refresh_token",
    token: "FinancesWeb.token",
    user_infos: "FinancesWeb.userInfos",
    user_preferences: "FinancesWeb.userPreferences",
}

export const cookies = {
    getAll: () => {
        const cookies = parseCookies()

        const id_refresh_token = cookies[cookies_names.refreshToken]
        const token = cookies[cookies_names.token]
        const user_infos_cookie = cookies[cookies_names.user_infos]
        const user_preferences_cookie = cookies[cookies_names.user_preferences]

        return {
            id_refresh_token,
            token,
            user_infos: user_infos_cookie ? JSON.parse(user_infos_cookie) : undefined,
            user_preferences: user_preferences_cookie ? JSON.parse(user_preferences_cookie) : undefined
        }
    },
    destroyAll: () => {
        destroyCookie(null, cookies_names.token, { path: "/" });
        destroyCookie(null, cookies_names.refreshToken, { path: "/" });
        destroyCookie(null, cookies_names.user_infos, { path: "/" });
        destroyCookie(null, cookies_names.user_preferences, { path: "/" });
    }
}