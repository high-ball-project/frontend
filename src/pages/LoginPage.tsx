import { Center } from "@chakra-ui/react";
import Icon from "@components/Icon";
import Link from "@components/Link";
import LoginForm from "@components/LoginForm";
import { notification } from "antd";
import React from "react";

const LoginPage = () => (
  <Center h="100vh">
    <LoginForm
      findUrl="/find"
      logo={
        <Link to="/">
          <Icon color="primary" icon="MdMotionPhotosAuto" size={120} />
        </Link>
      }
      onLogin={async (id, pw, snsType) => {
        await notification.success({
          message: id + " / " + pw + " / " + snsType,
        });
      }}
      signupUrl="/signup"
      sns={["kakao", "google", "naver", "apple"]}
      snsPosition="bottom"
      title="하이볼 계정으로 로그인"
    />
  </Center>
);

export default LoginPage;
