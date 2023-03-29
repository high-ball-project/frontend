import { Center } from "@chakra-ui/react";
import FindForm from "@components/FindForm";
import { notification } from "antd";

import devfiveIcon from "/devfiveicon.svg";

const FindPage = () => (
  <Center h="100vh">
    <FindForm
      fields={[
        {
          type: "input",
          name: "username",
          rule: [
            {
              pattern: undefined,
            },
          ],
          label: "이름",
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
      loginUrl="/login"
      logo={devfiveIcon}
      onFind={async (value) => {
        notification.success({
          message: Object.entries(value).map((v) => v[1].toString() + "/"),
        });
      }}
      signupUrl="/signup"
      title="비밀번호 찾기"
    />
  </Center>
);

export default FindPage;
