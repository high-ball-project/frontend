import {
  BackgroundProps,
  BorderProps,
  Box,
  Center,
  ColorProps,
  SpaceProps,
} from "@chakra-ui/react";
import Icon from "@components/Icon";
import Link from "@components/Link";
import Text from "@components/Text";
import { Theme as EmotionTheme } from "@emotion/react";
import Tooltip from "antd/es/tooltip";
import { ComponentType, Key, ReactNode, useState } from "react";
import * as MDIcon from "react-icons/md";

export interface CategoryMenuItemProps {
  info: CategoryMenuItemInfo;
  selected?: boolean;
}

export interface CategoryMenuItemInfo {
  icon: keyof typeof MDIcon | ReactNode;
  title: string;
  bg?: keyof EmotionTheme["colors"] | BackgroundProps["bg"];
  color?: keyof EmotionTheme["colors"] | ColorProps["color"];
  tooltip?: string;
  to?: string;
  target?: "_self" | "_blank" | "_parent" | "_top" | string;
  key: Key;
}

export interface CategoryMenuProps {
  menus: CategoryMenuItemInfo[];
  borderColor?: keyof EmotionTheme["colors"] | BorderProps["borderColor"];
  title?: string;
  bg?: keyof EmotionTheme["colors"] | BackgroundProps["bg"];
  color?: keyof EmotionTheme["colors"] | ColorProps["color"];
  p?: SpaceProps["p"];
  multiple?: boolean;
  onChange?: (select: Key[]) => void;
  onSelect?: (select: CategoryMenuItemInfo, key: Key) => void;
  value?: Key[];
  defaultValue?: Key[];
  itemRender?: (
    info: CategoryMenuItemInfo,
    selected: boolean
  ) => ReactNode | undefined | null;
}

/**
 * Favorite Menu Item Components
 * @param {CategoryMenuItemInfo} info
 * @param {boolean} selected
 * @return {ReactNode}
 */
const CategoryMenuItem = ({ info, selected }: CategoryMenuItemProps) => (
  <Center flexDir="column" gap={2} h="100%" w="64px">
    <Tooltip placement="bottom" title={info.tooltip}>
      <Center
        bg={selected ? "primary" : info.bg}
        borderRadius="50%"
        h="64px"
        role="group"
        shadow="0 0 25px 0 rgba(0,0,0,0.2)"
        w="64px"
      >
        <Center
          _groupHover={{
            transition: "transform ease 0.5s",
            transform: "rotateY(360deg)",
          }}
          transform="rotateY(0)"
        >
          {typeof info.icon === "string" && info.icon in MDIcon ? (
            <Icon icon={info.icon as keyof typeof MDIcon} size={32} />
          ) : (
            info.icon
          )}
        </Center>
      </Center>
    </Tooltip>
    <Text color={info.color} fontSize="sm" fontWeight="bold">
      {info.title}
    </Text>
  </Center>
);

/**
 * Favorite Menu Components
 * @param {CategoryMenuItemInfo[]} menus
 * @param {CSS.Property.Color} borderColor
 * @param {CSS.Property.Color} bg
 * @param {string} title
 * @param {CSS.Property.Color} color
 * @param {CSS.Property.Padding} p
 * @param {boolean} multiple
 * @param {function} onChange
 * @param {function} onSelect
 * @param {Key[]} defaultValue
 * @param {Key[]} value
 * @param {function} itemRender
 * @return {ReactNode}
 */
const CategoryMenu: ComponentType<CategoryMenuProps> = ({
  menus,
  borderColor = "border",
  title,
  bg = "menuBackground",
  color = "mainText",
  p = [2, 2, 4],
  multiple,
  value,
  onChange,
  defaultValue,
  onSelect,
  itemRender,
}: CategoryMenuProps) => {
  const [select, setSelect] = useState<Key[]>(defaultValue ?? []);

  return (
    <Center
      bg={bg}
      border="1px solid"
      borderColor={borderColor}
      borderRadius="main"
      flexDir="column"
      gap={6}
      p={p}
    >
      {title && (
        <Text
          color={color}
          data-testid="title"
          fontSize="2xl"
          fontWeight="bold"
        >
          {title}
        </Text>
      )}
      <Center data-testid="menuWrapper" flexWrap="wrap" gap={8}>
        {menus.map((v) => {
          const sel = value ? value.includes(v.key) : select.includes(v.key);
          const item: ReactNode | null | undefined = itemRender
            ? itemRender(v, sel)
            : undefined;

          return (
            <Box
              key={v.key}
              cursor="pointer"
              onClick={() => {
                if (onSelect) onSelect(v, v.key);
                const result = multiple
                  ? select.includes(v.key)
                    ? select.filter((subV) => subV !== v.key)
                    : [...select, v.key]
                  : [v.key];
                if (onChange) onChange(result);
                setSelect(result);
              }}
            >
              <Link target={v.target} to={v.to}>
                {item !== undefined ? (
                  item
                ) : (
                  <CategoryMenuItem info={v} selected={sel} />
                )}
              </Link>
            </Box>
          );
        })}
      </Center>
    </Center>
  );
};

export default CategoryMenu;

// import { addPropertyControls, ControlType } from "framer";
//
// import { Theme } from "../App.tsx";
// import { getColorKeys } from "../theme/theme.ts";
//
// addPropertyControls(CategoryMenu, {
//   menus: {
//     type: ControlType.Array,
//     control: {
//       type: ControlType.Object,
//       controls: {
//         title: {
//           type: ControlType.String,
//           defaultValue: "Title here",
//         },
//         icon: {
//           type: ControlType.Object,
//         },
//         bg: {
//           type: ControlType.Enum,
//           options: getColorKeys(Theme),
//           defaultValue: "primary",
//         },
//         color: {
//           type: ControlType.Enum,
//           options: getColorKeys(Theme),
//           defaultValue: "primary",
//         },
//         tooltip: {
//           type: ControlType.String,
//           defaultValue: "Tooltip here",
//         },
//         key: {
//           type: ControlType.String,
//           defaultValue: "Key here",
//         },
//       },
//     },
//     defaultValue: [
//       {
//         title: "홈",
//         tooltip: "툴팁 테스트 1",
//         key: 1,
//       },
//       {
//         title: "리스트",
//         key: 2,
//       },
//       {
//         title: "QNA",
//         tooltip: "툴팁 테스트 3",
//         key: 3,
//       },
//       {
//         title: "공지사항",
//         key: 4,
//       },
//       {
//         title: "문의하기",
//         key: 5,
//       },
//     ],
//   },
//   borderColor: {
//     type: ControlType.Enum,
//     options: getColorKeys(Theme),
//     defaultValue: "primary",
//   },
//   title: {
//     type: ControlType.String,
//     defaultValue: "Title here",
//   },
//   bg: {
//     type: ControlType.Enum,
//     options: getColorKeys(Theme),
//     defaultValue: "primary",
//   },
//   color: {
//     type: ControlType.Enum,
//     options: getColorKeys(Theme),
//     defaultValue: "primary",
//   },
//   p: {
//     type: ControlType.Array,
//     control: {
//       type: ControlType.Number,
//     },
//     defaultValue: [2, 3, 4],
//   },
//   multiple: {
//     type: ControlType.Boolean,
//     defaultValue: false,
//   },
// });
