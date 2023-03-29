import {
  ChakraProvider,
  ChakraTheme,
  ThemeProvider,
  useColorMode,
} from "@chakra-ui/react";
import { css, Global, Theme } from "@emotion/react";
import {
  ConfigProvider,
  message,
  Modal,
  notification,
  theme as antdTheme,
} from "antd/es";
import { ThemeConfig } from "antd/es/config-provider/context";
import { Locale } from "antd/es/locale";
import koKR from "antd/es/locale/ko_KR";
import axios from "axios";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import localeData from "dayjs/plugin/localeData";
import weekday from "dayjs/plugin/weekday";
import { ReactNode, useEffect, useMemo } from "react";
import { HelmetProvider } from "react-helmet-async";

import useAuth from "../store/useAuth";
import { defaultTheme } from "../theme/theme";

axios.defaults.baseURL =
  process.env.VITE_BASE_URL || process.env.NEXT_PUBLIC_BASE_URL;

/**
 * antd에서 필요한 dayjs 함수 추가
 */
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(duration);
dayjs.locale("ko");

dayjs.prototype.toJSON = function () {
  return this.toISOString();
};
dayjs.prototype.toString = function () {
  // unix time ms 로 변환
  return this.unix() * 1000;
};

if (
  (process.env.VITE_PRINT_ENV || process.env.NEXT_PUBLIC_PRINT_ENV) != "false"
) {
  console.info(
    "%cBASE_URL: " +
      (process.env.VITE_BASE_URL || process.env.NEXT_PUBLIC_BASE_URL),
    "font-size:16px;"
  );
  console.info(
    "%cMODE " + (process.env.MODE || process.env.NODE_ENV),
    "font-size:16px;"
  );
}

if (
  (process.env.VITE_PRINT_DEVFIVE || process.env.NEXT_PUBLIC_DEVFIVE) != "false"
) {
  console.info(
    "%c함께하는 개발 파트너, 데브파이브",
    "color: #a600f4;font-size:22px;background:white;"
  );
  console.info(
    "%c ____   _____ __     __ _____  ___ __     __ _____ \n" +
      "|  _ \\ | ____|\\ \\   / /|  ___||_ _|\\ \\   / /| ____|\n" +
      "| | | ||  _|   \\ \\ / / | |_    | |  \\ \\ / / |  _|  \n" +
      "| |_| || |___   \\ V /  |  _|   | |   \\ V /  | |___ \n" +
      "|____/ |_____|   \\_/   |_|    |___|   \\_/   |_____|",
    "color: #a600f4;"
  );
}

export default function AppWrapper({
  children,
  appTheme = defaultTheme,
  locale = koKR,
}: {
  children: ReactNode;
  locale?: Locale;
  appTheme?: { light: Theme & ChakraTheme; dark: Theme & ChakraTheme };
}) {
  return (
    <HelmetProvider>
      <ChakraProvider>
        <AppAuthWrapper appTheme={appTheme} locale={locale}>
          {children}
        </AppAuthWrapper>
      </ChakraProvider>
    </HelmetProvider>
  );
}

function AppAuthWrapper({
  children,
  appTheme,
  locale,
}: {
  children: ReactNode;
  locale: Locale;
  appTheme: { light: Theme & ChakraTheme; dark: Theme & ChakraTheme };
}) {
  const { colorMode } = useColorMode();
  const [modal, contextHolder] = Modal.useModal();
  const [noti, notiHolder] = notification.useNotification();
  const [msg, msgHolder] = message.useMessage();
  const { initial, loaded } = useAuth();

  const theme = useMemo(
    () => (colorMode === "dark" ? appTheme.dark : appTheme.light),
    [appTheme, colorMode]
  );

  const antdThemeObject = useMemo<ThemeConfig>(
    () => ({
      algorithm:
        colorMode === "dark"
          ? antdTheme.darkAlgorithm
          : antdTheme.defaultAlgorithm,
      token: {
        fontFamily: theme.fonts.body as string,
        colorPrimary: theme.colors.primary,
        colorError: theme.colors.error,
        colorInfo: theme.colors.info,
        colorSuccess: theme.colors.success,
        colorWarning: theme.colors.warning,
        borderRadius: parseInt(theme.radii.main),
        colorText: theme.colors.mainText,
      },
    }),
    [colorMode, theme]
  );

  useEffect(() => {
    if (!loaded) {
      initial();

      Modal.confirm = modal.confirm;
      Modal.success = modal.success;
      Modal.info = modal.info;
      Modal.warning = modal.warning;
      Modal.error = modal.error;

      notification.success = noti.success;
      notification.info = noti.info;
      notification.warning = noti.warning;
      notification.error = noti.error;

      message.info = msg.info;
      message.success = msg.success;
      message.error = msg.error;
      message.loading = msg.loading;
      message.warning = msg.warning;
    }
  }, [initial, loaded, modal, noti, msg]);

  return (
    <ThemeProvider theme={theme}>
      <ConfigProvider locale={locale} theme={antdThemeObject}>
        <Global
          styles={css`
            @font-face {
              font-family: "SpoqaHanSansNeo-Regular";
              src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2108@1.1/SpoqaHanSansNeo-Regular.woff")
                format("woff");
              font-weight: normal;
              font-style: normal;
            }
            body {
              background-color: ${theme.colors.background} !important;
              // antd의 잘 못 된 설정 수정
              font-size: initial;
            }
            * {
              word-break: keep-all !important;
            }
          `}
        />
        {contextHolder}
        {notiHolder}
        {msgHolder}
        {children}
      </ConfigProvider>
    </ThemeProvider>
  );
}
