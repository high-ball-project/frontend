import { Center } from "@chakra-ui/react";
import LoginForm from "@components/LoginForm";
import { notification } from "antd";
import React from "react";

import devfiveIcon from "/devfiveicon.svg";

const LoginPage = () => (
  <Center h="100vh">
    <LoginForm
      findUrl="/find"
      logo={devfiveIcon}
      onLogin={async (id, pw, snsType) => {
        await notification.success({
          message: id + " / " + pw + " / " + snsType,
        });
      }}
      signupUrl="/signup"
      sns={["kakao", "google", "naver", "apple"]}
      snsPosition="bottom"
      title="데브파이브 계정으로 로그인"
    />
  </Center>
);

export default LoginPage;
