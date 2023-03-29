import { Flex } from "@chakra-ui/react";
import ContentMenuHeader from "@components/ContentMenuHeader";
import Editor from "@components/Editor";
import Form from "@components/Form";
import FormField from "@components/FormField";
import { useCallback, useState } from "react";
import { useSearchParam } from "react-use";

export interface WriteFormProps {
  writeTitle?: string;
  modifyTitle?: string;
  onWrite: (
    v: Record<"content" | "title" | "category", any>,
    modify?: boolean
  ) => void;
  initValue?: Record<"content" | "title" | "category", any>;
}

const WriteForm = ({
  writeTitle = "게시글 작성하기",
  modifyTitle = "게시글 수정하기",
  onWrite,
  initValue,
}: WriteFormProps) => {
  const mode = useSearchParam("mode");
  const [form] = Form.useForm();
  const [content, setContent] = useState(
    mode && initValue ? initValue.content : ""
  );

  const handleWrite = useCallback(
    ({ category, title }: any) => {
      if (!content) return;
      onWrite({ category, title, content }, !!mode);
    },
    [mode, onWrite, content]
  );

  return (
    <Form
      finishingDisabled
      form={form}
      initialValues={mode ? initValue : undefined}
      onFinish={handleWrite}
    >
      <ContentMenuHeader
        data-testid="header"
        menus={[
          {
            label: !!mode ? modifyTitle : writeTitle,
            icon: "MdBorderColor",
            onClick: () => form.submit(),
          },
        ]}
        title="글 작성하기"
      />
      <Flex flexDir="column" p={3}>
        <FormField
          fields={[
            {
              type: "select",
              name: "category",
              label: "",
              rule: [{ required: true, message: "카테고리를 선택해주세요." }],
              options: [
                { label: "카테고리 1", value: 0, key: 0 },
                { label: "카테고리 2", value: 1, key: 1 },
              ],
            },
            {
              type: "input",
              name: "title",
              rule: [{ required: true, message: "제목을 입력해주세요." }],
              label: "",
              placeholder: "제목을 입력해주세요.",
            },
          ]}
          onSuccess={() => {}}
        />
        <Editor data-testid="editor" h="300px" mb={10} onChange={setContent} />
      </Flex>
    </Form>
  );
};

export default WriteForm;
