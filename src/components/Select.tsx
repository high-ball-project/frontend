import { As, chakra } from "@chakra-ui/react";
import { default as _Select, SelectProps } from "antd/es/select";

import { DevfiveComponent as ComponentType } from "../interfaces/types";

const __Select = chakra<As, SelectProps>(_Select);

const Select: ComponentType<SelectProps> = ({ ...rest }: SelectProps) => (
  <__Select {...rest} />
);
export default Select;

// import { addPropertyControls, ControlType } from "framer";
//
// addPropertyControls(Select, {
//   options: {
//     type: ControlType.Array,
//     control: {
//       type: ControlType.Object,
//       controls: {
//         value: {
//           type: ControlType.String,
//           defaultValue: "Value Here",
//         },
//         label: {
//           type: ControlType.String,
//           defaultValue: "label Here",
//         },
//       },
//     },
//     defaultValue: [
//       { value: "1", label: "선택 1" },
//       { value: "2", label: "선택 2" },
//       { value: "3", label: "선택 3" },
//     ],
//   },
//   placeholder: {
//     type: ControlType.String,
//     defaultValue: "Click to Select",
//   },
//   defaultValue: {
//     type: ControlType.String,
//     defaultValue: "1",
//   },
// });
