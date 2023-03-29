import { Center, ColorProps, Flex, LayoutProps } from "@chakra-ui/react";
import Button from "@components/Button";
import Form from "@components/Form";
import FormField, { Field } from "@components/FormField";
import Icon from "@components/Icon";
import Image from "@components/Image";
import Link from "@components/Link";
import Text from "@components/Text";
import { Theme } from "@emotion/react";
import { notification } from "antd";
import { ComponentType, ReactNode, useMemo, useState } from "react";

export interface FindFormProps {
  width?: LayoutProps["width"];
  logo?: string | ReactNode;
  title?: string;
  color?: ColorProps["color"] | keyof Theme["colors"];
  onFind: (value: Record<string | "code", any>) => Promise<void> | void;
  loginUrl?: string;
  signupUrl?: string;
  fields: Field;
}

/**
 * FindForm Component
 * @param {CSS.Property.Width | CSS.Property.Width[]} width
 * @param {string | ReactNode} logo
 * @param {string} title
 * @param {CSS.Property.Color} color
 * @param {string} label
 * @param {function} onFind
 * @param {string} signupUrl
 * @param {string} loginUrl
 * @param {Field} fields
 * @constructor
 */
const FindForm: ComponentType<FindFormProps> = ({
  width = "320px",
  logo,
  title,
  color = "mainText",
  onFind,
  fields,
  signupUrl,
  loginUrl,
}: FindFormProps) => {
  const checkField = useMemo(
    () =>
      fields
        .filter((v) => ["check", "code"].includes(v.type))
        .map((v) => v.name),
    [fields]
  );

  const [valid, setValid] = useState<string[]>([]);

  return (
    <Form
      finishingDisabled
      layout="vertical"
      onFinish={async (v) => {
        if (valid === checkField) {
          notification.error({ message: "인증을 진행해주세요!" });
          return;
        }
        await onFind(v);
      }}
    >
      <Center w="100%">
        <Center flexDir="column" gap={7} maxW={width} w="100%">
          {logo && typeof logo === "string" ? (
            <Image
              alt="FindFormLogo"
              data-testid="icon"
              gap={4}
              maxH="100px"
              maxW="100px"
              preview={false}
              src={logo}
            />
          ) : (
            logo
          )}
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
                fields={fields}
                onSuccess={(name) => setValid([...valid, name])}
              />
              <Button htmlType="submit" type="primary">
                <Center gap={1}>
                  <Icon icon="MdCheck" />
                  정보 확인하기
                </Center>
              </Button>
              {(loginUrl || signupUrl) && (
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
                  {signupUrl && (
                    <Link to={signupUrl}>
                      <Text
                        color="subText"
                        data-testid="signupUrl"
                        fontSize="xs"
                        fontWeight="bold"
                      >
                        회원가입
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

export default FindForm;

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
//         type: "input",
//         name: "username",
//         label: "이름",
//       },
//       {
//         type: "input",
//         name: "email",
//       },
//       {
//         name: "phone",
//         type: "code",
//         codePlaceholder: "000000을 입력하면 실패",
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
//   signupUrl: {
//     type: ControlType.String,
//     defaultValue: "/signup",
//   },
// });
