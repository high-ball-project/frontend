import { Box, Center, Flex } from "@chakra-ui/react";
import Button from "@components/Button";
import { Col, Row } from "@components/Element";
import Icon from "@components/Icon";
import Image from "@components/Image";
import { Form, Upload } from "antd";
import { useForm } from "antd/es/form/Form";
import { RcFile } from "antd/es/upload";
import { useCallback, useState } from "react";

const PredictPage = () => {
  const [preview, setPreview] = useState("");
  const [form] = useForm();

  const handleUpload = useCallback(async () => {
    console.log("업로드");
  }, []);

  return (
    <Row mt="80px" pt="20px">
      <Col span={24}>
        <Form form={form} onFinish={handleUpload}>
          <Flex flexDir="column">
            <Center flexDir="column" gap="16px" my="32px">
              <Form.Item name="image" noStyle>
                <Upload
                  className="avatar-uploader"
                  customRequest={() => {}}
                  name="avatar"
                  onChange={(e) => {
                    const reader = new FileReader();
                    reader.addEventListener("load", () => {
                      setPreview(reader.result as string);
                    });
                    reader.readAsDataURL(e.file.originFileObj as RcFile);
                  }}
                  showUploadList={false}
                >
                  {preview ? (
                    <Image
                      maxW="320px"
                      minW="320px"
                      preview={false}
                      src={preview}
                    />
                  ) : (
                    <Center
                      border="1px solid"
                      borderColor="mainText"
                      borderRadius="main"
                      h="320px"
                      px="16px"
                      w="320px"
                    >
                      <Icon icon="MdDriveFolderUpload" size="160px" />
                    </Center>
                  )}
                </Upload>
              </Form.Item>
              <Box fontSize="24px" fontWeight="bold">
                이미지를 등록하세요!
              </Box>
            </Center>
            <Center flexDir="column" gap="16px">
              <Button
                background="primary"
                color="white"
                fontSize="24px"
                fontWeight="bold"
                height="100%"
                maxWidth="360px"
                onClick={() => form.submit()}
                p="16px"
                width="100%"
              >
                분석 시작
              </Button>
              <Button
                background="secondary"
                color="white"
                fontSize="18px"
                fontWeight="bold"
                height="100%"
                maxWidth="360px"
                p="16px"
                width="100%"
              >
                최근 결과 보기
              </Button>
            </Center>
          </Flex>
        </Form>
      </Col>
    </Row>
  );
};

export default PredictPage;
