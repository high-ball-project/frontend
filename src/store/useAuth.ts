import { Modal } from "antd";
import axios from "axios";
import dayjs, { Dayjs } from "dayjs";
import { create } from "zustand";
import { persist } from "zustand/middleware";

import { SignInResponse } from "../interfaces/Response";
import User from "../interfaces/User";

export interface AuthState<T> {
  user?: T;
  login: (username: string, password: string) => Promise<void>;
  signIn: (signIn: SignInResponse) => void;
  loadMe: () => Promise<void>;
  initial: () => Promise<void>;
  logout: () => void;
  updateSignInDate: (day?: Dayjs) => void;
  loaded: boolean;
  signedAt?: string;
  accessToken?: string;
  refreshToken?: string;
  accessTokenExpireAt?: string;
  refreshTokenExpireAt?: string;
}

const AUTH_HEADER =
  process.env.VITE_AUTH_HEADER! || process.env.NEXT_PUBLIC_AUTH_HEADER!;

axios.interceptors.request.use(async (value) => {
  if (!axios.defaults.headers.common[AUTH_HEADER]) return value;

  /**
   * AUTH_HEADER가 존재하는 로그인 된 유저만 추가 확인
   */

  const {
    accessTokenExpireAt,
    refreshTokenExpireAt,
    refreshToken,
    logout,
    signIn,
  } = useAuthBase.getState();

  if (dayjs(accessTokenExpireAt).isAfter(dayjs())) return value;
  if (dayjs(refreshTokenExpireAt).isBefore(dayjs())) {
    logout();
    return Promise.reject(new Error("Refresh Token is expired"));
  }

  try {
    delete axios.defaults.headers.common[AUTH_HEADER];
    // BASE_URL이 있을 경우에 실 서버로 판단하여 로그인 요청
    if (process.env.VITE_BASE_URL || process.env.NEXT_PUBLIC_BASE_URL) {
      const { data } = await axios.post<SignInResponse>("/refresh", {
        token: refreshToken,
      });
      signIn(data);
    }
  } catch (e) {
    console.error("Refresh Token request is failed");
    logout();
    return Promise.reject(e);
  }
  return value;
});

axios.interceptors.response.use(undefined, (error) => {
  if (error?.response?.status === 401) {
    // 401일 경우 권한 부족
    useAuthBase.getState().logout();
  }
  return Promise.reject(error);
});

const useAuthBase = create(
  persist<AuthState<any>>(
    (set, get) => ({
      loaded: false,
      initial: async () => {
        const {
          logout,
          accessToken,
          accessTokenExpireAt,
          loaded,
          refreshTokenExpireAt,
          refreshToken,
          signIn,
          signedAt,
        } = get();

        if (loaded) return;

        set({
          loaded: true,
        });

        const logoutTime = parseInt(
          process.env.VITE_LOGOUT_TIME! || process.env.NEXT_PUBLIC_LOGOUT_TIME!
        );

        if (
          logoutTime > 0 &&
          signedAt &&
          dayjs(signedAt).add(logoutTime, "millisecond").isBefore(dayjs())
        ) {
          console.warn(
            `front-components 로그인 기간 만료 (로그아웃 타임: ${logoutTime}ms)`
          );
          logout();
          if (
            process.env.VITE_LOGOUT_TIME ||
            process.env.NEXT_PUBLIC_LOGOUT_TIME
          )
            Modal.info({
              content:
                process.env.VITE_LOGOUT_MODAL_MSG ||
                process.env.NEXT_PUBLIC_LOGOUT_MODAL_MSG,
            });
          return;
        }

        if (
          accessTokenExpireAt &&
          dayjs(accessTokenExpireAt).isBefore(dayjs())
        ) {
          if (
            !refreshToken ||
            (refreshTokenExpireAt &&
              dayjs(refreshTokenExpireAt).isBefore(dayjs()))
          ) {
            logout();
            Modal.info({
              content: "토큰이 만료되었습니다.",
            });
            return;
          }
          try {
            delete axios.defaults.headers.common[AUTH_HEADER];
            // BASE_URL이 있을 경우에 실 서버로 판단하여 로그인 요청
            if (process.env.VITE_BASE_URL || process.env.NEXT_PUBLIC_BASE_URL) {
              const { data } = await axios.post<SignInResponse>("/refresh", {
                token: refreshToken,
              });
              signIn(data);
            }
          } catch (e) {
            console.error("Refresh Token request is failed");
            logout();
            return Promise.reject(e);
          }

          return;
        }
        if (accessToken)
          axios.defaults.headers.common[AUTH_HEADER] = "Bearer " + accessToken;
      },
      updateSignInDate: (day: Dayjs = dayjs()) => {
        set({
          signedAt: day.toString(),
        });
      },
      login: async (username, password) => {
        try {
          const formData = new FormData();
          formData.append("username", username);
          formData.append("password", password);

          // BASE_URL이 있을 경우에 실 서버로 판단하여 로그인 요청
          if (process.env.VITE_BASE_URL || process.env.NEXT_PUBLIC_BASE_URL) {
            const { data } = await axios.post<SignInResponse>(
              "/signin",
              formData
            );
            get().signIn(data);
            await get().loadMe();
          } else
            set({
              user: {
                email: "",
                tier: 0,
                username: "",
                name: "",
                phone: "",
              },
            });

          set({
            signedAt: dayjs().toString(),
          });
        } catch (e) {
          console.error(e);
          Modal.error({
            content: "로그인 실패",
          });
        }
      },
      logout: () => {
        delete axios.defaults.headers.common[AUTH_HEADER];
        set({
          user: undefined,
          signedAt: undefined,
          accessTokenExpireAt: undefined,
          accessToken: undefined,
          refreshTokenExpireAt: undefined,
          refreshToken: undefined,
        });
      },
      signIn: (signIn) => {
        axios.defaults.headers.common[AUTH_HEADER] =
          "Bearer " + signIn.accessToken;

        set({
          ...signIn,
          signedAt: dayjs().toString(),
        });
      },
      loadMe: async () => {
        try {
          const { data } = await axios.get<User>("/me");
          set({
            user: data,
          });
        } catch (e) {
          console.error(e);
        }
      },
    }),
    {
      name: "auth",
      partialize: (state) => ({
        ...state,
        loaded: false,
      }),
    }
  )
);

const useAuth = <User>(
  selector: (state: AuthState<User>) => AuthState<User> = (state) => state
) => useAuthBase(selector);

export default useAuth;
