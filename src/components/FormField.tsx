import { Flex } from "@chakra-ui/react";
import CheckInput from "@components/CheckInput";
import { Input } from "@components/Element";
import Form from "@components/Form";
import Select from "@components/Select";
import Verification from "@components/Verification";
import { FormItemProps } from "antd/es/form";
import { SelectProps } from "antd/es/select";
import { ComponentType } from "react";

export interface InputField {
  type: "input" | "password";
  placeholder?: string;
  label?: string;
  rule?: FormItemProps["rules"];
  name: string;
}

export interface CheckField {
  type: "check";
  placeholder?: string;
  label?: string;
  rule?: FormItemProps["rules"];
  name: string;
  onCheck: (value: string, onSuccess: () => void) => Promise<void> | void;
}

export interface VerificationField {
  type: "code";
  onSend: (value: string) => Promise<void> | void;
  onConfirm: (
    value: string,
    code: string,
    onSuccess: () => void
  ) => Promise<void> | void;
  label?: string;
  timeoutSecond?: number;
  sendFieldPattern?: RegExp;
  name: string;
  sendFieldPlaceholder?: string;
  codePlaceholder?: string;
}

export interface SelectField {
  type: "select";
  placeholder?: string;
  label?: string;
  rule?: FormItemProps["rules"];
  name: string;
  options: SelectProps["options"];
}

export type Field = (
  | VerificationField
  | InputField
  | CheckField
  | SelectField
)[];

export interface FormFieldProps {
  fields: Field;
  onSuccess: (name: string) => void;
}

const FormField: ComponentType<FormFieldProps> = ({
  fields,
  onSuccess,
}: FormFieldProps) => (
  <Flex flexDir="column" w="100%">
    {fields.map((v) =>
      v.type === "code" ? (
        <Verification
          key={v.name}
          info={v}
          onConfirm={async (value, code, success) => {
            (v as VerificationField).onConfirm(value, code, () => {
              onSuccess(v.name);
              success();
            });
          }}
          onSend={v.onSend}
        />
      ) : v.type === "check" ? (
        <CheckInput
          key={v.name}
          info={v}
          onCheck={async (value, success) => {
            (v as CheckField).onCheck(value, () => {
              onSuccess(v.name);
              success();
            });
          }}
        />
      ) : v.type === "select" ? (
        <Form.Item
          key={v.name}
          label={v.label ?? "성별"}
          name={v.name}
          rules={v.rule}
        >
          <Select options={v.options} />
        </Form.Item>
      ) : (
        <Form.Item
          key={v.name}
          label={v.label ?? "이메일"}
          name={v.name}
          rules={
            v.rule ?? [
              {
                pattern:
                  /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/,
                message: "유효한 이메일이 아닙니다.",
              },
            ]
          }
        >
          {v.type === "password" ? (
            <Input.Password placeholder={v.placeholder} />
          ) : (
            <Input placeholder={v.placeholder} type={v.type} />
          )}
        </Form.Item>
      )
    )}
  </Flex>
);

export default FormField;

// import { addPropertyControls, ControlType } from "framer";
//
// addPropertyControls(FormField, {
//   fields: {
//     type: ControlType.Array,
//     control: {
//       type: ControlType.Object,
//       controls: {
//         type: {
//           type: ControlType.Enum,
//           options: ["input", "code", "select", "check", "password"],
//           defaultValue: "input",
//         },
//         label: {
//           type: ControlType.String,
//           defaultValue: "Label Here",
//         },
//         timeoutSecond: {
//           type: ControlType.Number,
//           defaultValue: 180,
//         },
//         name: {
//           type: ControlType.String,
//           defaultValue: "Name Here",
//         },
//         sendFieldPlaceholder: {
//           type: ControlType.String,
//           defaultValue: "Placeholder Here",
//         },
//         codePlaceholder: {
//           type: ControlType.String,
//           defaultValue: "Placeholder Here",
//         },
//         placeholder: {
//           type: ControlType.String,
//           defaultValue: "Placeholder Here",
//         },
//       },
//       defaultValue: [
//         {
//           type: "check",
//           placeholder: "PlaceHoder Here",
//           label: "check type",
//           name: "Name Here",
//         },
//         {
//           type: "code",
//           label: "code type",
//           sendFieldPlaceholder: "sendField PlaceHolder",
//           timeoutSecond: 180,
//           codePlaceholder: "code PlaceHolder",
//           name: "first",
//         },
//         {
//           type: "input",
//           label: "Input type",
//         },
//         {
//           type: "password",
//           label: "Password type",
//         },
//         {
//           type: "select",
//           label: "Select type",
//         },
//       ],
//     },
//   },
// });
