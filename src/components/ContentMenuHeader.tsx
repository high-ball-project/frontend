import { Box, Center, Show } from "@chakra-ui/react";
import Button from "@components/Button";
import Icon from "@components/Icon";
import Text from "@components/Text";
import Dropdown from "antd/es/dropdown/index";
import { MenuItemType as _MenuItemType } from "antd/es/menu/hooks/useItems";
import { ComponentType, ReactNode, useMemo } from "react";
import * as MDIcon from "react-icons/md";

type MenuItemType = Omit<
  _MenuItemType,
  "onMouseEnter" | "onMouseLeave" | "onClick" | "key"
> & {
  onClick?(): void;
};

export interface ContentMenuHeaderProps {
  title: string | ReactNode;
  menus: MenuItemType[];
  type?: "responsive" | "more" | "button";
}

const ContentMenuHeader: ComponentType<ContentMenuHeaderProps> = ({
  title,
  menus,
  type = "responsive",
}: ContentMenuHeaderProps) => {
  const memoMenus = useMemo(
    () => menus.map((value, index) => ({ key: index, ...value })),
    [menus]
  );
  return (
    <Center
      alignItems="center"
      borderBottom="1px solid"
      borderColor="border"
      data-testid="header"
      justifyContent="space-between"
      p={2}
    >
      {typeof title === "string" ? (
        <Text fontSize={["xl", "2xl"]} fontWeight="bold">
          {title}
        </Text>
      ) : (
        title
      )}
      <Show above={type === "responsive" ? "md" : undefined}>
        <Center display={type === "more" ? "none" : undefined} gap={4}>
          {memoMenus.map((menu, idx) => (
            <Button
              key={idx}
              danger={menu.danger}
              disabled={menu.disabled}
              icon={menu.icon}
              onClick={menu.onClick}
            >
              {menu.label}
            </Button>
          ))}
        </Center>
      </Show>
      <Show below={type === "responsive" ? "md" : undefined}>
        <Box display={type === "button" ? "none" : undefined}>
          <Dropdown
            menu={{
              items: memoMenus.map((v) => {
                v.icon =
                  typeof v.icon === "string" && v.icon in MDIcon ? (
                    <Icon icon={v.icon as keyof typeof MDIcon} size={24} />
                  ) : (
                    <>{v.icon}</>
                  );

                return v;
              }),
            }}
          >
            <Center color="mainText" cursor="pointer" h="100%">
              <Icon icon="MdMoreVert" size={24} />
            </Center>
          </Dropdown>
        </Box>
      </Show>
    </Center>
  );
};
export default ContentMenuHeader;

// import { addPropertyControls, ControlType } from "framer"
//
// addPropertyControls(ContentMenuHeader, {
//   title: {
//     type: ControlType.String,
//     defaultValue: "Title Here",
//   },
//   type: {
//     type: ControlType.Enum,
//     options: ["responsive", "more", "button"],
//     defaultValue: "responsive",
//   },
//   menus: {
//     type: ControlType.Array,
//     control: {
//       type: ControlType.Object,
//       controls: {
//         label: {
//           type: ControlType.String,
//         },
//         danger: {
//           type: ControlType.Boolean,
//           defaultValue: false,
//         },
//         disabled: {
//           type: ControlType.Boolean,
//           defaultValue: false,
//         },
//       },
//     },
//     defaultValue: [
//       {
//         label: "Menu Here 1",
//       },
//       {
//         label: "Menu Here 2",
//         danger: true,
//       },
//       {
//         label: "Menu Here 3",
//         disabled: true,
//       },
//     ],
//   },
// })
