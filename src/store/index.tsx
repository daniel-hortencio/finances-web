import { configureStore, createSlice } from "@reduxjs/toolkit";
import { setCookie, destroyCookie, parseCookies } from "nookies";
import { transactionService } from "../services/Transaction";
import { api } from "../services/api";
import { Transaction, Statement } from "../types/Transaction";
import { Category } from "../types/Category";
import { UpdateUserPreferencesDTO, User } from "../types/User";
import { cookies } from "../utils/cookies";

export const userSlice = createSlice({
  name: "user",
  initialState: null as User | null,
  reducers: {
    authenticateUser: (state, { payload }) => {
      const { language, email, name, id_user, preferred_currency } =
        payload.user as User;

      setCookie(null, "FinancesWeb.token", payload.token, {
        path: "/",
        expires: new Date(payload.refresh_token.expires_in * 1000),
      });
      setCookie(
        null,
        "FinancesWeb.refresh_token",
        payload.refresh_token.id_refresh_token,
        {
          path: "/",
          expires: new Date(payload.refresh_token.expires_in * 1000),
        }
      );
      setCookie(
        null,
        "FinancesWeb.userInfos",
        JSON.stringify({
          id_user,
          name,
          email,
        }),
        {
          path: "/",
          expires: new Date(payload.refresh_token.expires_in * 1000),
        }
      );

      setCookie(
        null,
        "FinancesWeb.userPreferences",
        JSON.stringify({
          language,
          preferred_currency,
        }),
        {
          path: "/",
          expires: new Date(payload.refresh_token.expires_in * 1000),
        }
      );

      api.defaults.headers.common["auth"] = `Bearer ${payload.token.id_token}`;

      return {
        ...payload.user,
      };
    },
    logoutUser: () => {
      cookies.destroyAll();

      return null;
    },
    setUserPreferences: (state, { payload }) => {
      const { language, preferred_currency } =
        payload as UpdateUserPreferencesDTO;

      return {
        ...(state as User),
        language,
        preferred_currency,
      };
    },
    recoverUserByCookies: () => {
      const { token, user_infos, user_preferences } = cookies.getAll();

      if (token) {
        api.defaults.headers.common["auth"] = `Bearer ${token}`;
      }

      if (user_infos && user_preferences) {
        return {
          ...user_infos,
          ...user_preferences,
        };
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
  },
});

export const namesSuggestSlice = createSlice({
  name: "names_suggest",
  initialState: [] as string[],
  reducers: {
    setNamesSuggest: (state, { payload }) => {
      return payload;
    },
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
    names_suggest: namesSuggestSlice.reducer,
  },
});

export const useAuthenticateUser = (state: {
  categories: Category[];
  user: User | null;
  statements: Statement[];
  names_suggest: string[];
}) => {
  return state;
};

export const {
  authenticateUser,
  logoutUser,
  recoverUserByCookies,
  setUserPreferences,
} = userSlice.actions;
export const { setStatement } = statementSlice.actions;
export const { setCategories, removeCategory } = categoriesSlice.actions;
export const { setNamesSuggest } = namesSuggestSlice.actions;

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
