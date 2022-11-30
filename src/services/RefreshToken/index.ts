import { RefreshTokenDTO } from "../../types/User";

export async function refreshTokenService({
    id_refresh_token,
    id_user
}: RefreshTokenDTO) {
    const new_token = await fetch(`http://localhost:3006/auth/refresh-token?id_refresh_token=${id_refresh_token}&id_user=${id_user}`, {
        method: 'POST',
        mode: 'cors'
    })
        .then((res) => res.json())

    return new_token

}