import { Center } from "@chakra-ui/react";
import SignupForm from "@components/SignupForm";
import { notification } from "antd";
import { useSearchParam } from "react-use";

import devfiveIcon from "/devfiveicon.svg";

const SignupPage = () => {
  const username = useSearchParam("username");
  const password = useSearchParam("password");

  return (
    <Center h="100vh">
      <SignupForm
        fields={[
          {
            type: "input",
            name: "username",
            rule: [],
            label: "이름",
          },
          {
            type: "password",
            name: "password",
            rule: [
              {
                pattern: /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/,
                message: "8~16자 영문 대소문자,숫자,특수문자를 사용해주세요.",
              },
            ],
            label: "비밀번호",
          },
          {
            type: "password",
            name: "passwordConfirm",
            rule: [
              {
                pattern: /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/,
                message: "8~16자 영문 대소문자,숫자,특수문자를 사용해주세요.",
              },
            ],
            label: "비밀번호 확인",
          },
          {
            type: "check",
            name: "nickname",
            label: "닉네임",
            placeholder: "test입력시 실패",
            onCheck: (value, onSuccess) => {
              const result = value === "test";
              if (result) {
                notification.error({
                  message: value + "는 사용 불가능한 닉네임 입니다.",
                });
              } else {
                notification.success({
                  message: value + "는 사용가능한 닉네임 입니다.",
                });
                onSuccess();
              }
            },
          },
          {
            type: "select",
            name: "gender",
            options: [
              { value: "M", label: "남" },
              { value: "W", label: "여" },
            ],
          },
          {
            type: "input",
            name: "email",
          },
          {
            name: "phone",
            type: "code",
            codePlaceholder: "000000을 입력하면 실패",
            onSend: async (phone) =>
              notification.success({
                message: phone + "으로 인증번호를 발송했습니다.",
              }),
            onConfirm: async (phone, code, onSuccess) => {
              const result = code !== "000000";
              if (result) {
                notification.success({ message: phone + " / " + code });
                onSuccess();
              } else {
                notification.success({ message: "인증에 실패했습니다." });
              }
            },
          },
        ]}
        findUrl="/find"
        loginUrl="/login"
        logo={devfiveIcon}
        onSignup={async (value) => {
          notification.success({
            message: Object.entries(value).map((v) => v[1] + "/"),
          });
        }}
        sns={!!password && !!username}
        snsException={["username", "password", "passwordConfirm"]}
        title="데브파이브에 회원가입"
      />
    </Center>
  );
};

export default SignupPage;
