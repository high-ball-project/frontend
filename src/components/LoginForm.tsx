import { Box, Center, ColorProps, Flex, LayoutProps } from "@chakra-ui/react";
import { Theme } from "@emotion/react";
import { Divider, FormItemProps } from "antd/es/index";
import { ComponentType, ReactNode, useEffect, useMemo } from "react";
import { useSearchParam } from "react-use";

import appleIcon from "../images/appleIcon.svg";
import googleIcon from "../images/googleIcon.svg";
import kakaoIcon from "../images/kakaoIcon.svg";
import naverIcon from "../images/naverIcon.svg";
import { Button, Form, Icon, Image, Link, Text } from "../index";
import { Input } from "./Element";

type SnsType = "kakao" | "naver" | "google" | "apple";

export interface LoginFormProps {
  width?: LayoutProps["width"];
  logo?: string | ReactNode;
  title?: string;
  color?: ColorProps["color"] | keyof Theme["colors"];
  sns?: SnsType[];
  idPlaceholder?: string;
  pwPlaceholder?: string;
  idLabel?: string;
  pwLabel?: string;
  redirectUrl?: string;
  snsState?: string;
  onLogin: (
    username: string,
    password: string,
    snsType?: SnsType
  ) => Promise<void> | void;
  snsPosition?: "top" | "bottom";
  idRule?: FormItemProps["rules"];
  pwRule?: FormItemProps["rules"];
  findUrl?: string;
  signupUrl?: string;
}

const snsIcon: Record<SnsType, string> = {
  kakao: kakaoIcon,
  apple: appleIcon,
  google: googleIcon,
  naver: naverIcon,
};

/**
 * LoginForm components
 * @param {CSS.Property.width} width
 * @param {string} logo
 * @param {string} title
 * @param {CSS.Property.Color} color
 * @param {string} idLabel
 * @param {string} pwLabel
 * @param {string} idPlaceholder
 * @param {string} pwPlaceholder
 * @param {SnsType[]} sns
 * @param {string} redirectUrl
 * @param {string} snsState
 * @param {function} onLogin
 * @param {Rule[]} idRule
 * @param {Rule[]} pwRule
 * @param {"top" | "bottom"} snsPosition
 * @param {string} signupUrl
 * @param {string} findUrl
 * @constructor
 */
