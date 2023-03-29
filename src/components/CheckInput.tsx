import { Flex } from "@chakra-ui/react";
import { ComponentType, useState } from "react";

import { Button, CheckField, Form, Input } from "../index";

export interface CheckInputProps {
  info: CheckField;
  onCheck: (value: string, onSuccess: () => void) => Promise<void> | void;
}

const CheckInput: ComponentType<CheckInputProps> = ({
  info,
  onCheck,
}: CheckInputProps) => {
  const [valid, setValid] = useState(false);

  const form = Form.useFormInstance();

  const value = Form.useWatch<string>(info.name, form);

  return (
    <Form.Item key={info.name} label={info.label ?? "닉네임"} name={info.name}>
      <Flex gap={2}>
        <Input disabled={valid} placeholder={info.placeholder} />
        <Button
          disabled={valid}
          onClick={async () => {
            await onCheck(value, () => {
              setValid(true);
            });
          }}
        >
          중복체크
        </Button>
      </Flex>
    </Form.Item>
  );
};

export default CheckInput;

// import { addPropertyControls, ControlType } from "framer"
//
// addPropertyControls(CheckInput, {
//   info: {
//     type: ControlType.Object,
//     controls: {
//       placeholder: {
//         type: ControlType.String,
//         defaultValue: "Placeholder Here",
//       },
//       label: {
//         type: ControlType.String,
//         defaultValue: "Label Here",
//       },
//       name: {
//         type: ControlType.String,
//         defaultValue: "Name Here",
//       },
//     },
//     defaultValue: {
//       placeholder: "PlaceHoder Here",
//       label: "Label Here",
//       name: "Name Here",
//     },
//   },
// })
