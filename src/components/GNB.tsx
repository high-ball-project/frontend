import { Box, Center, Flex, useBreakpointValue } from "@chakra-ui/react";
import { BackgroundProps, LayoutProps, PositionProps } from "@chakra-ui/react";
import Icon from "@components/Icon";
import Image from "@components/Image";
import Link from "@components/Link";
import SkeletonBox from "@components/SkeletonBox";
import Text from "@components/Text";
import { Theme } from "@emotion/react";
import { MenuData, MenuProps, SideMenuData } from "@interfaces/MenuData";
import { Drawer, Dropdown, Spin } from "antd/es/index";
import { ComponentType, useState } from "react";
import { ReactNode } from "react";
import { AiOutlineBars } from "react-icons/ai";
import * as MDIcon from "react-icons/md";
import { useWindowScroll } from "react-use";

export interface DefaultGNBProps {
  logo: ReactNode | string;
  mobileIcon?: keyof typeof MDIcon | ReactNode;
  menuHover?: boolean;
  sideMenu?: SideMenuData[];
  height?: LayoutProps["height"];
  bg?: keyof Theme["colors"] | BackgroundProps["bg"];
  defaultOpen?: boolean;
  top?: PositionProps["top"];
  left?: PositionProps["left"];
  isLoading?: boolean;
  maxWidth?: LayoutProps["maxW"];
  position?: "right" | "center";
  homeUrl?: string;
  responsive?: boolean;
}

export interface FixedGNBProps {
  fixed: true;
  colorChange?: boolean;
  changeHeight?: LayoutProps["height"];
  changeColor?: keyof Theme["colors"] | BackgroundProps["bg"];
}

export interface NoneFixedGNBProps {
  fixed?: false;
}

export interface FullMenuGNBProps {
  showFullMenu: true;
  menuHeight?: LayoutProps["height"];
}

export interface DefaultMenuGNBProps {
  showFullMenu?: false;
}

export type GNBProps = DefaultGNBProps &
  (FixedGNBProps | NoneFixedGNBProps) &
  (FullMenuGNBProps | DefaultMenuGNBProps);

/**
 * GNB menu components
 * @param {CSS.Property.color} color
 * @param {string} content
 * @param {boolean} sub
 * @return {ReactNode}
 */
const GNBMenu = ({ color, content, sub }: MenuData & { sub?: boolean }) =>
  typeof content === "string" ? (
    <Text
      color={color ?? "mainText"}
      cursor="pointer"
      fontSize={sub ? "md" : "lg"}
      fontWeight="bold"
    >
      {content}
    </Text>
  ) : (
    <>{content}</>
  );

const SideMenu = ({ color, icon }: SideMenuData) =>
  typeof icon === "string" && icon in MDIcon ? (
    <Icon
      color={color ?? "mainText"}
      icon={icon as keyof typeof MDIcon}
      size={24}
    />
  ) : (
    <>{icon}</>
  );

/**
 * GNB components
 * @param {CSS.Property.Color} bg
 * @param {ReactNode} logo
 * @param {MenuProps} menu
 * @param {ReactNode} mobileIcon
 * @param {CSS.Property.Height} height
 * @param {boolean} defaultOpen
 * @param {boolean} colorChange
 * @param {CSS.Property.Top} top
 * @param {CSS.Property.left} left
 * @param {boolean} isLoading
 * @param {GNBProps} rest
 * @return {ReactNode}
 */
