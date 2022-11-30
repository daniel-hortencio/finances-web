import { configureStore, createSlice } from "@reduxjs/toolkit";
import { setCookie, destroyCookie, parseCookies } from "nookies";
import { accountService } from "../services/Accounts";
import { api } from "../services/api";
import { Account, Statement } from "../types/Account";
import { Category } from "../types/Category";
import { User } from "../types/User";
import { cookies } from "../utils/cookies";

export const userSlice = createSlice({
  name: "user",
  initialState: null as User | null,
  reducers: {
    authenticateUser: (state, { payload }) => {
      setCookie(null, "FinancesWeb.token", payload.token, {
        path: "/",
        expires: new Date(payload.refresh_token.expiresIn * 1000),
      });
      setCookie(
        null,
        "FinancesWeb.refresh_token",
        payload.refresh_token.id_refresh_token,
        { path: "/", expires: new Date(payload.refresh_token.expiresIn * 1000) }
      );
      setCookie(null, "FinancesWeb.user", JSON.stringify(payload.user), {
        path: "/",
        expires: new Date(payload.refresh_token.expiresIn * 1000),
      });

      api.defaults.headers.common["auth"] = `Bearer ${payload.token.id_token}`;

      return {
        ...payload.user,
      };
    },
    logoutUser: () => {
      cookies.destroyAll();

      return null;
    },
    recoverUserByCookies: () => {
      const { token, user } = cookies.getAll();

      if (token) {
        api.defaults.headers.common["auth"] = `Bearer ${token}`;
      }

      if (user) {
        return user;
      }
    },
  },
});

export const statementSlice = createSlice({
  name: "statement",
  initialState: [] as Statement[],
  reducers: {
    setStatement: (state, { payload }) => {
      return payload;
    },
    /* removeAccount: (state, { payload }) => {
      return state.filter((account) => account.id_account !== payload);
    }, */
  },
});

export const categoriesSlice = createSlice({
  name: "categories",
  initialState: [] as Category[],
  reducers: {
    setCategories: (state, { payload }) => {
      return payload;
    },
    removeCategory: (state, { payload }) => {
      return state.filter((category) => category.id_category !== payload);
    },
  },
});

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    statements: statementSlice.reducer,
    categories: categoriesSlice.reducer,
  },
});

export const useAuthenticateUser = (state: any) => {
  return state;
};

export const { authenticateUser, logoutUser, recoverUserByCookies } =
  userSlice.actions;
export const { setStatement, /* removeAccount */ } = statementSlice.actions;
export const { setCategories, removeCategory } = categoriesSlice.actions;


export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
