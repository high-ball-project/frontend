import { As, chakra } from "@chakra-ui/react";
import { default as _Empty, EmptyProps } from "antd/es/empty";

import { DevfiveComponent as ComponentType } from "../interfaces/types";

const __Empty = chakra<As, EmptyProps>(_Empty, {
  baseStyle: {
    display: "flex",
    flexDir: "column",
    alignItems: "center",
    justifyContent: "center",
  },
});

const Empty: ComponentType<EmptyProps> = ({ ...rest }: EmptyProps) => (
  <__Empty {...rest} />
);
export default Empty;

// import { addPropertyControls, ControlType } from "framer";
//
// addPropertyControls(Empty, {
//   width: {
//     type: ControlType.String,
//     defaultValue: "100%",
//   },
//   height: {
//     type: ControlType.String,
//     defaultValue: "320px",
//   },
// });
