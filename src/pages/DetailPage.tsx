import DetailForm from "@components/DetailForm";
import { Container } from "@components/Element";
import { notification } from "antd";
import dayjs from "dayjs";

const DetailPage = () => (
  <Container mt="80px">
    <DetailForm
      access
      onModify={() =>
        notification.success({ message: "수정하기 버튼이 클릭되었습니다." })
      }
      onRemove={() =>
        notification.success({ message: "게시글이 삭제되었습니다." })
      }
      value={{
        title: "타이틀",
        content: "컨텐츠 입니다",
        category: "카테고리",
        createdAt: dayjs().format("작성일: YYYY-MM-DD"),
      }}
    />
  </Container>
);

export default DetailPage;
