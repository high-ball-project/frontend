import { Center } from "@chakra-ui/react";
import Form from "@components/Form";
import Icon from "@components/Icon";
import { Upload } from "antd";
import { RcFile } from "antd/es/upload";
import { UploadFile } from "antd/es/upload/interface";
import { useCallback } from "react";

interface UploadFormProps {
  name: string;
}

export const UploadForm = ({ name }: UploadFormProps) => {
  const form = Form.useFormInstance();

  const onPreview = useCallback(async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as RcFile);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  }, []);

  return (
    <Form.Item
      noStyle
      shouldUpdate={(prevValues, currentValues) =>
        prevValues[name] !== currentValues[name]
      }
    >
      {() => (
        <Form.UploadItem name={name} style={{ width: "120px" }}>
          <Upload
            accept="image/*"
            beforeUpload={() => false}
            listType="picture-card"
            maxCount={1}
            onPreview={onPreview}
          >
            {!form.getFieldValue(name)?.length && (
              <Center flexDirection="column">
                <Icon icon="MdAdd" />
              </Center>
            )}
          </Upload>
        </Form.UploadItem>
      )}
    </Form.Item>
  );
};
