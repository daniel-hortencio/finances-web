import { destroyCookie, parseCookies } from "nookies"

export const cookies = {
    getAll: () => {
        const cookies = parseCookies()

        const id_refresh_token = cookies["FinancesWeb.refresh_token"]
        const token = cookies["FinancesWeb.token"]
        const user_cookie = cookies["FinancesWeb.user"]

        return {
            id_refresh_token,
            token,
            user: user_cookie ? JSON.parse(user_cookie) : undefined
        }
    },
    destroyAll: () => {
        destroyCookie(null, "FinancesWeb.token", { path: "/" });
        destroyCookie(null, "FinancesWeb.refresh_token", { path: "/" });
        destroyCookie(null, "FinancesWeb.user", { path: "/" });
    }
}