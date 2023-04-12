import { Box, Center } from "@chakra-ui/react";
import { Col, Row } from "@components/Element";
import Icon from "@components/Icon";
import Link from "@components/Link";
import Text from "@components/Text";

const IndexPage = () => {
  return (
    <Row>
      <Col span={24}>
        <Center data-aos="fade-right" gap={10} my="400px">
          <Box>
            <Icon icon="MdMotionPhotosAuto" size="50%" />
          </Box>
          <Text fontSize="3xl">Ai를 통해 유방암 조직을 분석합니다.</Text>
        </Center>
      </Col>
      <Col span={24}>
        <Center data-aos="fade-left" gap={10} my="400px">
          <Text fontSize="3xl">
            분석 결과를 통해 임파선 전이 여부를 예측합니다.
          </Text>
          <Box>
            <Icon icon="MdMotionPhotosPaused" size="50%" />
          </Box>
        </Center>
      </Col>
      <Col span={24}>
        <Center flexDir="column" my="200px">
          <Text
            color="black"
            data-aos="fade-right"
            fontSize="4xl"
            mb="300px"
            strong
          >
            의료 전문가를 보조하는 최신 기술을 사용해보세요.
          </Text>
          <Link to="/predict">
            <Text color="primary" data-aos="fade-left" fontSize="4xl" strong>
              시작하기
            </Text>
          </Link>
        </Center>
      </Col>
    </Row>
  );
};

export default IndexPage;
