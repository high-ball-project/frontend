import { As, chakra, TextProps } from "@chakra-ui/react";
import { default as _Text } from "antd/es/typography/Text";

import { DevfiveComponent as ComponentType } from "../interfaces/types";

const __Text = chakra<As, TextProps>(_Text, {
  baseStyle: {
    color: "mainText",
  },
});

const Text: ComponentType<TextProps> = ({
  text,
  children,
  ...rest
}: TextProps & {
  text?: string;
}) => <__Text {...rest}>{text || children}</__Text>;

export default Text;

// import { addPropertyControls, ControlType } from "framer"
// import { theme } from "@chakra-ui/react"
// import { getColorKeys } from "../../codeFile/theme/theme.ts"
// import { Theme } from "../App.tsx";
//
// addPropertyControls(Text, {
//   text: {
//     type: ControlType.String,
//     defaultValue: "Text Here",
//   },
//   fontSize: {
//     type: ControlType.Enum,
//     options: Object.keys(theme.fontSizes),
//     defaultValue: "md",
//   },
//   color: {
//     type: ControlType.Enum,
//     options: getColorKeys(Theme),
//     defaultValue: "mainText",
//   },
//   fontWeight: {
//     type: ControlType.Enum,
//     options: Object.keys(theme.fontWeights),
//     defaultValue: "mainText",
//   },
// })