const LoginForm: ComponentType<LoginFormProps> = ({
  width = "320px",
  logo,
  title,
  color = "mainText",
  idLabel = "아이디",
  pwLabel = "비밀번호",
  idPlaceholder,
  pwPlaceholder,
  sns,
  redirectUrl,
  snsState = "testState",
  onLogin,
  idRule = [
    {
      pattern: /^(?=.*[a-zA-Z0-9]).{8,16}$/,
      message: "8~16자 영문 대소문자,숫자를 사용해주세요.",
    },
  ],
  pwRule = [
    {
      pattern: /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/,
      message: "8~16자 영문 대소문자,숫자,특수문자를 사용해주세요.",
    },
  ],
  snsPosition = "top",
  signupUrl,
  findUrl,
}: LoginFormProps) => {
  const snsId = useSearchParam("id");
  const snsPw = useSearchParam("pw");
  const snsType = useSearchParam("snsType");

  useEffect(() => {
    if (!snsId || !snsPw || !snsType) return;
    onLogin(snsId, snsPw, snsType as SnsType);
  }, [onLogin, snsId, snsPw, snsType]);

  const snsLoginLink = useMemo<Record<SnsType, string>>(
    () => ({
      kakao: `https://kauth.kakao.com/oauth/authorize?client_id=${
        process.env.VITE_KAKAO_CLIENT_ID ||
        process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID
      }&redirect_uri=${redirectUrl}&response_type=code&state=${snsState}`,
      naver: `https://nid.naver.com/oauth2.0/authorize?client_id=${
        process.env.VITE_NAVER_CLIENT_ID ||
        process.env.NEXT_PUBLIC_NAVER_CLIENT_ID
      }&redirect_uri=${redirectUrl}&response_type=code&state=${snsState}`,
      google: `https://accounts.google.com/o/oauth2/v2/auth?client_id=${
        process.env.VITE_GOOGLE_CLIENT_ID ||
        process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
      }&redirect_uri=${redirectUrl}&response_type=code&state=${snsState}&scope=email`,
      apple: `https://appleid.apple.com/auth/authorize?client_id=${
        process.env.VITE_APPLE_CLIENT_ID ||
        process.env.NEXT_PUBLIC_APPLE_CLIENT_ID
      }&redirect_uri=${redirectUrl}&response_type=code&state=${snsState}&scope=email`,
    }),
    [redirectUrl, snsState]
  );

  return (
    <Form
      finishingDisabled
      layout="vertical"
      onFinish={async ({ username, password }) => {
        await onLogin(username, password);
      }}
    >
      <Center w="100%">
        <Center flexDir="column" gap={7} maxW={width} w="100%">
          {logo && typeof logo === "string" ? (
            <Image
              alt="LoginFormLogo"
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
          {title && (
            <Text
              color={color}
              data-testid="title"
              fontSize="lg"
              fontWeight="bold"
            >
              {title}
            </Text>
          )}
          <Center
            flexDir={snsPosition === "top" ? "column" : "column-reverse"}
            w="100%"
          >
            {sns && (
              <Center gap={4}>
                {sns.map((v) => (
                  <Link key={v} to={snsLoginLink[v]}>
                    <Center
                      border="1px solid"
                      borderColor="border"
                      borderRadius="24px"
                      data-testid={v}
                    >
                      <Image
                        cursor="pointer"
                        minH="48px"
                        minW="48px"
                        preview={false}
                        src={snsIcon[v]}
                      />
                    </Center>
                  </Link>
                ))}
              </Center>
            )}
            {sns && (
              <Box w="100%">
                <Divider>OR</Divider>
              </Box>
            )}
            <Flex flexDir="column" w="100%">
              <Form.Item label={idLabel} name="username" rules={idRule}>
                <Input placeholder={idPlaceholder} w="100%" />
              </Form.Item>
              <Form.Item label={pwLabel} name="password" rules={pwRule}>
                <Center flexDir="column" gap={1}>
                  <Input.Password placeholder={pwPlaceholder} />
                </Center>
              </Form.Item>
              <Button htmlType="submit" type="primary">
                <Center gap={1}>
                  <Icon icon="MdLogin" />
                  로그인
                </Center>
              </Button>
              {(findUrl || signupUrl) && (
                <Flex justifyContent="space-between" my={2}>
                  {findUrl && (
                    <Link to={findUrl}>
                      <Text
                        color="subText"
                        data-testid="findUrl"
                        fontSize="xs"
                        fontWeight="bold"
                      >
                        아이디/비밀번호 찾기
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

export default LoginForm;

// import { addPropertyControls, ControlType } from "framer";
//
// import { Theme } from "../App.tsx";
// import { getColorKeys } from "../theme/theme.ts";
//
// addPropertyControls(LoginForm, {
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
//   sns: {
//     type: ControlType.Array,
//     control: {
//       type: ControlType.Enum,
//       options: ["kakao", "naver", "google", "apple"],
//       defaultValue: "kakao",
//     },
//     defaultValue: [],
//   },
//   findUrl: {
//     type: ControlType.String,
//     defaultValue: "/find",
//   },
//   signupUrl: {
//     type: ControlType.String,
//     defaultValue: "/signup",
//   },
//   snsPosition: {
//     type: ControlType.Enum,
//     options: ["top", "bottom"],
//     defaultValue: "top",
//   },
//   idPlaceholder: {
//     type: ControlType.String,
//     defaultValue: "id Placeholder",
//   },
//   pwPlaceholder: {
//     type: ControlType.String,
//     defaultValue: "pw Placehoder",
//   },
//   idLabel: {
//     type: ControlType.String,
//     defaultValue: "아이디",
//   },
//   pwLabel: {
//     type: ControlType.String,
//     defaultValue: "비밀번호",
//   },
//   redirectUrl: {
//     type: ControlType.String,
//     defaultValue: "test url",
//   },
//   snsState: {
//     type: ControlType.String,
//     defaultValue: "state",
//   },
// });
