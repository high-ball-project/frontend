import { Box, Center, Flex, Grid } from "@chakra-ui/react";
import { ComponentType, ReactNode } from "react";
import { AiFillMail, AiFillPhone } from "react-icons/ai";
import {
  SiAppstore,
  SiFacebook,
  SiGoogleplay,
  SiInstagram,
  SiKakaotalk,
  SiNaver,
  SiTwitch,
  SiTwitter,
  SiYoutube,
} from "react-icons/si";

import { Image, Text } from "../index";

const icons = {
  facebook: <SiFacebook />,
  instagram: <SiInstagram />,
  youtube: <SiYoutube />,
  naver: <SiNaver />,
  kakao: <SiKakaotalk />,
  twitter: <SiTwitter />,
  twitch: <SiTwitch />,
  playstore: <SiGoogleplay />,
  appstore: <SiAppstore />,
  mail: <AiFillMail />,
  phone: <AiFillPhone />,
};

interface FooterSns {
  url: string;
  image?: string;
  sns: keyof typeof icons | string;
}

export interface FooterProps {
  sns?: FooterSns[];
  snsTitle?: string;
  logo: ReactNode | string;

  middleText?: string[];

  bottomSlide?: (ReactNode | string)[];
  copyRightCompany?: string;
}

/**
 * @param {string} snsTitle sns 타이틀
 * @param {FooterSns[]} sns 아이콘
 * @param {string | ReactNode} logo 로고
 * @param {(ReactNode | string)[]} bottomSlide 하단 슬라이드
 * @param {string[]} middleText 중간 텍스트
 * @param {string} copyRightCompany 저작권 텍스트
 * @constructor
 */
const Footer: ComponentType<FooterProps> = ({
  sns,
  snsTitle,
  logo,
  bottomSlide,
  middleText = [],
  copyRightCompany,
}: FooterProps) => {
  return (
    <Box as="footer" bg="footerBackground" py={[4, 10]}>
      <Box color="footerText" maxW="1140px" mx="auto" px={3}>
        <Grid gap={4} gridTemplateColumns={["1fr", null, "auto 1fr auto"]}>
          <Flex alignItems="center">
            {typeof logo === "string" ? (
              <Image
                alt="logo"
                maxH="64px"
                maxW="64px"
                objectFit="contain"
                preview={false}
                src={logo}
              />
            ) : (
              logo
            )}
          </Flex>
          <Flex alignItems="center" justifyContent={["flex-start", "center"]}>
            <Box>
              {middleText?.map((value, idx) => (
                <Box key={idx} display={["block", "inline"]}>
                  <Text
                    color="footerText"
                    display="inline"
                    fontSize="sm"
                    fontWeight="bold"
                    wordBreak="keep-all"
                  >
                    {value}
                  </Text>
                  {idx < middleText?.length - 1 && (
                    <Box
                      alignSelf="center"
                      bg="footerText"
                      display={["none", "inline-block"]}
                      h="12px"
                      mx={1}
                      w="1px"
                    />
                  )}
                </Box>
              ))}
            </Box>
          </Flex>
          {/* 연락 방법 */}
          {sns && (
            <Flex
              borderBottom={["solid white"]}
              borderTop={["solid white"]}
              borderWidth={["1px 0", 0]}
              flexDirection="column"
              maxW={["100%", "300px"]}
              py={[3, 0]}
            >
              <Text color="footerText" data-testid="snsTitle">
                {snsTitle || "SNS"}
              </Text>
              <Flex data-testid="snsIcons" flexWrap="wrap" fontSize="28px">
                {sns.map((e, idx) => (
                  <a key={e.sns + idx} href={e.url}>
                    <Center color="footerText" h="50px" w="50px">
                      {e.image ? (
                        <Image
                          alt={"sns icon" + e.sns}
                          h="100%"
                          preview={false}
                          src={e.image}
                          w="100%"
                        />
                      ) : (
                        e.sns in icons && icons[e.sns as keyof typeof icons]
                      )}
                    </Center>
                  </a>
                ))}
              </Flex>
            </Flex>
          )}
        </Grid>
        {bottomSlide && (
          <Flex
            flexDirection={["column", "row"]}
            flexWrap="wrap"
            gap={2}
            mt={3}
          >
            {bottomSlide.map((e, idx) => (
              <Box key={idx}>{e}</Box>
            ))}
          </Flex>
        )}
        {/* 수상 이미지 */}
        {copyRightCompany && (
          <Center mt={8}>
            <Text
              color="footerText"
              data-testid="copyRight"
              fontSize={["xs", "md"]}
            >
              Copyright © {copyRightCompany}. All Rights Reserved.
            </Text>
          </Center>
        )}
      </Box>
    </Box>
  );
};

export default Footer;
