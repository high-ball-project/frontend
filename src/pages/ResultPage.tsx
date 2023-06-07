import { Col, Row } from "@components/Element";
import Image from "@components/Image";
import useSearchSWR from "@hooks/useSearchSWR";
import { useParams } from "react-router-dom";

import { S3 } from "@/constants";

const ResultPage = () => {
  const { id } = useParams();

  const { data } = useSearchSWR("/clinical/" + id);

  return (
    <Row mt="80px">
      <Col span={24}>
        <Image preview={false} src={S3} />
      </Col>
    </Row>
  );
};

export default ResultPage;
