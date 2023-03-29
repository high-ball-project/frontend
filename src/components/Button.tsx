import { As, Center, chakra, ChakraProps } from "@chakra-ui/react";
import { ButtonProps, default as _Button } from "antd/es/button";
import {
  forwardRef,
  ForwardRefExoticComponent,
  PropsWithoutRef,
  ReactNode,
  RefAttributes,
  useCallback,
  useState,
} from "react";
import * as MDIcon from "react-icons/md";

import { Icon } from "../index";

const __Button = chakra<As, ButtonProps>(_Button);

type Props = Omit<ButtonProps, "icon"> & {
  text?: string;
  icon?: keyof typeof MDIcon | ReactNode;
  clickingLoaded?: boolean;
};

type ComponentType = ForwardRefExoticComponent<
  PropsWithoutRef<ChakraProps & Props> & RefAttributes<ChakraProps & Props>
>;

const Button: ComponentType = forwardRef(
  (
    { text, children, icon, loading, clickingLoaded, onClick, ...rest }: Props,
    ref
  ) => {
    const [clicking, setClicking] = useState(false);

    const handleClick = useCallback(
      async (...args: any) => {
        setClicking(true);
        await onClick?.(args);
        setClicking(false);
      },
      [onClick]
    );

    const _loading = loading || (clicking && clickingLoaded);

    return (
      <__Button ref={ref} loading={_loading} onClick={handleClick} {...rest}>
        <Center display="inline-flex" gap={1} h="100%">
          {!_loading && typeof icon === "string" && icon in MDIcon ? (
            <Icon icon={icon as keyof typeof MDIcon} />
          ) : (
            !_loading && icon
          )}
          {text || children}
        </Center>
      </__Button>
    );
  }
);

Button.displayName = "Button";

export default Button;

// import { addPropertyControls, ControlType } from "framer";
//
// addPropertyControls(Button, {
//   text: {
//     type: ControlType.String,
//     defaultValue: "Text Here",
//   },
//   danger: {
//     type: ControlType.Boolean,
//     defaultValue: false,
//   },
//   width: {
//     type: ControlType.String,
//     defaultValue: "100%",
//   },
//   height: {
//     type: ControlType.String,
//     defaultValue: "100%",
//   },
//   htmlType: {
//     type: ControlType.String,
//   },
//   type: {
//     type: ControlType.Enum,
//     options: ["primary", "ghost", "dashed", "link", "text", "default"],
//     defaultValue: "default",
//   },
//   disabled: {
//     type: ControlType.boolean,
//     defaultValue: false,
//   },
//   size: {
//     type: ControlType.Enum,
//     options: ["large", "middle", "small"],
//     defaultValue: "middle",
//   },
// });
