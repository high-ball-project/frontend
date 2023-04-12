import { Center, Flex } from "@chakra-ui/react";
import CardList from "@components/CardList";
import ContentMenuHeader from "@components/ContentMenuHeader";
import { Col, Container, Input, Row } from "@components/Element";
import Icon from "@components/Icon";
import Text from "@components/Text";
import useApiPagination from "@hooks/useApiPagination";

const BoardPage = () => {
  // eslint-disable-next-line no-unused-vars
  const [current, setCurrent, pageSize, setPageSize, search, setSearch] =
    useApiPagination({
      initialSearchParams: {
        current: "1",
        pageSize: "20",
        orderBy: "createAt:desc",
      },
    });

  return (
    <Container mt="80px" pt="20px">
      <Row>
        <Col span={24}>
          <Flex justifyContent="end">
            <Input.Search w={["100%", null, "30%"]} />
          </Flex>
        </Col>
        <Col span={24}>
          <ContentMenuHeader
            menus={[
              {
                label: (
                  <Center>
                    <Text>최신순</Text>
                    <Icon
                      icon={
                        search.orderBy === "createAt:desc"
                          ? "MdKeyboardArrowUp"
                          : "MdKeyboardArrowDown"
                      }
                    />
                  </Center>
                ),
                onClick: () =>
                  setSearch((prev) => ({
                    ...prev,
                    orderBy:
                      search.orderBy === "createAt:desc"
                        ? "createAt:asc"
                        : "createAt:desc",
                  })),
              },
              {
                label: (
                  <Center>
                    <Text>조회수 순</Text>
                    <Icon
                      icon={
                        search.orderBy === "viewCount:desc"
                          ? "MdKeyboardArrowUp"
                          : "MdKeyboardArrowDown"
                      }
                    />
                  </Center>
                ),
                onClick: () =>
                  setSearch((prev) => ({
                    ...prev,
                    orderBy:
                      search.orderBy === "viewCount:desc"
                        ? "viewCount:asc"
                        : "viewCount:desc",
                  })),
              },
              {
                label: (
                  <Center>
                    <Text>{pageSize + "개씩 보기"}</Text>
                    <Icon icon="MdOutlineAdd" />
                  </Center>
                ),
                onClick: () => setPageSize(pageSize === 30 ? 20 : pageSize + 5),
              },
            ]}
            title="공유 게시판"
          />
        </Col>
        <Col span={24}>
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
              },
              {
                title: "test",
                src:
                  (process.env.VITE_TEST_IMG_URL ||
                    process.env.NEXT_PUBLIC_IMG_URL) +
                  "/id/973/600/600.jpg?hmac=rAwBeFfcx_1_w1QhUqciqL1FR7KbhmbAz2lDPXU67QQ",
                subTitle: "서브 텍스트입니다.",
                to: "https://localhost:3000",
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
              },
              {
                title: "test",
                src:
                  (process.env.VITE_TEST_IMG_URL ||
                    process.env.NEXT_PUBLIC_IMG_URL) +
                  "/id/612/600/600.jpg?hmac=OOkE5Q9AbaUpjesuVwaU6diL0WTpH5UC-vUwZNA0uT8",
                subTitle: "서브 텍스트입니다.",
                to: "https://localhost:3000",
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
              },
              {
                title: "test",
                src:
                  (process.env.VITE_TEST_IMG_URL ||
                    process.env.NEXT_PUBLIC_IMG_URL) +
                  "/id/1014/600/600.jpg?hmac=B8s9k5dHO4Uij1dwCxTOhC3BRc6eFQUG8CxvIkYXFks",
                subTitle: "서브 텍스트입니다.",
                to: "https://localhost:3000",
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
      </Row>
    </Container>
  );
};

export default BoardPage;
