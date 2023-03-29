import {
  BorderProps,
  Box,
  Center,
  ColorProps,
  Flex,
  LayoutProps,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Col, Row, Spin } from "@components/Element";
import Empty from "@components/Empty";
import Image from "@components/Image";
import Link from "@components/Link";
import SkeletonBox from "@components/SkeletonBox";
import Text from "@components/Text";
import { Theme } from "@emotion/react";
import { ComponentType } from "react";

export type ListType = "grid" | "list";

export interface CardProps {
  to?: string;
  type?: ListType;
  target?: string;
  imageH?: LayoutProps["height"];
  title?: string;
  subTitle?: string;
  src?: string;
  color?: keyof Theme["colors"] | ColorProps["color"];
  subColor?: keyof Theme["colors"] | ColorProps["color"];
  borderColor?: keyof Theme["colors"] | BorderProps["borderColor"];
  rightSubText?: string;
  leftSubText?: string;
  writerProfile?: string;
  contentH?: LayoutProps["height"];
}

export type LinkedCardProps = CardProps;
export interface CardListProps {
  data?: LinkedCardProps[];
  isLoading?: boolean;
  numCol: Partial<Record<string, number>> | number[] | number;
  globalCardProps?: CardProps;
  type: Partial<Record<string, ListType>> | ListType[] | ListType;
}

/**
 * CardList Component
 * @param {LinkedCardProps[]} data
 * @param {boolean} isLoading
 * @param {Partial} numCol
 * @param {Partial} type
 * @param {CardProps} globalCardProps
 * @return {ReactNode}
 */
const CardList: ComponentType<CardListProps> = ({
  data,
  isLoading = false,
  numCol,
  type,
  globalCardProps,
}: CardListProps) => {
  const col =
    useBreakpointValue(typeof numCol === "object" ? numCol : [numCol]) ?? 1;

  const cardType = useBreakpointValue(typeof type === "object" ? type : [type]);

  if (!data) return <SkeletonBox height="600px" />;

  if (!data.length)
    return (
      <Empty
        data-testid="empty"
        description="데이터가 없습니다."
        height="100px"
      />
    );

  return (
    <Spin spinning={isLoading}>
      <Center flexDir="column">
        <Row data-testid="cardWrapper" position="relative" w="100%">
          {data.map((v, idx) => (
            <Col key={idx} p={2} span={24 / (cardType === "list" ? 1 : col)}>
              <Card {...globalCardProps} {...v} type={cardType} />
            </Col>
          ))}
        </Row>
      </Center>
    </Spin>
  );
};

/**
 * Card Component
 * @param {string} to
 * @param {string} title
 * @param {CSS.Property.Color} color
 * @param {CSS.Property.Color} subColor
 * @param {string} src
 * @param {CSS.Property.Color} leftSubText
 * @param {"grid"| "list"| "page"} rightSubText
 * @param {CSS.Property.Color} borderColor
 * @param {CSS.Property.Height} contentH
 * @param {string} subTitle
 * @param {ListType} type
 * @param {CSS.Property.Height} imageH
 * @param {string} writerProfile
 * @param {string} target
 * @return {ReactNode}
 */
const Card = ({
  to,
  title,
  color = "mainText",
  subColor = "subText",
  src,
  leftSubText,
  rightSubText,
  borderColor = "border",
  contentH = "100px",
  subTitle,
  type,
  imageH = ["initial", null, "300px"],
  writerProfile,
  target,
}: LinkedCardProps) => (
  <Flex
    border="1px solid"
    borderColor={borderColor}
    borderRadius="main"
    data-testid="card"
    overflow="hidden"
    w="100%"
  >
    <Link full target={target} to={to}>
      <Flex flexDir={type === "list" ? "row" : "column"} h="100%" w="100%">
        {src && (
          <Image
            alt="title image"
            borderBottom="1px solid"
            borderColor={borderColor}
            h={imageH}
            maxH={type === "list" ? "100px" : imageH}
            minH={type === "list" ? "100px" : imageH}
            objectFit="cover"
            preview={false}
            src={src}
            w="100%"
          />
        )}
        <Flex
          flexDir="column"
          h={type === "list" ? "100%" : contentH}
          justifyContent="space-between"
          p={4}
          w="100%"
        >
          <Flex alignItems="center" gap={2}>
            {writerProfile && (
              <Center
                border="1px solid"
                borderColor={borderColor}
                borderRadius="9px"
                data-testid="cardProfile"
                h="18px"
                minH="18px"
                minW="18px"
                overflow="hidden"
                w="18px"
              >
                <Image
                  alt="profile image"
                  height="18px"
                  src={writerProfile}
                  width="18px"
                />
              </Center>
            )}
            <Flex flexDir="column" w="100%">
              {title && (
                <Text
                  color={color}
                  data-testid="cardTitle"
                  fontSize="md"
                  fontWeight="bold"
                  overflow="hidden"
                  textOverflow="ellipsis"
                  whiteSpace="nowrap"
                >
                  {title}
                </Text>
              )}
              {subTitle && (
                <Text
                  color={subColor}
                  data-testid="cardSubTitle"
                  fontSize="sm"
                  fontWeight="bold"
                  overflow="hidden"
                  textOverflow="ellipsis"
                  whiteSpace="nowrap"
                >
                  {subTitle}
                </Text>
              )}
            </Flex>
          </Flex>
          <Flex justifyContent="space-between" w="100%">
            <Box>
              {leftSubText && (
                <Text
                  color={subColor}
                  data-testid="cardLeftSubText"
                  fontSize="2xs"
                >
                  {leftSubText}
                </Text>
              )}
            </Box>
            <Box>
              {rightSubText && (
                <Text
                  color={subColor}
                  data-testid="cardRightSubText"
                  fontSize="2xs"
                >
                  {rightSubText}
                </Text>
              )}
            </Box>
          </Flex>
        </Flex>
      </Flex>
    </Link>
  </Flex>
);
export default CardList;

