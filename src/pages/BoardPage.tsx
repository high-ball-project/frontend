import { Center, Flex } from "@chakra-ui/react";
import Button from "@components/Button";
import CardList from "@components/CardList";
import ContentMenuHeader from "@components/ContentMenuHeader";
import { Col, Container, Row } from "@components/Element";
import Icon from "@components/Icon";
import Link from "@components/Link";
import Text from "@components/Text";
import useApiPagination from "@hooks/useApiPagination";
import useSearchSWR from "@hooks/useSearchSWR";
import BoardGet from "@interfaces/BoardGet";
import dayjs from "dayjs";

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

  const { data } = useSearchSWR<BoardGet[]>("/board");

  return (
    <Container mt="80px" pt="20px">
      <Row>
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
            data={data?.map((v) => ({
              title: v.title,
              src:
                (process.env.VITE_TEST_IMG_URL ||
                  process.env.NEXT_PUBLIC_IMG_URL) +
                "/id/910/600/600.jpg?hmac=Zp8Nn8Qu1cNWtaS8s7cmehOAFEqWEFMLnkU2-5WAHmk",
              rightSubText: dayjs(v.createdAt).format("YYYY.MM.DD"),
              leftSubText: "의료",
              to: "/board/" + v.id,
            }))}
            numCol={[1, 2, 4]}
            type="grid"
          />
        </Col>
        <Col span={24}>
          <Flex justifyContent="end">
            <Link to="/write">
              <Button type="primary">글쓰기</Button>
            </Link>
          </Flex>
        </Col>
      </Row>
    </Container>
  );
};

export default BoardPage;