const GNB: ComponentType<GNBProps & MenuProps> = ({
  bg = "gnbBackground",
  logo,
  menu,
  mobileIcon = <AiOutlineBars cursor="pointer" fontSize="24px" />,
  height = "80px",
  sideMenu,
  defaultOpen,
  top = 0,
  left = 0,
  isLoading = false,
  maxWidth = "1600px",
  position = "right",
  homeUrl = "/",
  responsive = true,
  ...rest
}: GNBProps & MenuProps) => {
  const changePoint = useBreakpointValue(
    rest.fixed && rest["changeHeight"]
      ? typeof rest["changeHeight"] === "object"
        ? rest["changeHeight"]
        : [rest["changeHeight"]]
      : ["300px"]
  );

  const [open, setOpen] = useState(defaultOpen);

  const { y } = useWindowScroll();

  if (!menu)
    return (
      <SkeletonBox
        height="80px"
        left={left}
        position={rest.fixed ? "fixed" : "absolute"}
        top={top}
        w="100%"
        zIndex={101}
      />
    );

  return (
    <Flex
      left={left}
      position={rest.fixed ? "fixed" : "absolute"}
      top={top}
      w="100%"
      zIndex={1999}
    >
      <Flex
        _hover={{
          h: rest.showFullMenu
            ? [height, null, rest["menuHeight"] ?? "300px"]
            : "80px",
        }}
        bg={
          changePoint && rest.fixed && y >= parseInt("" + changePoint)
            ? rest["changeColor"] ?? "background"
            : bg
        }
        flexDir="column"
        h={height}
        overflow="hidden"
        transitionDuration="200ms"
        w="100%"
      >
        <Spin spinning={isLoading}>
          <Center>
            <Flex
              h={height}
              justifyContent="space-between"
              maxW={maxWidth}
              px={5}
              w="100%"
            >
              <Link to={homeUrl}>
                <Center h={height}>
                  {typeof logo === "string" ? (
                    <Image alt="gnbLogo" src={logo} />
                  ) : (
                    logo
                  )}
                </Center>
              </Link>
              {menu && (
                <Flex
                  data-testid="headerMenuContainer"
                  display={responsive ? ["none", null, "flex"] : "flex"}
                  gap={8}
                >
                  {rest.showFullMenu ? (
                    <Flex gap={5} w="100%">
                      {menu.map((v, idx) => (
                        <Flex key={idx} flexDir="column" gap={3}>
                          <Link to={v.link}>
                            <Center minH={height}>
                              <GNBMenu {...v} />
                            </Center>
                          </Link>
                          {v.subMenu &&
                            v.subMenu.map((subV, subIdx) => (
                              <Center key={idx + "-" + subIdx}>
                                <Link to={v.link}>
                                  <GNBMenu {...subV} />
                                </Link>
                              </Center>
                            ))}
                        </Flex>
                      ))}
                    </Flex>
                  ) : (
                    menu.map((v, idx) => (
                      <Box key={idx} data-testid="headerMenu">
                        {v.subMenu && v.subMenu.length ? (
                          <Dropdown
                            menu={{
                              items: v.subMenu.map((subV, subIdx) => ({
                                key: idx + "-" + subIdx,
                                label: subV.link && (
                                  <Link to={subV.link}>
                                    <GNBMenu {...subV} />
                                  </Link>
                                ),
                              })),
                            }}
                            placement="bottom"
                          >
                            <Center minH={height}>
                              <Link to={v.link}>
                                <GNBMenu {...v} />
                              </Link>
                            </Center>
                          </Dropdown>
                        ) : (
                          <Link to={v.link}>
                            <Center minH={height}>
                              <GNBMenu {...v} />
                            </Center>
                          </Link>
                        )}
                      </Box>
                    ))
                  )}
                </Flex>
              )}
              {menu && responsive && (
                <Center
                  cursor="pointer"
                  data-testid="headerMenuContainer"
                  display={["flex", null, "none"]}
                  gap={4}
                  onClick={() => setOpen(true)}
                >
                  {typeof mobileIcon === "string" && mobileIcon in MDIcon ? (
                    <Icon icon={mobileIcon as keyof typeof MDIcon} size={24} />
                  ) : (
                    mobileIcon
                  )}
                </Center>
              )}
              {sideMenu && (
                <Flex
                  data-testid="headerMenuContainer"
                  display={responsive ? ["none", null, "flex"] : "flex"}
                  gap={5}
                >
                  {sideMenu.map((v, idx) => (
                    <Box key={idx} data-testid="headerMenu">
                      <Link to={v.link}>
                        <Center minH={height}>
                          <SideMenu {...v} />
                        </Center>
                      </Link>
                    </Box>
                  ))}
                </Flex>
              )}
              {position === "center" && !sideMenu && <Box />}
            </Flex>
          </Center>
        </Spin>
        {menu && responsive && (
          <Drawer
            onClose={() => setOpen(false)}
            open={open}
            title={
              <Flex gap={3} justifyContent="end">
                {sideMenu &&
                  sideMenu.map((v, idx) => (
                    <Box key={idx}>
                      <Link to={v.link}>
                        <SideMenu {...v} />
                      </Link>
                    </Box>
                  ))}
              </Flex>
            }
          >
            <Flex data-testid="menuDrawer" flexDir="column" gap={4}>
              {menu.map((v, idx) => (
                <Box
                  key={idx}
                  borderBottom="1px solid"
                  borderColor="border"
                  pb={4}
                >
                  <Flex flexDir="column" gap={4}>
                    <Link to={v.link}>
                      <GNBMenu {...v} />
                    </Link>
                    {v.subMenu &&
                      v.subMenu.map((subV, subIdx) => (
                        <Box key={idx + "-" + subIdx} mx={6}>
                          <Link to={subV.link}>
                            <GNBMenu sub {...subV} />
                          </Link>
                        </Box>
                      ))}
                  </Flex>
                </Box>
              ))}
            </Flex>
          </Drawer>
        )}
      </Flex>
    </Flex>
  );
};

export default GNB;

// import { addPropertyControls, ControlType } from "framer"
//
// import { getColorKeys } from "../../codeFile/theme/theme.ts"
// import { Theme } from "../App.tsx"
//
// addPropertyControls(GNB, {
//   sideMenu: {
//     type: ControlType.Array,
//     control: {
//       type: ControlType.Object,
//       controls: {
//         content: {
//           type: ControlType.String,
//           defaultValue: "내용",
//         },
//         color: {
//           type: ControlType.Enum,
//           options: getColorKeys(Theme),
//           defaultValue: "mainText",
//         },
//         link: {
//           type: ControlType.String,
//         },
//       },
//     },
//     defaultValue: [{ content: "테스트" }, { content: "테스트" }],
//   },
//   menu: {
//     type: ControlType.Array,
//     control: {
//       type: ControlType.Object,
//       controls: {
//         content: {
//           type: ControlType.String,
//           defaultValue: "내용",
//         },
//         color: {
//           type: ControlType.Enum,
//           options: getColorKeys(Theme),
//         },
//         link: {
//           type: ControlType.String,
//           defaultValue: "https://devfive.kr",
//         },
//       },
//     },
//     defaultValue: [{ content: "테스트" }, { content: "테스트" }],
//   },
//   bg: {
//     type: ControlType.Enum,
//     options: getColorKeys(Theme),
//     defaultValue: "backgroundColor",
//   },
//   logo: {
//     type: ControlType.String,
//     defaultValue: "image src here",
//   },
//   height: {
//     type: ControlType.String,
//     defaultValue: "80px",
//   },
//   colorChange: {
//     type: ControlType.Boolean,
//     defaultValue: true,
//   },
//   top: {
//     type: ControlType.String,
//   },
//   left: {
//     type: ControlType.String,
//   },
//   isLoading: {
//     type: ControlType.Boolean,
//     defaultValue: false,
//   },
//   maxWidth: {
//     type: ControlType.String,
//     defaultValue: "1600px",
//   },
//   position: {
//     type: ControlType.Enum,
//     options: ["right", "center"],
//     defaultValue: "right",
//   },
// })
