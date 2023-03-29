import { Box, Center, ColorProps, useColorMode } from "@chakra-ui/react";
import { TypographyProps } from "@chakra-ui/react";
import Icon from "@components/Icon";
import { Theme } from "@emotion/react";
import { ComponentType } from "react";
import * as MDIcon from "react-icons/md";

export interface ThemeSwitchButtonProps {
  lightIcon?: keyof typeof MDIcon;
  darkIcon?: keyof typeof MDIcon;
  size?: TypographyProps["fontSize"];
  color?: keyof Theme["colors"] | ColorProps["color"];
}

const ThemeSwitchButton: ComponentType<ThemeSwitchButtonProps> = ({
  lightIcon = "MdLightMode",
  darkIcon = "MdDarkMode",
  size = "2xl",
  color = "mainText",
}: ThemeSwitchButtonProps) => {
  const { toggleColorMode, colorMode } = useColorMode();

  return (
    <Center
      cursor="pointer"
      data-testid="button"
      fontSize={size}
      onClick={toggleColorMode}
    >
      <Box color={color} cursor="pointer" data-testid={colorMode}>
        <Icon
          icon={
            (colorMode === "light"
              ? lightIcon
              : darkIcon) as keyof typeof MDIcon
          }
        />
      </Box>
    </Center>
  );
};

export default ThemeSwitchButton;

// import { addPropertyControls, ControlType } from "framer";
// import { theme } from "@chakra-ui/react"
//
// addPropertyControls(ThemeSwitchButton, {
//    size : {
//     type: ControlType.Enum,
//      options: Object.keys(theme.fontSizes)
//   },
// });
