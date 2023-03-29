import { As, Box, chakra, ChakraComponent } from "@chakra-ui/react";
import { NamePath } from "antd/es/form/interface";
import {
  Form as _Form,
  FormItemProps,
  FormProps as _FormProps,
} from "antd/es/index";
import { FC, useEffect, useRef, useState } from "react";

import { SkeletonBox } from "../index";

interface __FormProps extends _FormProps {
  dependKey?: string[] | "all";
  finishingDisabled?: boolean;
  finishingClear?: boolean;
}

interface FormPropsA extends __FormProps {
  lazy: true;
  interactiveInitialValues?: false;
}

interface FormPropsB extends __FormProps {
  lazy?: false;
  interactiveInitialValues?: boolean;
}

type FormProps = FormPropsA | FormPropsB;

/**
 * Form 컴포넌트
 * lazy 속성이 true 이면 initialValues 의 값이 새롭게 갱신되면 값을 설정한다
 * dependKey 속성이 있으면 해당 key 의 값이 변경되면 submit 한다.
 * finishingDisabled 속성이 true 이면 onFinish 이벤트가 진행될 때 form이 disable 된다.
 *
 * @constructor
 */
const InternalForm = ({
  children,
  dependKey,
  lazy,
  initialValues,
  finishingDisabled,
  finishingClear,
  onFinish,
  form: _form,
  interactiveInitialValues,
  ...rest
}: FormProps) => {
  const [form] = _Form.useForm(_form);

  const [disabled, setDisabled] = useState(false);

  // ==================================================
  // lazy form 일 때만 작동
  // 리렌더링 불필요 하므로 ref 사용 lazy
  const lazyInitialRef = useRef(false);
  // lazy
  useEffect(() => {
    if (!lazy && !interactiveInitialValues) return;

    if (
      interactiveInitialValues ||
      (lazy && initialValues && !lazyInitialRef.current)
    ) {
      lazyInitialRef.current = true;
      form.setFieldsValue(initialValues);
    }
    // initialValues 가 바뀔 때만 감지
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValues]);
  // ==================================================

  return (
    <_Form
      disabled={disabled}
      form={form}
      initialValues={initialValues}
      onFinish={async (values) => {
        if (finishingDisabled) setDisabled(true);
        if (onFinish) await onFinish(values);
        if (finishingDisabled) setDisabled(false);
        if (finishingClear) form.resetFields();
      }}
      onValuesChange={(changedValues) => {
        // dependKey 가 있는 경우 auto submit 기능 활성
        if (dependKey) {
          // all 이면 모든 값이 바뀔 때마다 submit
          if (dependKey === "all") {
            form.submit();
            return;
          }

          // dependKey 에 포함된 값이 바뀔 때마다 submit
          for (const key in changedValues)
            if (dependKey.find((e) => e === key)) {
              form.submit();
              return;
            }
        }
      }}
      style={{ width: "100%" }}
      {...rest}
    >
      <>{children}</>
    </_Form>
  );
};

const FormItem: ChakraComponent<As, FormItemProps> = chakra<As, FormItemProps>(
  _Form.Item
);

interface SkeletonFormItemProps extends FormItemProps {
  // FormItemProps 은 name 이 null 일 수 있지만 SkeletonFormItem 은 절대 null 이면 안되니 재정의
  name: NamePath;
}

/**
 * Form.Item의 값이 로딩 되지 않으면 Skeleton 렌더링
 * @param {React.ReactNode} children
 * @param {string} name 의존할 key
 * @param {SkeletonFormItemProps} rest
 * @constructor
 */
const SkeletonItem = ({ children, name, ...rest }: SkeletonFormItemProps) => {
  return (
    <Form.Item noStyle shouldUpdate>
      {(form) => {
        const value = form.getFieldValue(name);
        return (
          <Form.Item {...rest} name={name}>
            {value === undefined ? <SkeletonBox h="32px" /> : children}
          </Form.Item>
        );
      }}
    </Form.Item>
  );
};

export const FormText = chakra(({ ...rest }) => (
  <Box w="200px" {...rest}>
    {rest.value}
  </Box>
));

interface UploadFormItemProps extends FormItemProps {
  multiple?: boolean;
}

const normFile = (e: any) => {
  return Array.isArray(e) ? e : e?.fileList;
};

const UploadItem = ({ children, ...rest }: UploadFormItemProps) => (
  <Form.Item getValueFromEvent={normFile} valuePropName="fileList" {...rest}>
    {children}
  </Form.Item>
);

const CheckItem = ({ children, ...rest }: UploadFormItemProps) => (
  <Form.Item
    getValueProps={(value) => ({
      checked: value === "1",
    })}
    normalize={(value) => (value ? "1" : "0")}
    valuePropName="checked"
    {...rest}
  >
    {children}
  </Form.Item>
);

const Form = InternalForm as FC<FormProps> & {
  useForm: typeof _Form.useForm;
  useFormInstance: typeof _Form.useFormInstance;
  useWatch: typeof _Form.useWatch;
  Item: typeof FormItem;
  List: typeof _Form.List;
  ErrorList: typeof _Form.ErrorList;
  Provider: typeof _Form.Provider;
  SkeletonItem: typeof SkeletonItem;
  UploadItem: typeof UploadItem;
  CheckItem: typeof CheckItem;
  Text: typeof FormText;
};

Form.useForm = _Form.useForm;
Form.useFormInstance = _Form.useFormInstance;
Form.useWatch = _Form.useWatch;
Form.Item = FormItem;
Form.CheckItem = CheckItem;
Form.UploadItem = UploadItem;
Form.SkeletonItem = SkeletonItem;
Form.Text = FormText;
Form.List = _Form.List;
Form.ErrorList = _Form.ErrorList;
Form.Provider = _Form.Provider;

export default Form;
