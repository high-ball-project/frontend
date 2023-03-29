import { ColorProps, ThemeTypings } from "@chakra-ui/react";
import { Theme } from "@emotion/react";
import { CSSProperties, ReactNode } from "react";
import * as MDIcon from "react-icons/md";

export interface MenuProps {
  menu?: MenuData[];
}

export interface MenuData {
  content: string | ReactNode;
  color?: ColorProps["color"] | keyof Theme["colors"];
  link?: string;
  subMenu?: MenuData[];
}

export interface SideMenuData {
  icon: keyof typeof MDIcon | ReactNode;
  color?:
    | keyof Theme["colors"]
    | CSSProperties["color"]
    | ThemeTypings["colors"];
  link?: string;
}
