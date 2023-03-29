import { ChakraTheme, extendTheme } from "@chakra-ui/react";
import { Theme } from "@emotion/react";

declare module "@emotion/react" {
  export interface Theme {
    radii: {
      main: string;
    };
    colors: {
      primary: string;
      secondary: string;
      error: string;
      info: string;
      processing: string;
      success: string;
      warning: string;
      mainText: string;
      subText: string;
      background: string;
      containerBackground: string;
      gnbBackground: string;
      menuBackground: string;
      footerBackground: string;
      border: string;
      footerText: string;
    };
  }
}

const defaultTheme: { light: Theme & ChakraTheme; dark: Theme & ChakraTheme } =
  {
    light: extendTheme({
      fonts: {
        body: "SpoqaHanSansNeo-Regular",
        heading: "SpoqaHanSansNeo-Regular",
      },
      config: {
        initialColorMode: "system",
        useSystemColorMode: true,
      },
      radii: {
        main: "6px",
      },
      colors: {
        primary: "#b87ff1",
        secondary: "#000",
        error: "#ff4d4f",
        info: "#1890ff",
        processing: "#1890ff",
        success: "#52c41a",
        warning: "#faad14",
        mainText: "#000",
        subText: "#5d5d5d",
        background: "#F8F9FA",
        containerBackground: "#fff",
        gnbBackground: "rgba(256,256,256,0.8)",
        gnbBorder: "#646464",
        menuBackground: "#f3f4f8",
        footerBackground: "#5d5d5d",
        border: "#f0f0f0",
        footerText: "#fff",
      },
    } as Theme) as Theme & ChakraTheme,
    dark: extendTheme({
      fonts: {
        body: "SpoqaHanSansNeo-Regular",
        heading: "SpoqaHanSansNeo-Regular",
      },
      config: {
        initialColorMode: "system",
        useSystemColorMode: true,
      },
      radii: {
        main: "6px",
      },
      colors: {
        primary: "#b87ff1",
        secondary: "#000",
        error: "#ff4d4f",
        info: "#1890ff",
        processing: "#1890ff",
        success: "#52c41a",
        warning: "#faad14",
        mainText: "#fff",
        subText: "#5d5d5d",
        background: "#0e0e0e",
        containerBackground: "#1D1F21",
        gnbBackground: "rgba(0,0,0,0.8)",
        menuBackground: "#2e2e2e",
        footerBackground: "#5d5d5d",
        border: "#303030",
        footerText: "#fff",
      },
    } as Theme) as Theme & ChakraTheme,
  };

const getColorKeys = (theme: Theme & ChakraTheme) => {
  const keys: string[] = [];

  for (const key in theme.colors) {
    if (typeof theme.colors[key] === "string") {
      keys.push(key);
    } else if (typeof theme.colors[key] === "object") {
      Object.keys(theme.colors[key]).forEach((subKey) =>
        keys.push(`${key}.${subKey}`)
      );
    }
  }
  return keys;
};

export { defaultTheme, getColorKeys };
