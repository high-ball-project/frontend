import {
  BackgroundProps,
  Box,
  Center,
  Flex,
  LayoutProps,
  PositionProps,
  SpaceProps,
  useOutsideClick,
} from "@chakra-ui/react";
import { Theme } from "@emotion/react";
import { OptionProps, SelectProps } from "antd/es/select";
import { ComponentType, ReactNode, useMemo, useRef } from "react";
import * as MDIcon from "react-icons/md";
import { useToggle } from "react-use";

import { Icon, Link, Select, SkeletonBox, Text } from "../index";
import { MenuData, MenuProps } from "../interfaces/MenuData";

interface MiddleGNBMenuProps {
  menu?: MenuData[];
  select: number[];
  index?: number;
}

export interface MiddleGNBProps {
  icon?: keyof typeof MDIcon | ReactNode;
  select: number[];
  onIconClick?: () => void;
  bg?: keyof Theme["colors"] | BackgroundProps["bg"];
  px?: SpaceProps["px"];
  position?: PositionProps["position"];
  bottom?: PositionProps["bottom"];
  isLoading?: boolean;
  maxWidth?: LayoutProps["maxW"];
}

const MiddleGNBMenu: ComponentType<MiddleGNBMenuProps> = ({
  menu,
  select,
  index = 0,
}: MiddleGNBMenuProps) => {
  const [open, toggleOpen] = useToggle(false);
  const ref = useRef(null);

  useOutsideClick({
    ref,
    handler: () => toggleOpen(false),
  });

  const memoOption = useMemo(() => {
    if (!menu) return [];

    const init: OptionProps[] = [];

    if (select.length === index)
      init.push({
        value: "none",
        label: menu[0].content,
        children: [
          <Text
            key="none"
            color={menu[0].color ?? "mainText"}
            fontSize={["xs", "sm", "md"]}
            fontWeight="bold"
          >
            {menu[0].content}
          </Text>,
        ],
      } as OptionProps);

    const arr: OptionProps[] = menu.map(
      (v, idx) =>
        ({
          value: idx,
          label: v.content,
          children: [
            <Link key={idx} to={v.link}>
              <Text
                color={v.color ?? "mainText"}
                fontSize={["xs", "sm", "md"]}
                fontWeight="bold"
              >
                {v.content}
              </Text>
            </Link>,
          ],
        } as OptionProps)
    );

    return init.concat(arr);
  }, [index, menu, select.length]);

  if (!menu) return <></>;

  return (
    <>
      <Center
        ref={ref}
        borderColor="border"
        borderRight="1px solid"
        cursor="pointer"
        data-testid="middleGNBSelectMenu"
        height={["48px", "48px", "64px"]}
        onClick={toggleOpen}
        px={[1, 2, 4]}
      >
        <Select
          bordered={false}
          defaultValue={select.length === index ? "none" : select[index]}
          open={open}
          options={memoOption as SelectProps["options"]}
          width="fit-content"
        />
      </Center>
      {select.length !== index && menu[select[index]].subMenu && (
        <MiddleGNBMenu
          index={index + 1}
          menu={menu[select[index]].subMenu}
          select={select}
        />
      )}
    </>
  );
};

const MiddleGNB: ComponentType<MiddleGNBProps & MenuProps> = ({
  icon,
  menu,
  select,
  onIconClick,
  bg = "gnbBackground",
  px = [1, 4, 4],
  position = ["initial", "absolute", "absolute"],
  bottom = "-32px",
  isLoading = false,
  maxWidth = "1600px",
}: MiddleGNBProps & MenuProps) => {
  if (isLoading || !menu)
    return (
      <SkeletonBox
        bottom={bottom}
        height={["48px", "48px", "64px"]}
        pos={position}
        width="100%"
        zIndex={100}
      />
    );

  return (
    <Box bottom={bottom} pos={position} px={px} width="100%" zIndex="dropdown">
      <Center>
        <Flex bg={bg} maxWidth={maxWidth} width="100%" zIndex={50}>
          {icon && (
            <Center
              borderColor="border"
              borderRight="1px solid"
              cursor="pointer"
              data-testid="middleGNBIcon"
              onClick={onIconClick}
              width="64px"
            >
              {typeof icon === "string" && icon in MDIcon ? (
                <Icon icon={icon as keyof typeof MDIcon} size={32} />
              ) : (
                icon
              )}
            </Center>
          )}
          <MiddleGNBMenu menu={menu} select={select} />
        </Flex>
      </Center>
    </Box>
  );
};

export default MiddleGNB;

// import { addPropertyControls, ControlType } from "framer";
//
// import { getColorKeys } from "../../codeFile/theme/theme.ts";
// import { Theme } from "../App.tsx";
//
// addPropertyControls(MiddleGNB, {
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
//   select: {
//     type : ControlType.Array,
//     control: {
//       type:  ControlType.Number,
//     }
//   }.
//   bg: {
//     type: ControlType.Enum,
//     options: getColorKeys(Theme),
//     defaultValue: "backgroundColor",
//   },
//   px: {
//     type: ControlType.String,
//   },
//   position:{
//     type: ControlType.Enum,
//     options: getColorKeys(Theme),
//     defaultValue: "backgroundColor",
//   },
//   isLoading: {
//     type: ControlType.Boolean,
//     defaultValue: false,
//   },
//   maxWidth: {
//     type: ControlType.String,
//   },
// });