// import { addPropertyControls, ControlType } from "framer"
//
// addPropertyControls(CardList, {
//   data: {
//     type: ControlType.Array,
//     control: {
//       type: ControlType.Object,
//       controls: {
//         target: {
//           type: ControlType.String,
//         },
//         imageH: {
//           type: ControlType.String,
//         },
//         title: {
//           type: ControlType.String,
//           defaultValue: "타이틀",
//         },
//         src: {
//           type: ControlType.String,
//           defaultValue:
//             "https://fastly.picsum.photos/id/419/600/600.jpg?hmac=JxDlVqTnDXUmIH151loHzAZDwfVXGLvT17tSQY5Wfls",
//         },
//         subTitle: {
//           type: ControlType.String,
//           defaultValue: "서브타이틀",
//         },
//         rightSubText: {
//           type: ControlType.String,
//           defaultValue: "2000.00.00",
//         },
//         leftSubText: {
//           type: ControlType.String,
//           defaultValue: "카테고리",
//         },
//         to: {
//           type: ControlType.String,
//           defaultValue: "htpps://devfive.kr",
//         },
//       },
//     },
//     defaultValue: [
//       {
//         title: "test",
//         src: "https://fastly.picsum.photos/id/419/600/600.jpg?hmac=JxDlVqTnDXUmIH151loHzAZDwfVXGLvT17tSQY5Wfls",
//         subTitle: "서브 텍스트입니다.",
//         rightSubText: "2000.00.00",
//         leftSubText: "카테고리",
//         to: "http://localhost:8000",
//       },
//       {
//         to: "https://localhost:3000",
//         title: "test",
//         src: "https://picsum.photos/id/668/600/600.jpg?hmac=O56NInO155VoVXS-3AJpMqYsOUKP2ySgxBhj4TG0BeI",
//         leftSubText: "카테고리",
//         subTitle: "서브 텍스트입니다.",
//       },
//       {
//         title: "test",
//         src: "https://picsum.photos/id/973/600/600.jpg?hmac=rAwBeFfcx_1_w1QhUqciqL1FR7KbhmbAz2lDPXU67QQ",
//         subTitle: "서브 텍스트입니다.",
//         to: "https://localhost:3000",
//       },
//       {
//         title: "test",
//         src: "https://picsum.photos/id/809/600/600.jpg?hmac=oPfbXc9yNs4FPtUomYB31mZVdQQLNuxYyBK834O0M18",
//         subTitle: "서브 텍스트입니다.",
//         to: "https://localhost:3000",
//         leftSubText: "카테고리",
//       },
//       {
//         title: "test",
//         src: "https://picsum.photos/id/117/600/600.jpg?hmac=4rvSTVJTX5zXpivyGUXrLFp5b6tWMjs07OhHDbEAipU",
//         subTitle: "서브 텍스트입니다.",
//         to: "https://localhost:3000",
//       },
//     ],
//   },
//   type : {
//     type: ControlType.Enum,
//     options: ["grid","list"],
//     defaultValue: "grid",
//   },
//   numCol: {
//     type: ControlType.Array,
//     control: {
//       type: ControlType.Number,
//     },
//     defaultValue: [4],
//   },
//   isLoading: {
//     type: ControlType.Boolean,
//     defaultValue: false,
//   },
// })
