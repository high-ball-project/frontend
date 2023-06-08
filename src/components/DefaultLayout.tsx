import { Container, Layout } from "@components/Element";
import Icon from "@components/Icon";
import ThemeSwitchButton from "@components/ThemeSwitchButton";
import { Outlet } from "react-router-dom";

interface DefaultLayoutProps {
  topVisual?: boolean;
}

const DefaultLayout = ({ topVisual }: DefaultLayoutProps) => (
  <Layout
    bg="background"
    footer={{
      snsTitle: "다양한 소식을 만나보세요!",
      sns: [
        {
          sns: "facebook",
          url: "https://google.com",
        },
        {
          sns: "appstore",
          url: "https://google.com",
        },
        {
          sns: "mail",
          url: "https://google.com",
        },
        {
          sns: "kakao",
          url: "https://google.com",
        },
        {
          sns: "phone",
          url: "https://google.com",
        },
        {
          sns: "twitch",
          url: "https://google.com",
        },
        {
          sns: "youtube",
          url: "https://google.com",
        },
        {
          sns: "playstore",
          url: "https://google.com",
        },
        {
          sns: "naver",
          url: "https://google.com",
        },
      ],
      middleText: [
        "팀 이름: 하이볼",
        "팀원 : 임민택, 정대기, 이승준, 이강욱, 홍현기",
      ],
      logo: <Icon icon="MdMotionPhotosAuto" size={48} />,
      copyRightCompany: "2021-2023 하이볼",
    }}
    footerMt={4}
    gnb={{
      sideMenu: [
        { icon: <ThemeSwitchButton size="md" /> },
        { icon: "MdLogin", link: "/login" },
      ],
      position: "center",
      logo: <Icon icon="MdMotionPhotosAuto" size={48} />,
      fixed: true,
      colorChange: true,
      changeHeight: "300px",
    }}
    menu={[
      { content: "임파선 전이 예측", link: "/predict" },
      { content: "공지사항", link: "/notice" },
      { content: "공유 게시판", link: "/board" },
    ]}
    topVisual={
      topVisual
        ? {
            src: "/images/top-visual.png",
            height: "100vh",
          }
        : undefined
    }
  >
    <Container>
      <Outlet />
    </Container>
  </Layout>
);

export default DefaultLayout;
