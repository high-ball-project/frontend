import {
  ResponsiveValue,
  ThemeTypings,
  useBreakpointValue,
  useToken,
} from "@chakra-ui/react";
import { Theme } from "@emotion/react";
import { ComponentType, CSSProperties } from "react";
import * as MDIcon from "react-icons/md";

export interface IconProps {
  icon: keyof typeof MDIcon;
  size?: ResponsiveValue<string | number>;
  color?:
    | keyof Theme["colors"]
    | CSSProperties["color"]
    | ThemeTypings["colors"];
}

const Icon: ComponentType<IconProps> = ({
  icon,
  size = 16,
  color,
  ...rest
}: IconProps) => {
  const _color = useToken(
    "colors",
    (typeof color === "object" ? color : [color]) as string[]
  );
  const iconColor = useBreakpointValue<string>(_color);

  const iconSize = useBreakpointValue<string | number>(
    typeof size === "string" || typeof size === "number"
      ? [size]
      : (size as Partial<Record<string, number>> | number[])
  );

  const Icons = MDIcon[icon];

  if (!Icons) return <MDIcon.MdError {...rest} color="#F00" />;

  return <Icons {...rest} color={iconColor} size={iconSize} />;
};

export default Icon;

// import { addPropertyControls, ControlType } from "framer"
// import { getColorKeys } from "../theme/theme.ts"
// import { Theme } from "../App.tsx"
//
// addPropertyControls(Icon, {
//     icon: {
//         type: ControlType.Enum,
//         options: Object.keys(MDIcon),
//         defaultValue: "MdFlag",
//     },
//     color: {
//         type: ControlType.Enum,
//         options: getColorKeys(Theme),
//         defaultValue: "mainText",
//     },
//     size: {
//         type: ControlType.Number,
//         defaultValue: 16,
//     },
// })
