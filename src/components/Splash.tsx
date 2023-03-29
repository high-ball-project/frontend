import { Center, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { Image, Layout, Text } from "../index";

// 스플래시 페이지 로그인 정보 불러올 때 사용
export interface SplashPageProps {
  show: boolean;
  imageSrc: string;
  companyName: string;
  title?: string;
}

function Splash({ show, imageSrc, companyName, title }: SplashPageProps) {
  const [localShow, setLocalShow] = useState(true);

  useEffect(() => {
    if (!show) {
      setTimeout(() => setLocalShow(false), 500);
    }
  }, [show]);

  return (
    <Layout
      left={0}
      opacity={localShow ? 1 : 0}
      position="fixed"
      top={0}
      transition="0.5s"
      visibility={localShow ? "visible" : "hidden"}
      width="100%"
      zIndex={1080}
    >
      <Flex
        alignItems="center"
        flexDirection="column"
        gap="16px"
        height="100vh"
        p={4}
        pt="160px"
        w="100%"
      >
        <Image
          alt="splash image"
          objectFit="contain"
          preview={false}
          src={imageSrc}
          width="120px"
        />
        <Text>{title}</Text>
      </Flex>
      <Center bottom={8} position="fixed" width="100%">
        <Text>ⓒ 2022 {companyName} all rights reserved.</Text>
      </Center>
    </Layout>
  );
}

export default Splash;

// import { addPropertyControls, ControlType } from "framer";
//
// addPropertyControls(Splash, {
//   show: {
//     type: ControlType.Boolean,
//     defaultValue: true,
//   },
//   imageSrc: {
//     type: ControlType.String,
//     defaultValue:
//       "https://fastly.picsum.photos/id/1079/80/80.jpg?hmac=AApQphZXNZrQRbdyXjVx01OlhwVbPeJjLWgY29CrBXo",
//   },
//   companyName: {
//     type: ControlType.String,
//     defaultValue: "Company",
//   },
//   title: {
//     type: ControlType.String,
//     defaultValue: "Title Here",
//   },
// });
