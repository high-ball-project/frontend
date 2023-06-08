import { Center, Flex } from "@chakra-ui/react";
import Button from "@components/Button";
import ContentHeader from "@components/ContentHeader";
import { Col, DatePicker, Row } from "@components/Element";
import Select from "@components/Select";
import Text from "@components/Text";
import { UploadForm } from "@components/UploadForm";
import { Form, InputNumber, notification } from "antd";
import { useForm } from "antd/es/form/Form";
import axios from "axios";
import dayjs from "dayjs";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

const PredictPage = () => {
  const [form] = useForm();

  const navigate = useNavigate();

  const loadData = useCallback(async () => {
    const data = localStorage.getItem("current");
    if (!data) return;
    const parseData = JSON.parse(data);
    form.setFieldsValue({
      ...parseData,
      ["수술연월일"]: dayjs(parseData["수술연월일"]),
    });
  }, []);

  const handleUpload = useCallback(
    async (v: any) => {
      localStorage.setItem("current", JSON.stringify(v));
      if (!v.img_path.length) {
        notification.error({ message: "이미지를 등록해주세요!" });
        return;
      }

      try {
        const formData = new FormData();

        formData.append("file", v.img_path[0].originFileObj);
        const { data: imgData } = await axios.post("/s3/imgupload", formData);

        const value = {
          ...v,
          img_path: imgData,
          수술연월일: v["수술연월일"].toISOString(),
        };

        // const { data } = await axios.post<{
        //   img_path: string;
        //   result: boolean;
        // }>("http://localhost:8883/asd", value);

        const { data: uploadData } = await axios.post("/db/upload", {
          ...value,
          N_category: 1,
        });

        navigate("/result/" + uploadData);
      } catch (e) {
        notification.error({ message: "오류가 발생했습니다." });
      }
    },
    [navigate]
  );

  return (
    <Form form={form} layout="vertical" onFinish={handleUpload}>
      <Row
        border="1px solid"
        borderColor="border"
        borderRadius="main"
        gutter={[8, 8]}
        mb={4}
        mt="80px"
        pt="20px"
        px={4}
      >
        <Col span={24}>
          <ContentHeader rightTitle="" title="임파선 전이 예측" />
        </Col>
        <Col span={24}>
          <Flex flexDir="column" my="32px">
            <Text fontSize="md">이미지 업로드</Text>
            <UploadForm name="img_path" />
          </Flex>
        </Col>
        <Col span={12}>
          <Form.Item label="나이" name="나이" rules={[{ required: true }]}>
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="수술일"
            name="수술연월일"
            rules={[{ required: true }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="진단명" name="진단명" rules={[{ required: true }]}>
            <Select
              options={[
                { value: 1, label: "ductal" },
                { value: 2, label: "lobular" },
                { value: 3, label: "mucinous" },
                { value: 4, label: "other" },
              ]}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="암의 위치"
            name="암의 위치"
            rules={[{ required: true }]}
          >
            <Select
              options={[
                { value: 1, label: "오른쪽" },
                { value: 2, label: "왼쪽" },
                { value: 3, label: "양쪽" },
              ]}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="암의 개수"
            name="암의 개수"
            rules={[{ required: true }]}
          >
            <Select
              options={[
                { value: 1, label: "single" },
                { value: 2, label: "multiple" },
              ]}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="암의 장경(mm)"
            name="암의 장경"
            rules={[{ required: true }]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="NG" name="NG" rules={[{ required: true }]}>
            <Select
              options={[
                { value: 1, label: "NG1" },
                { value: 2, label: "NG2" },
                { value: 3, label: "NG3" },
              ]}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="HG" name="HG" rules={[{ required: true }]}>
            <Select
              options={[
                { value: 1, label: "HG1" },
                { value: 2, label: "HG2" },
                { value: 3, label: "HG3" },
                { value: 4, label: "not graded" },
              ]}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="HG Score 1"
            name="HG_score_1"
            rules={[{ required: true }]}
          >
            <Select
              options={[
                { value: 1, label: "score 1" },
                { value: 2, label: "score 2" },
                { value: 3, label: "score 3" },
                { value: 4, label: "not graded" },
              ]}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="HG Score 2"
            name="HG_score_2"
            rules={[{ required: true }]}
          >
            <Select
              options={[
                { value: 1, label: "score 1" },
                { value: 2, label: "score 2" },
                { value: 3, label: "score 3" },
                { value: 4, label: "not graded" },
              ]}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="HG Score 3"
            name="HG_score_3"
            rules={[{ required: true }]}
          >
            <Select
              options={[
                { value: 1, label: "score 1" },
                { value: 2, label: "score 2" },
                { value: 3, label: "score 3" },
                { value: 4, label: "not graded" },
              ]}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="DCLS/LCIS 여부"
            name="DCIS_or_LCIS_여부"
            rules={[{ required: true }]}
          >
            <Select
              options={[
                { value: 1, label: "no DCLS/LCIS" },
                { value: 2, label: "DCIS/LCIS present, ELC(-)" },
                { value: 3, label: "DCIS/LCIS present, ELC(+)" },
              ]}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="DCLS/LCIS 타입"
            name="DCIS_or_LCIS_type"
            rules={[{ required: true }]}
          >
            <Select
              options={[
                { value: 1, label: "non-comedo" },
                { value: 2, label: "comedo" },
              ]}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="T 카테고리"
            name="T_category"
            rules={[{ required: true }]}
          >
            <Select
              options={[
                { value: 0, label: "Tis" },
                { value: 1, label: "T1" },
                { value: 2, label: "T2" },
                { value: 3, label: "T3" },
                { value: 4, label: "T4" },
              ]}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="ER" name="ER" rules={[{ required: true }]}>
            <Select
              options={[
                { value: 0, label: "-" },
                { value: 1, label: "+" },
              ]}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="ER_Allred_score(0 ~ 8)"
            name="ER_Allred_score"
            rules={[{ required: true }]}
          >
            <InputNumber
              defaultValue={0}
              max={8}
              min={0}
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="PR" name="PR" rules={[{ required: true }]}>
            <Select
              options={[
                { value: 0, label: "-" },
                { value: 1, label: "+" },
              ]}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="PR_Allred_score(0 ~ 8)"
            name="PR_Allred_score"
            rules={[{ required: true }]}
          >
            <InputNumber
              defaultValue={0}
              max={8}
              min={0}
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="KI-67_LI_percent(0 ~ 100)"
            name="KI-67_LI_percent"
            rules={[{ required: true }]}
          >
            <InputNumber
              defaultValue={0}
              max={100}
              min={0}
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="HER2" name="HER2" rules={[{ required: true }]}>
            <Select
              options={[
                { value: 0, label: "-" },
                { value: 1, label: "+" },
              ]}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="HER2_IHC"
            name="HER2_IHC"
            rules={[{ required: true }]}
          >
            <Select
              options={[
                { value: 0, label: "Negative(0)" },
                { value: 1, label: "Negative(1+)" },
                { value: 2, label: "Equivocal(2+)" },
                { value: 3, label: "Positive(3+)" },
              ]}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="HER2_SISH"
            name="HER2_SISH"
            rules={[{ required: true }]}
          >
            <Select
              options={[
                { value: 0, label: "not amplified(negative)" },
                { value: 1, label: "amplified(positive)" },
              ]}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="HER2_SISH_ratio(소수 첫째점 까지)"
            name="HER2_SISH_ratio"
            rules={[{ required: true }]}
          >
            <InputNumber
              defaultValue={0}
              step={0.1}
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="BRCA_mutation"
            name="BRCA_mutation"
            rules={[{ required: true }]}
          >
            <Select
              options={[
                { value: 0, label: "No BRCA1, BRCA2 mutation" },
                { value: 1, label: "BRCA1 mutation" },
                { value: 2, label: "BRCA2 mutation" },
              ]}
            />
          </Form.Item>
        </Col>
        <Col span={24}>
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
              onClick={loadData}
              p="16px"
              width="100%"
            >
              최근 데이터 불러오기
            </Button>
          </Center>
        </Col>
      </Row>
    </Form>
  );
};

export default PredictPage;
