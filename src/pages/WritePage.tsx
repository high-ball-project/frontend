import { Container } from "@components/Element";
import WriteForm from "@components/WriteForm";
import { notification } from "antd";

const WritePage = () => (
  <Container mt="80px">
    <WriteForm
      onWrite={(v, modify) => {
        console.info(v);
        if (modify) {
          notification.success({
            message: `${v.title}글이 성공적으로 수정되었습니다.. `,
          });
          return;
        }
        notification.success({
          message: `${v.title}글이 성공적으로 작성되었습니다. `,
        });
      }}
    />
  </Container>
);

export default WritePage;
