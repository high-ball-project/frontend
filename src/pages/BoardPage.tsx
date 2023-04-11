import { Center, Flex } from "@chakra-ui/react";
import Button from "@components/Button";
import ContentMenuHeader from "@components/ContentMenuHeader";
import { Col, Container, Input, Row, Table } from "@components/Element";
import Icon from "@components/Icon";
import Link from "@components/Link";
import Text from "@components/Text";
import useApiPagination from "@hooks/useApiPagination";
import { Modal, Switch } from "antd";
import dayjs from "dayjs";
import { Key, useCallback, useState } from "react";

const BoardPage = () => {
  const [current, setCurrent, pageSize, setPageSize, search, setSearch] =
    useApiPagination({
      initialSearchParams: {
        current: "1",
        pageSize: "20",
        orderBy: "createAt:desc",
      },
    });
  const [access, setAccess] = useState(false);
  const [select, setSelect] = useState<Key[]>([]);

  const handleRemove = useCallback(() => {
    Modal.info({ content: select.join(",") + "가 선택되었습니다" });
  }, [select]);

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
          <Table
            columns={[
              {
                title: "No.",
                dataIndex: "key",
                key: "key",
                width: "40px",
              },
              {
                title: "제목",
                dataIndex: "title",
                key: "title",
                ellipsis: true,
                width: "200px",
              },
              {
                title: "작성자",
                dataIndex: "writer",
                key: "writer",
                width: "100px",
              },
              {
                title: "작성일",
                dataIndex: "createdAt",
                key: "createdAt",
                width: "100px",
              },
              {
                title: "조회수",
                dataIndex: "viewCount",
                key: "viewCount",
                width: "80px",
              },
            ]}
            dataSource={[
              {
                key: 1,
                title:
                  "테스트1테스트1테스트1테스트1테스트1테스트1테스트1테스트1테스트1테스트1테스트1테스트1테스트1테스트1테스트1테스트1",
                writer: "데브파이브",
                createdAt: dayjs().format("YYYY-MM-DD"),
                viewCount: 100,
              },

              {
                key: 2,
                title: "테스트2",
                writer: "데브파이브",
                createdAt: dayjs().format("YYYY-MM-DD"),
                viewCount: 100,
              },
              {
                key: 3,
                title: "테스트3",
                writer: "데브파이브",
                createdAt: dayjs().format("YYYY-MM-DD"),
                viewCount: 100,
              },
              {
                key: 4,
                title: "테스트4",
                writer: "데브파이브",
                createdAt: dayjs().format("YYYY-MM-DD"),
                viewCount: 100,
              },
              {
                key: 5,
                title: "테스트5",
                writer: "데브파이브",
                createdAt: dayjs().format("YYYY-MM-DD"),
                viewCount: 100,
              },
            ]}
            overflowX={["scroll", "scroll", "initial", "initial", "initial"]}
            pagination={{
              current,
              onChange: (page, pageSize) => {
                setCurrent(page);
                setPageSize(pageSize);
              },
              pageSize,
            }}
            rowSelection={
              access
                ? {
                    type: "checkbox",
                    onChange: setSelect,
                  }
                : undefined
            }
          />
        </Col>
        <Col span={24}>
          <Flex justifyContent="space-between">
            <Flex gap={2} my={2}>
              <Text>관리자 권한 활성화 :</Text>
              <Switch onChange={setAccess} />
            </Flex>
            {access && (
              <Flex gap={2} my={2}>
                <Button danger onClick={handleRemove}>
                  삭제하기
                </Button>
                <Link to="/write">
                  <Button>글쓰기</Button>
                </Link>
              </Flex>
            )}
          </Flex>
        </Col>
      </Row>
    </Container>
  );
};

export default BoardPage;
