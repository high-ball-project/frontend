import { Flex } from "@chakra-ui/react";
import Button from "@components/Button";
import DetailForm from "@components/DetailForm";
import { Container } from "@components/Element";
import Empty from "@components/Empty";
import Link from "@components/Link";
import useSearchSWR from "@hooks/useSearchSWR";
import BoardGet from "@interfaces/BoardGet";
import { Modal, notification } from "antd";
import axios from "axios";
import dayjs from "dayjs";
import { useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";

const DetailPage = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const { data, isLoading } = useSearchSWR<BoardGet>("/board/" + id);

  const handleDelete = useCallback(async () => {
    Modal.confirm({
      title: "게시글 삭제",
      content: "게시글을 삭제하시겠습니까?",
      onOk: async () => {
        try {
          await axios.post("/board/delete/" + id);
          notification.success({ message: "삭제되었습니다." });
          navigate("/board");
        } catch (e) {
          notification.error({ message: "삭제에 실패했습니다." });
        }
      },
    });
  }, [id, navigate]);

  if (!data && !isLoading) return <Empty description="잘못된 접근입니다." />;

  return (
    <Container mt="80px">
      <DetailForm
        access
        onModify={() => navigate("/write?mode=edit&id=" + id)}
        onRemove={handleDelete}
        value={{
          title: data?.title,
          content: data?.content,
          category: "의료",
          createdAt: dayjs(data?.createdAt).format("작성일: YYYY-MM-DD"),
        }}
      />
      {data?.clinical_id && (
        <Flex justifyContent="end">
          <Link to={"result" + data.clinical_id}>
            <Button>분석 결과 보기</Button>
          </Link>
        </Flex>
      )}
    </Container>
  );
};

export default DetailPage;
