import { Modal } from "antd";
import { Outlet } from "react-router-dom";

import devfiveIcon from "/devfiveicon.svg";

import { Container, Image, Layout, ThemeSwitchButton } from "../index";

interface DefaultLayoutProps {
  topVisual?: boolean;
  middleGNB?: boolean;
}

const DefaultLayout = ({ topVisual, middleGNB }: DefaultLayoutProps) => (
  <Layout
    footer={{
      snsTitle: "데브파이브의 다양한 소식을 만나보세요!",
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
        "대표이사: 오정민",
        "사업자등록번호: 123-45-67890",
        "통신판매업신고번호: 제2021-서울강남-1234호",
        "주소: 서울특별시 강남구 테헤란로 123",
        "고객센터: 02-1234-5678",
        "이메일: example@devfive.kr",
      ],
      bottomSlide: ["과기부 상 이미지", "슬라이드 텍스트1", "슬라이드 텍스트2"],
      logo: devfiveIcon,
      copyRightCompany: "2021-2022 데브파이브",
    }}
    footerMt={4}
    gnb={{
      sideMenu: [
        { icon: <ThemeSwitchButton size="md" /> },
        { icon: "MdLogin", link: "/login" },
        { icon: "MdBorderColor", link: "/write" },
        { icon: "MdAutoStories", link: "/detail" },
        { icon: "MdList", link: "/list" },
      ],
      position: "center",
      logo: (
        <Image
          alt="logo"
          maxH="64px"
          maxW="64px"
          preview={false}
          src={devfiveIcon}
        />
      ),
      fixed: true,
      colorChange: true,
      changeHeight: "300px",
    }}
    menu={[
      {
        content: "메뉴 1",
        link: "/",
        subMenu: [
          {
            content: "메뉴 1-1",
            link: "/",
            subMenu: [
              { content: "메뉴 1-1-1", link: "/" },
              { content: "메뉴 1-1-2", link: "/" },
              { content: "메뉴 1-1-3", link: "/" },
              { content: "메뉴 1-1-4", link: "/" },
            ],
          },
          { content: "메뉴 1-2", link: "/" },
          { content: "메뉴 1-3", link: "/" },
          { content: "메뉴 1-4", link: "/" },
        ],
      },
      {
        content: "메뉴 2",
        link: "/",
        subMenu: [
          { content: "메뉴 2-1", link: "/" },
          { content: "메뉴 2-2", link: "/" },
          { content: "메뉴 2-3", link: "/" },
          { content: "메뉴 2-4", link: "/" },
        ],
      },
      { content: "메뉴 3", link: "/" },
      {
        content: "메뉴 4",
        link: "/",
        subMenu: [{ content: "메뉴 4-1", link: "/" }],
      },
      { content: "메뉴 5", link: "/" },
    ]}
    middleGNB={
      middleGNB
        ? {
            icon: "MdHome",
            select: [0],
            onIconClick: () => {
              Modal.success({
                title: "아이콘 테스크",
                content: "아이콘 클릭 :>",
                maskClosable: true,
              });
            },
          }
        : undefined
    }
    topVisual={
      topVisual
        ? {
            title: "테스트",
            color: "primary",
            video: {
              full: true,
              muted: true,
              loop: true,
              playing: true,
              url: "https://www.youtube.com/watch?v=b1fTnxiMRwQ",
            },
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
