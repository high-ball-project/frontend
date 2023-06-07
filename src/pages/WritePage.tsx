import { Container, Skeleton } from "@components/Element";
import WriteForm from "@components/WriteForm";
import BoardGet from "@interfaces/BoardGet";
import { getFetcher } from "@utils/fetcher";
import { notification } from "antd";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSearchParam } from "react-use";
import useSWR from "swr";

const WritePage = () => {
  const { id } = useParams();
  const boardId = useSearchParam("id");
  const clinicalId = useSearchParam("clinicalId");

  const navigate = useNavigate();

  const { data } = useSWR<BoardGet>(boardId && "/board/" + boardId, getFetcher);

  if (!data && id) return <Skeleton mt="80px" />;

  return (
    <Container mt="80px">
      <WriteForm
        initValue={{
          title: data?.title,
          content: data?.content,
          category: 0,
        }}
        onWrite={async (v, modify) => {
          try {
            if (modify) {
              await axios.post("/board/update/" + boardId, {
                writer: "test",
                title: v.title,
                content: v.content,
                category: 0,
              });
              notification.success({
                message: `${v.title}글이 성공적으로 수정되었습니다.. `,
              });
              navigate("/board");
              return;
            }
            await axios.post("/board/add", {
              writer: "test",
              title: v.title,
              content: v.content,
              category: 0,
              clinical_id: clinicalId,
            });
            notification.success({
              message: `${v.title}글이 성공적으로 작성되었습니다. `,
            });
            navigate("/board");
          } catch (e) {
            notification.error({
              message: `작성에 실패했습니다.`,
            });
          }
        }}
      />
    </Container>
  );
};

export default WritePage;
