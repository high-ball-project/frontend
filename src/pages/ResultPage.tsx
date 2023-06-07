import { Center } from "@chakra-ui/react";
import Button from "@components/Button";
import { Col, Row } from "@components/Element";
import Image from "@components/Image";
import Link from "@components/Link";
import Text from "@components/Text";
import useSearchSWR from "@hooks/useSearchSWR";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";

import { S3 } from "@/constants";

const TextContent = ({ title, text }: { title: string; text: string }) => (
  <Center gap={2}>
    <Text strong>{title} :</Text>
    <Text>{text}</Text>
  </Center>
);

const ResultPage = () => {
  const { id } = useParams();

  const { data } = useSearchSWR("/clinical/" + id);

  const clinic = data?.[0];

  return (
    <Row mt="80px">
      <Col span={24}>
        <Center my={2} w="100%">
          <Image preview={false} src={S3 + clinic?.img_path} />
        </Center>
      </Col>
      <Col span={12}>
        <TextContent text={clinic?.["나이"]} title="나이" />
      </Col>
      <Col span={12}>
        <TextContent
          text={dayjs(clinic?.["수술연월일"]).format("YYYY-MM-DD")}
          title="수술일"
        />
      </Col>
      <Col span={12}>
        <TextContent text={clinic?.["진단명"]} title="진단명" />
      </Col>
      <Col span={12}>
        <TextContent
          text={
            ["오른쪽", "왼쪽", "양쪽"][parseInt("" + clinic?.["암의 위치"]) - 1]
          }
          title="암의 위치"
        />
      </Col>
      <Col span={12}>
        <TextContent
          text={
            ["single", "multiple"][parseInt("" + clinic?.["암의 개수"]) - 1]
          }
          title="암의 개수"
        />
      </Col>
      <Col span={12}>
        <TextContent text={clinic?.["암의 장경"] + "mm"} title="암의 장경" />
      </Col>
      <Col span={12}>
        <TextContent text={"NG" + clinic?.NG} title="NG" />
      </Col>
      <Col span={12}>
        <TextContent
          text={clinic?.HG === "4" ? "not graded" : "HG" + clinic?.HG}
          title="HG"
        />
      </Col>
      <Col span={12}>
        <TextContent
          text={
            clinic?.HG_score_1 === "4"
              ? "not graded"
              : "score " + clinic?.HG_score_1
          }
          title="HG Score 1"
        />
      </Col>
      <Col span={12}>
        <TextContent
          text={
            clinic?.HG_score_2 === "4"
              ? "not graded"
              : "score " + clinic?.HG_score_2
          }
          title="HG Score 2"
        />
      </Col>
      <Col span={12}>
        <TextContent
          text={
            clinic?.HG_score_3 === "4"
              ? "not graded"
              : "score " + clinic?.HG_score_3
          }
          title="HG Score 3"
        />
      </Col>
      <Col span={12}>
        <TextContent
          text={
            [
              "no DCLS/LCIS",
              "DCIS/LCIS present, ELC(-)",
              "DCIS/LCIS present, ELC(+)",
            ][parseInt("" + clinic?.["DCIS_or_LCIS_여부"]) - 1]
          }
          title="DCLS/LCIS 여부"
        />
      </Col>
      <Col span={12}>
        <TextContent
          text={
            ["non-comedo", "comedo"][
              parseInt("" + clinic?.["DCIS_or_LCIS_type"]) - 1
            ]
          }
          title="DCLS/LCIS 타입"
        />
      </Col>
      <Col span={12}>
        <TextContent
          text={
            ["Tis", "T1", "T2", "T3", "T4"][
              parseInt("" + clinic?.["T_category"])
            ]
          }
          title="T 카테고리"
        />
      </Col>
      <Col span={12}>
        <TextContent
          text={["-", "+"][parseInt("" + clinic?.["ER"])]}
          title="ER"
        />
      </Col>
      <Col span={12}>
        <TextContent
          text={clinic?.["ER_Allred_score"]}
          title="ER_Allred_score"
        />
      </Col>
      <Col span={12}>
        <TextContent
          text={["-", "+"][parseInt("" + clinic?.["PR"])]}
          title="PR"
        />
      </Col>
      <Col span={12}>
        <TextContent
          text={clinic?.["PR_Allred_score"]}
          title="PR_Allred_score"
        />
      </Col>
      <Col span={12}>
        <TextContent
          text={clinic?.["KI-67_LI_percent"]}
          title="KI-67_LI_percent"
        />
      </Col>
      <Col span={12}>
        <TextContent
          text={["-", "+"][parseInt("" + clinic?.["HER2"])]}
          title="HER2"
        />
      </Col>
      <Col span={12}>
        <TextContent
          text={
            ["Negative(0)", "Negative(1+)", "Equivocal(2+)", "Positive(3+)"][
              parseInt("" + clinic?.["HER2_IHC"])
            ]
          }
          title="HER2_IHC"
        />
      </Col>
      <Col span={12}>
        <TextContent
          text={
            ["not amplified(negative)", "amplified(positive)"][
              parseInt("" + clinic?.["HER2_SISH"])
            ]
          }
          title="HER2_SISH"
        />
      </Col>
      <Col span={12}>
        <TextContent
          text={clinic?.["HER2_SISH_ratio"]}
          title="HER2_SISH_ratio"
        />
      </Col>
      <Col span={12}>
        <TextContent
          text={
            ["No BRCA1, BRCA2 mutation", "BRCA1 mutation", "BRCA2 mutation"][
              parseInt("" + clinic?.["BRCA_mutation"])
            ]
          }
          title="BRCA_mutation"
        />
      </Col>
      <Col span={24}>
        <Center gap={2} my={2}>
          <Text fontSize="lg" strong>
            결과 :
          </Text>
          <Text fontSize="lg">
            {["양성", "음성"][parseInt("" + clinic?.["N_category"])]}
          </Text>
        </Center>
      </Col>
      <Col span={24}>
        <Center flexDir="column" gap={2} my={2}>
          <Link to={"/write?clinicalId=" + id}>
            <Button>해당 결과로 게시글 작성하기</Button>
          </Link>
          <Link to="/">
            <Button>메인으로 돌아가기</Button>
          </Link>
        </Center>
      </Col>
    </Row>
  );
};

export default ResultPage;
