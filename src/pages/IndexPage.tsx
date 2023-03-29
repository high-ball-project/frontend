import {
  Box,
  Center,
  Flex,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import Button from "@components/Button";
import CardList from "@components/CardList";
import Carousel from "@components/Carousel";
import CategoryMenu from "@components/CategoryMenu";
import ContentHeader from "@components/ContentHeader";
import ContentMenuHeader from "@components/ContentMenuHeader";
import Editor from "@components/Editor";
import {
  Br,
  Col,
  DatePicker,
  Input,
  Row,
  Tabs,
  Upload,
} from "@components/Element";
import Form from "@components/Form";
import Link from "@components/Link";
import Select from "@components/Select";
import SkeletonBox from "@components/SkeletonBox";
import Text from "@components/Text";
import VideoPlayer from "@components/VideoPlayer";
import { Modal } from "antd";
import { useRef } from "react";

import devfiveIcon from "/devfiveicon.svg";

function IndexPage() {
  const { toggleColorMode, colorMode } = useColorMode();
  const color = useColorModeValue("blue.500", "red.200");

  const dangerRef = useRef(null);

  return (
    <>
      <Row>
        <Col span={24}>
          <Carousel
            autoplay
            color="mainText"
            controller
            // controllerRender={(
            //   current,
            //   total,
            //   prev,
            //   next,
            //   autoPlay,
            //   toggleAutoPlay,
            //   showAll
            // ) => (
            //   <Center
            //     bg="primary"
            //     bottom={0}
            //     p={7}
            //     position="absolute"
            //     right={0}
            //   >
            //     {current + " / " + total}
            //     <Box onClick={() => prev()}>왼쪽</Box>
            //     <Box onClick={() => next()}>오른쪽</Box>
            //     <Box onClick={() => toggleAutoPlay(!autoPlay)}>
            //       {autoPlay.toString()}
            //     </Box>
            //     <Box onClick={() => showAll()}>dd</Box>
            //   </Center>
            // )}
            data={[
              {
                src:
                  (process.env.VITE_TEST_IMG_URL ||
                    process.env.NEXT_PUBLIC_IMG_URL) +
                  "/id/868/1920/300.jpg?hmac=JsR2DdPBci44uleLnxtRybpjAWvgkjiYE9vg2rFo_bk",
                link: "/",
                title: "테스트",
              },
              {
                src:
                  (process.env.VITE_TEST_IMG_URL ||
                    process.env.NEXT_PUBLIC_IMG_URL) +
                  "/id/856/1920/300.jpg?hmac=8RGVOy7wEr-xkXU1XAVQvs6eVRJ7DjbsaZXOLr2hxCY",
                link: "/",
                title: "테스트",
              },
              {
                src:
                  (process.env.VITE_TEST_IMG_URL ||
                    process.env.NEXT_PUBLIC_IMG_URL) +
                  "/id/95/1920/300.jpg?hmac=Km74hJ4nSWMsIKozDysSufaTs6MsOula-K_tbfoYPQU",
                link: "/",
                title: "테스트",
              },
            ]}
            height={["200px", "300px", "400px"]}
            isLoading={false}
            showAll
            showAutoplayToggle
          />
        </Col>
      </Row>
      <Row gutter={3}>
        <Col span={24}>
          <Center>
            <Text fontSize="5xl">데브파이브 프론트 시스템</Text>
          </Center>
          <Center mb={4}>
            <Text>텍스트는 xs, sm, md, lg, xl, xxl 등으로 이루어집니다</Text>
          </Center>
        </Col>
        <Col span={24}>
          <ContentMenuHeader
            menus={[
              {
                label: "메뉴 1",
              },
              {
                label: "메뉴 2",
                danger: true,
              },
            ]}
            title="콘텐츠 메뉴 헤더"
            type="responsive"
          />
        </Col>
        <Col
          span={12}
          sx={{
            color: "red",
          }}
        >
          <Flex
            cursor="pointer"
            flexDirection="column"
            gap={["20px", "40px", "50px"]}
          >
            <SkeletonBox h="100px" w="100px">
              스켈레톤
            </SkeletonBox>
            <Text fontSize="xx-large">텍스트</Text>
            <Text
              fontSize="xx-large"
              onClick={() =>
                Modal.success({
                  content: (
                    <>
                      <Box mb={4}>차크라 마진 테스트</Box>
                      아래
                      <DatePicker />
                    </>
                  ),
                })
              }
              type="success"
            >
              모달
            </Text>
          </Flex>
        </Col>
        <Col
          span={{
            base: 24,
            lg: 12,
          }}
        >
          <Text color="error">
            type danger 같은게 힘들고 secondary 같은걸 바로 접근하려면 `color`
            props에서 색을 바로 넣어보세요
          </Text>
          <br />
          <Text>
            Col은 총 24개의 칼럼입니다. 좌 우의 span이 12, 12임으로 50%씩
            채워지겠죠?
          </Text>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <CategoryMenu
            menus={[
              {
                title: "홈",
                icon: "MdHome",
                tooltip: "툴팁 테스트 1",
                key: 1,
              },
              {
                title: "리스트",
                icon: "MdList",
                key: 2,
              },
              {
                title: "QNA",
                icon: "MdQuiz",
                tooltip: "툴팁 테스트 3",
                key: 3,
              },
              {
                title: "공지사항",
                icon: "MdNotifications",
                key: 4,
              },
              {
                title: "문의하기",
                icon: "MdHelp",
                key: 5,
              },
            ]}
            multiple
            onChange={(v) => console.info(v)}
            onSelect={(v, i) => console.info(v, i)}
            title="자주찾는 메뉴"
          />
        </Col>
        <Col span={24}>
          <Input.Search mt={4} />
          <DatePicker w="100%" />
          <Box height="32px" />
          <ContentHeader title="카드리스트" url="/" />
          <CardList
            data={[
              {
                title: "test",
                src:
                  (process.env.VITE_TEST_IMG_URL ||
                    process.env.NEXT_PUBLIC_IMG_URL) +
                  "/id/910/600/600.jpg?hmac=Zp8Nn8Qu1cNWtaS8s7cmehOAFEqWEFMLnkU2-5WAHmk",
                subTitle: "서브 텍스트입니다.",
                rightSubText: "2000.00.00",
                writerProfile: devfiveIcon,
                leftSubText: "카테고리",
                to: "http://localhost:8000",
              },
              {
                to: "https://localhost:3000",
                title: "test",
                src:
                  (process.env.VITE_TEST_IMG_URL ||
                    process.env.NEXT_PUBLIC_IMG_URL) +
                  "/id/668/600/600.jpg?hmac=O56NInO155VoVXS-3AJpMqYsOUKP2ySgxBhj4TG0BeI",
                leftSubText: "카테고리",
                subTitle: "서브 텍스트입니다.",
                writerProfile: devfiveIcon,
              },
              {
                title: "test",
                src:
                  (process.env.VITE_TEST_IMG_URL ||
                    process.env.NEXT_PUBLIC_IMG_URL) +
                  "/id/973/600/600.jpg?hmac=rAwBeFfcx_1_w1QhUqciqL1FR7KbhmbAz2lDPXU67QQ",
                subTitle: "서브 텍스트입니다.",
                to: "https://localhost:3000",
                writerProfile: devfiveIcon,
              },
              {
                title: "test",
                src:
                  (process.env.VITE_TEST_IMG_URL ||
                    process.env.NEXT_PUBLIC_IMG_URL) +
                  "/id/809/600/600.jpg?hmac=oPfbXc9yNs4FPtUomYB31mZVdQQLNuxYyBK834O0M18",
                subTitle: "서브 텍스트입니다.",
                to: "https://localhost:3000",
                leftSubText: "카테고리",
              },
              {
                title: "test",
                src:
                  (process.env.VITE_TEST_IMG_URL ||
                    process.env.NEXT_PUBLIC_IMG_URL) +
                  "/id/117/600/600.jpg?hmac=4rvSTVJTX5zXpivyGUXrLFp5b6tWMjs07OhHDbEAipU",
                subTitle: "서브 텍스트입니다.",
                to: "https://localhost:3000",
              },
              {
                to: "https://localhost:3000",
                title: "test",
                src:
                  (process.env.VITE_TEST_IMG_URL ||
                    process.env.NEXT_PUBLIC_IMG_URL) +
                  "/id/315/600/600.jpg?hmac=D4AjaTe7M0t_KzbCBk7zp43mHlPJ7fdsVh4RA5-pzV0",
                leftSubText: "카테고리",
                subTitle: "서브 텍스트입니다.",
                writerProfile: devfiveIcon,
              },
              {
                title: "test",
                src:
                  (process.env.VITE_TEST_IMG_URL ||
                    process.env.NEXT_PUBLIC_IMG_URL) +
                  "/id/612/600/600.jpg?hmac=OOkE5Q9AbaUpjesuVwaU6diL0WTpH5UC-vUwZNA0uT8",
                subTitle: "서브 텍스트입니다.",
                to: "https://localhost:3000",
                writerProfile: devfiveIcon,
              },
              {
                title: "test",
                src:
                  (process.env.VITE_TEST_IMG_URL ||
                    process.env.NEXT_PUBLIC_IMG_URL) +
                  "/id/679/600/600.jpg?hmac=DVfplgioCccJZC1SmZ3WsKHR_zNpz_hRdmhF8tfpKO0",
                subTitle: "서브 텍스트입니다.",
                to: "https://localhost:3000",
                leftSubText: "카테고리",
              },
              {
                title: "test",
                src:
                  (process.env.VITE_TEST_IMG_URL ||
                    process.env.NEXT_PUBLIC_IMG_URL) +
                  "/id/135/600/600.jpg?hmac=zc1gYrXLNKWsOehevhy77ljmz-BGxsYCuJ6biWtKoDE",
                subTitle: "서브 텍스트입니다.",
                to: "https://localhost:3000",
              },
              {
                to: "https://localhost:3000",
                title: "test",
                src:
                  (process.env.VITE_TEST_IMG_URL ||
                    process.env.NEXT_PUBLIC_IMG_URL) +
                  "/id/331/600/600.jpg?hmac=nYk7zP3ftmOJgqkNT5-f7GeJ2x6FftY0cLyM02pknW4",
                leftSubText: "카테고리",
                subTitle: "서브 텍스트입니다.",
                writerProfile: devfiveIcon,
              },
              {
                title: "test",
                src:
                  (process.env.VITE_TEST_IMG_URL ||
                    process.env.NEXT_PUBLIC_IMG_URL) +
                  "/id/1014/600/600.jpg?hmac=B8s9k5dHO4Uij1dwCxTOhC3BRc6eFQUG8CxvIkYXFks",
                subTitle: "서브 텍스트입니다.",
                to: "https://localhost:3000",
                writerProfile: devfiveIcon,
              },
              {
                title: "test",
                src:
                  (process.env.VITE_TEST_IMG_URL ||
                    process.env.NEXT_PUBLIC_IMG_URL) +
                  "/id/639/600/600.jpg?hmac=MIiW-nbHPB85Gj-HGVTV6CY2nkuUSWEguw8GR8V2JM4",
                subTitle: "서브 텍스트입니다.",
                to: "https://localhost:3000",
                leftSubText: "카테고리",
              },
              {
                title: "test",
                src:
                  (process.env.VITE_TEST_IMG_URL ||
                    process.env.NEXT_PUBLIC_IMG_URL) +
                  "/id/905/600/600.jpg?hmac=DvIKicBZ45DEZoZFwdZ62VbmaCwkK4Sv7rwYzUvwweU",
                subTitle: "서브 텍스트입니다.",
                to: "https://localhost:3000",
              },
            ]}
            numCol={[1, 2, 4]}
            type="grid"
          />
        </Col>
        <Col span={24}>
          <Text>버튼</Text>
        </Col>
        <Col span={24}>
          <Box color={color}>hello</Box>
          <Button
            icon="MdTrackChanges"
            onClick={toggleColorMode}
            type="primary"
          >
            프라이머리 버튼(테마를 바꿈) 현재 {colorMode}
          </Button>
          <br />
          <Button ref={dangerRef} danger type="primary">
            danger
          </Button>
          <br />
          <Button icon="MdAdd" shape="circle" type="dashed" />
        </Col>
        <Col span={24}>
          <Text strong type="warning">
            일부 버튼은 다크모드를 지원하지 않습니다.
          </Text>
        </Col>
        <Col span={24}>
          <Link to="https://google.com">구글</Link>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Text>Space</Text>
          <Tabs
            items={[
              {
                key: "hello1",
                label: "hello1",
              },
              {
                key: "hello2",
                label: "hello2",
              },
            ]}
          />
        </Col>
        <Col span={24}>
          <Box p={1}>
            <Text>놀랍게도 패딩 1은 4px 입니다.</Text>
          </Box>
          <Box p={2}>
            <Text type="danger">패딩 2는 8px, 즉 4의 배수입니다.</Text>
          </Box>
        </Col>
      </Row>
      <Row>
        <Form
          dependKey="all"
          finishingDisabled
          onFinish={async (values) => {
            console.info(values);
            await new Promise((resolve) => setTimeout(resolve, 10000));
          }}
        >
          <Form.UploadItem name="file">
            <Upload beforeUpload={() => false}>파일 업로드</Upload>
          </Form.UploadItem>
          <Input.Group w="100%">
            <Form.Item name="hello" noStyle>
              <Input placeholder="텍스트 입력" />
            </Form.Item>
            <Button type="primary">제출</Button>
          </Input.Group>
          <Button htmlType="submit">auto submit, and disabled</Button>
        </Form>
      </Row>
      <Row>
        <Col span={24}>
          <Input
            bg="primary"
            height="80px"
            placeholder="Input도 Props로 css를 수정할 수 있습니다."
            width="100%"
          />
          <Select
            defaultValue={1}
            options={[
              {
                value: 1,
                label: "SELECT 는 설정이 불가능합니다",
              },
            ]}
            width="100%"
          />
        </Col>
      </Row>
      {/*  gutter 는 Col 사이를 떨어뜨립니다. */}
      <Row gutter={[0, 16]}>
        <Col md={24} xs={12}>
          <Editor
            defaultValue="이 에디터는 폭이 700px 이하일 때 span이 12가 됩니다. xs(x small)로 조절했기 때문이죠"
            fonts={[
              {
                fontFamily: "궁서체",
                title: "Gungsuh",
              },
            ]}
            h="500px"
            onUpload={async () => {
              return "https://picsum.photos//id/905/600/600.jpg?hmac=DvIKicBZ45DEZoZFwdZ62VbmaCwkK4Sv7rwYzUvwweU";
            }}
          />
        </Col>
        <Col span={24}>
          <Flex border="solid red 1px" flexDirection="column">
            <Text type="success">지금 까지 hover 하기 귀찮으셨죠?</Text>
            <Text code type="success">
              sx를 쓰면 됩니다. 없는 style은 sx로!
            </Text>
            <Text
              code
              sx={{
                color: "info",
              }}
            >
              더 이상 styled 는 never... <br />
              color는 theme안에 정의된 색으로 써주세요.
            </Text>
            <Box
              _hover={{
                bg: "blue",
              }}
              height="100px"
              width="100px"
            >
              <Text
                sx={{
                  color: "yellow",
                  cursor: "pointer",
                }}
              >
                마우스를 올려보세요!
              </Text>
            </Box>
          </Flex>
        </Col>
        <Col span={24}>
          <VideoPlayer
            controls={false}
            full
            loop
            muted
            opacity={0.5}
            playing
            url="https://www.youtube.com/watch?v=b1fTnxiMRwQ"
            width="100%"
          />
          <Box p={1}>
            <Text type="warning">
              VideoPlayer는 기본적으로 부모의 넓이와 높이를 계승합니다. width,
              height로 크기 설정이 가능합니다 :)
              <Br />
              화면을 가득 채우고 싶다면 full 속성을 이용하세요
            </Text>
          </Box>
        </Col>
      </Row>
    </>
  );
}

export default IndexPage;
