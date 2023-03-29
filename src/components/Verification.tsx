import { Center, Flex } from "@chakra-ui/react";
import { notification } from "antd/es/index";
import dayjs from "dayjs";
import { ComponentType, useCallback, useEffect, useState } from "react";

import { Button, Form, Icon, Input, Text, VerificationField } from "../index";

export interface VerificationProps {
  info: VerificationField;
  onSend: (value: string) => Promise<void> | void;
  onConfirm: (
    value: string,
    code: string,
    onSuccess: () => void
  ) => Promise<void> | void;
}

/**
 * PhoneVerification Component
 * @param {function} onSend
 * @param {function} onConfirm
 * @param {VerificationField} info
 * @constructor
 */
const Verification: ComponentType<VerificationProps> = ({
  onSend,
  onConfirm,
  info,
}: VerificationProps) => {
  const [time, setTime] = useState(info.timeoutSecond ?? 180);
  const [start, setStart] = useState(false);
  const [valid, setValid] = useState(false);

  const form = Form.useFormInstance();

  const sendField = Form.useWatch<string>(info.name, form);
  const code = Form.useWatch<string>("code", form);

  const handleSend = useCallback(async () => {
    if (
      !(
        info.sendFieldPattern ?? /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/
      ).test(sendField)
    ) {
      notification.error({
        message: "유효한 값이 아닙니다.",
      });
      return;
    }
    await onSend(sendField);
    setTime(info.timeoutSecond ?? 180);
    setStart(true);
  }, [onSend, sendField, info]);

  const handleVerify = useCallback(async () => {
    if (!code) {
      notification.warning({ message: "인증번호를 입력해주세요." });
      return;
    }
    await onConfirm(sendField, code, () => {
      setStart(false);
      setValid(true);
    });
  }, [code, onConfirm, sendField]);

  useEffect(() => {
    if (!start) return;
    if (time === 0) {
      notification.warning({ message: "유효기간이 만료되었습니다." });
      setStart(false);
      return;
    }
    const intervalId = setInterval(() => {
      setTime(time - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [time, start]);

  return (
    <Flex flexDir="column" gap={2}>
      <Flex justifyContent="space-between">
        <Text fontSize="sm">{info.label ?? "전화번호"}</Text>
        {start && (
          <Text color="warning" fontSize="sm">
            {dayjs.duration(time, "s").format("mm:ss")}
          </Text>
        )}
      </Flex>
      <Flex gap={2}>
        <Form.Item name={info.name} noStyle>
          <Input
            disabled={valid}
            onChange={() => setStart(false)}
            placeholder={info.sendFieldPlaceholder}
          />
        </Form.Item>
        <Button disabled={valid} onClick={handleSend} width="150px">
          <Center gap={1}>
            <Icon icon="MdVpnKey" />
            <Text>{start ? "재전송 " : "코드전송"}</Text>
          </Center>
        </Button>
      </Flex>
      <Flex gap={2} mb={4}>
        <Form.Item name="code" noStyle>
          <Input
            controls={false}
            disabled={!start}
            placeholder={info.codePlaceholder}
          />
        </Form.Item>
        <Button disabled={!start} onClick={handleVerify} width="150px">
          <Center gap={1}>
            <Icon icon="MdCheckCircleOutline" />
            <Text>인증하기</Text>
          </Center>
        </Button>
      </Flex>
    </Flex>
  );
};

export default Verification;

// import { addPropertyControls, ControlType } from "framer";
//
// addPropertyControls(Verification, {
//   info: {
//     type: ControlType.Object,
//     controls: {
//       label: {
//         type: ControlType.String,
//         defaultValue: "Label Here",
//       },
//       timeoutSecond: {
//         type: ControlType.Number,
//         defaultValue: 180,
//       },
//       name: {
//         type: ControlType.String,
//         defaultValue: "Name Here",
//       },
//       sendFieldPlaceholder: {
//         type: ControlType.String,
//         defaultValue: "Placeholder Here",
//       },
//       codePlaceholder: {
//         type: ControlType.String,
//         defaultValue: "Placeholder Here",
//       },
//     },
//     defaultValue: {
//       label: "Label Here",
//       sendFieldPlaceholder: "sendField PlaceHolder",
//       timeoutSecond: 180,
//       codePlaceholder: "code PlaceHolder",
//       name: "first",
//     },
//   },
// });
