import { Center, ColorProps, Flex, LayoutProps } from "@chakra-ui/react";
import { Theme as EmotionTheme } from "@emotion/react";
import { notification } from "antd/es/index";
import { ComponentType, ReactNode, useMemo, useState } from "react";

import { Button, Field, Form, FormField, Image, Link, Text } from "../index";

export interface SignupFormProps {
  width?: LayoutProps["width"];
  logo?: string | ReactNode;
  title?: string;
  color?: ColorProps["color"] | keyof EmotionTheme["colors"];
  fields: Field;
  onSignup: (value: Record<string | "code", any>) => Promise<void> | void;
  snsException?: string[];
  sns?: boolean;
  loginUrl?: string;
  findUrl?: string;
}

const SignupForm: ComponentType<SignupFormProps> = ({
  logo,
  title,
  color = "mainText",
  width = "320px",
  fields,
  onSignup,
  snsException,
  sns,
  loginUrl,
  findUrl,
}: SignupFormProps) => {
  const validLength = useMemo(
    () => fields.filter((v) => ["check", "code"].includes(v.type)).length,
    [fields]
  );

  const [valid, setValid] = useState<string[]>([]);

  return (
    <Form
      layout="vertical"
      onFinish={async (v) => {
        if (valid.length !== validLength) {
          notification.error({ message: "인증을 진행해주세요!" });
          return;
        }
        await onSignup(v);
      }}
    >
      <Center w="100%">
        <Center flexDir="column" gap={7} maxW={width} w="100%">
          {logo &&
            (typeof logo === "string" ? (
              <Image
                alt="SignupFormLogo"
                data-testid="icon"
                gap={4}
                maxH="100px"
                maxW="100px"
                preview={false}
                src={logo}
              />
            ) : (
              logo
            ))}
          <Center w="100%">
            <Flex flexDir="column" w="100%">
              {title && (
                <Text
                  color={color}
                  data-testid="title"
                  fontSize="lg"
                  fontWeight="bold"
                  mb={4}
                  textAlign="center"
                  w="100%"
                >
                  {title}
                </Text>
              )}
              <FormField
                fields={fields.filter(
                  (v) => !(sns && (snsException ?? []).includes(v.name))
                )}
                onSuccess={(name) => setValid([...valid, name])}
              />
              <Button htmlType="submit" type="primary">
                회원가입
              </Button>
              {(loginUrl || findUrl) && (
                <Flex justifyContent="space-between" my={2}>
                  {loginUrl && (
                    <Link to={loginUrl}>
                      <Text
                        color="subText"
                        data-testid="loginUrl"
                        fontSize="xs"
                        fontWeight="bold"
                      >
                        로그인 화면으로
                      </Text>
                    </Link>
                  )}
                  {findUrl && (
                    <Link to={findUrl}>
                      <Text
                        color="subText"
                        data-testid="findUrl"
                        fontSize="xs"
                        fontWeight="bold"
                      >
                        아이디를 까먹으셨나요?
                      </Text>
                    </Link>
                  )}
                </Flex>
              )}
            </Flex>
          </Center>
        </Center>
      </Center>
    </Form>
  );
};

export default SignupForm;

// import { addPropertyControls, ControlType } from "framer";
//
// import { Theme } from "../App.tsx";
// import { getColorKeys } from "../theme/theme.ts";
//
// addPropertyControls(SignupForm, {
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
//     },
//     defaultValue: [
//       {
//         type: "check",
//         placeholder: "PlaceHoder Here",
//         label: "닉네임",
//         name: "nickname",
//       },
//       {
//         type: "code",
//         label: "전화번호",
//         sendFieldPlaceholder: "sendField PlaceHolder",
//         timeoutSecond: 180,
//         codePlaceholder: "code PlaceHolder",
//         name: "phone",
//       },
//       {
//         type: "input",
//         label: "아이디",
//         name: "id",
//       },
//       {
//         type: "password",
//         label: "비밀번호",
//         name: "password",
//       },
//       {
//         type: "select",
//         label: "성별",
//         name: "gender",
//       },
//     ],
//   },
//   width: {
//     type: ControlType.String,
//     defaultValue: "320px",
//   },
//   icon: {
//     type: ControlType.String,
//     defaultValue:
//       "https://fastly.picsum.photos/id/556/150/150.jpg?hmac=2iwMtuRT48rYXAePe37EGKEBfxY2HBBnbXBNV-R8vsA",
//   },
//   title: {
//     type: ControlType.String,
//     defaultValue: "Title Here",
//   },
//   color: {
//     type: ControlType.Enum,
//     options: getColorKeys(Theme),
//     defaultValue: "mainText",
//   },
//   snsException: {
//     type: ControlType.Array,
//     control: {
//       type: ControlType.String,
//       defaultValue: "Name Here",
//     },
//     defaultValue: ["id", "password"],
//   },
//   sns: {
//     type: ControlType.Boolean,
//     defaultValue: false,
//   },
//   loginUrl: {
//     type: ControlType.String,
//     defaultValue: "/login",
//   },
//   findUrl: {
//     type: ControlType.String,
//     defaultValue: "/find",
//   },
// });
