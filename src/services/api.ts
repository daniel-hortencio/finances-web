import axios, { AxiosError, AxiosResponse } from "axios";
import { parseCookies, setCookie } from "nookies";
import { Router } from "next/router";
import { cookies } from "../utils/cookies";
import { refreshTokenService } from "./RefreshToken";
import { userService } from "./User";
import { isSSR } from "../utils/isSSR";

export type ResponseData<T> = {
  data?: T;
  status: number;
  isError: boolean;
  message?: string;
};

export const api = axios.create({
  baseURL: "http://localhost:3003",
});

let is_refreshing_token = false;
let requests_queue: any = [];

api.interceptors.response.use(
  (response): any => {
    const { data, status } = response;

    return { data, status, isError: false };
  },
  (error) => {
    const { status } = error.response;
    const { message } = error.response.data;

    if (status === 401 && message === "TOKEN_IS_EXPIRED") {
      const initial_config = error.response.config;

      if (!is_refreshing_token) {
        is_refreshing_token = true;
        const { refresh_token, user_infos, user_preferences } = cookies.getAll();

        if (!refresh_token.id_refresh_token && !isSSR()) {
          window.location.pathname = '/';
        }

        refreshTokenService({ id_refresh_token: refresh_token.id_refresh_token, id_user: user_infos.id_user })
          .then(({ new_token }) => {
            setCookie(null, "FinancesWeb.token", new_token.token, {
              path: "/",
              expires: new Date(new_token.expires_in * 1000),
            });

            api.defaults.headers.common["auth"] = `Bearer ${new_token.token}`;

            requests_queue.forEach((request: any) =>
              request.onSuccess(new_token.token)
            );
            requests_queue = [];
          })
          .catch((refreshTokenErr) => {
            requests_queue.forEach((request: any) =>
              request.onFailure(refreshTokenErr)
            );
            requests_queue = [];
          })
          .finally(() => {
            is_refreshing_token = false;
          });
      }

      return new Promise((resolve, reject) => {

        requests_queue.push({
          onSuccess: (new_token: string) => {
            initial_config.headers["auth"] = `Bearer ${new_token}`;

            return resolve(api(initial_config).then((res) => res));
          },
          onFailure: (err: any) => {
            console.log({ err })

            const { status } = err.response;
            const { message } = err.response.data;

            return reject({
              status,
              message,
              isError: true,
            });
          },
        });
      });

    } else {
      return Promise.reject({
        status,
        message,
        isError: true,
      });
    }
  }
);
