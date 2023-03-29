import {
  BackgroundProps,
  Box,
  Flex,
  LayoutProps,
  TextProps,
  useBreakpointValue,
} from "@chakra-ui/react";
import Empty from "@components/Empty";
import Image from "@components/Image";
import Link from "@components/Link";
import SkeletonBox from "@components/SkeletonBox";
import Text from "@components/Text";
import { Theme as EmotionTheme } from "@emotion/react";
import {
  CarouselProps as _CarouselProps,
  CarouselRef,
  default as _Carousel,
} from "antd/es/carousel";
import { default as Drawer } from "antd/es/drawer";
import { default as Spin } from "antd/es/spin";
import { default as Switch } from "antd/es/switch";
import { ComponentType, ReactNode, useRef, useState } from "react";
import {
  AiOutlineLeft,
  AiOutlineRight,
  AiOutlineUnorderedList,
} from "react-icons/ai";

interface CarouselData {
  src: string;
  link?: string;
  title: string;
}

export interface CarouselProps {
  data?: CarouselData[];
  isLoading: boolean;
  controller?: boolean;
  height?: LayoutProps["height"];
  autoplaySpeed?: number;
  fade?: boolean;
  bg?: keyof EmotionTheme["colors"] | BackgroundProps["bg"];
  autoplay?: boolean;
  showAutoplayToggle?: boolean;
  showAll?: boolean;
  color?: keyof EmotionTheme["colors"] | TextProps["color"];
  defaultShowAll?: boolean;
  controllerRender?: (
    current: number,
    total: number,
    prev: () => void,
    next: () => void,
    autoPlay: boolean,
    toggleAutoPlay: (status: boolean) => void,
    showAll: () => void
  ) => ReactNode;
}

const Carousel: ComponentType<CarouselProps & _CarouselProps> = ({
  data,
  isLoading,
  autoplaySpeed = 5000,
  fade,
  bg = "primary",
  autoplay = false,
  showAutoplayToggle = false,
  showAll = false,
  color = "mainText",
  defaultShowAll = false,
  height = "fit-content",
  controller,
  controllerRender,
  ...rest
}: CarouselProps & _CarouselProps) => {
  const contentHeight = useBreakpointValue<string>(
    (typeof height === "string" ? [height] : height) as string[]
  );

  const ref = useRef<CarouselRef | null>(null);
  const [autoPlay, setAutoPlay] = useState(autoplay);
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(defaultShowAll);

  if (!data) return <SkeletonBox />;
  if (!data.length)
    return <Empty description="배너 데이터를 추가해주세요." height="600px" />;

  return (
    <>
      <Spin spinning={isLoading}>
        <Box h={height} position={["initial", "relative", "relative"]}>
          <_Carousel
            ref={ref}
            afterChange={(p) => setPage(p)}
            autoplay={autoPlay}
            autoplaySpeed={autoplaySpeed}
            effect={fade ? "fade" : undefined}
            style={{
              height: contentHeight,
            }}
            {...rest}
          >
            {data.map((v, idx) => (
              <Link key={idx} to={v.link}>
                <Box data-testid="carousel">
                  <Image
                    alt="Carousel Image"
                    height="100%"
                    maxH={height}
                    minH={height}
                    minW="100vw"
                    objectFit="cover"
                    preview={false}
                    src={v.src}
                    width="100%"
                  />
                </Box>
              </Link>
            ))}
          </_Carousel>
          {controller && controllerRender ? (
            controllerRender(
              page + 1,
              data.length,
              () => ref.current?.prev(),
              () => ref.current?.next(),
              autoPlay ?? false,
              () => setAutoPlay(!autoPlay),
              () => setOpen(true)
            )
          ) : (
            <Flex
              alignItems="center"
              bg={bg}
              borderRadius="main"
              bottom={4}
              gap={2}
              left={4}
              position={["initial", "absolute", "absolute"]}
              px={2}
              py={1}
              width="fit-content"
            >
              <Text
                color={color}
                fontSize={["xs", "sm", "md"]}
                fontWeight="bold"
              >
                {page + 1}
              </Text>
              <Text
                color={color}
                fontSize={["xs", "sm", "md"]}
                fontWeight="bold"
              >
                /
              </Text>
              <Text
                color={color}
                fontSize={["xs", "sm", "md"]}
                fontWeight="bold"
              >
                {data.length}
              </Text>
              <AiOutlineLeft
                cursor="pointer"
                onClick={() => ref.current?.prev()}
              />
              <AiOutlineRight
                cursor="pointer"
                onClick={() => ref.current?.next()}
              />
              {showAutoplayToggle && (
                <Switch
                  checked={autoPlay}
                  checkedChildren={
                    <Text color={color} fontSize="sm" fontWeight="bold">
                      ON
                    </Text>
                  }
                  data-testid="showAutoplayToggle"
                  onChange={(checked) => setAutoPlay(checked)}
                  unCheckedChildren={
                    <Text color={color} fontSize="sm" fontWeight="bold">
                      OFF
                    </Text>
                  }
                />
              )}
              {showAll && (
                <Text color={color} fontSize="xl" fontWeight="bold">
                  <AiOutlineUnorderedList
                    cursor="pointer"
                    data-testid="showAll"
                    onClick={() => setOpen(true)}
                  />
                </Text>
              )}
            </Flex>
          )}
        </Box>
      </Spin>
      {showAll && (
        <Drawer
          height="100%"
          onClose={() => setOpen(false)}
          open={open}
          placement="top"
          title={`전체 ${data.length}개`}
        >
          <Flex data-testid="showAllDrawer" flexDir="column" gap={2}>
            <Flex
              data-testid="drawerData"
              flexDir="column"
              gap={4}
              width="100%"
            >
              {data.map((v, idx) => (
                <Link key={idx} to={v.link}>
                  <Flex flexDir="column" gap={2}>
                    <Box borderRadius="main" width="100%">
                      <Image
                        alt="Carousel Image"
                        height="100%"
                        preview={false}
                        src={v.src}
                        width="100%"
                      />
                    </Box>
                    <Text color={color} fontSize="md" fontWeight="bold">
                      {v.title}
                    </Text>
                  </Flex>
                </Link>
              ))}
            </Flex>
          </Flex>
        </Drawer>
      )}
    </>
  );
};

export default Carousel;

// import { addPropertyControls, ControlType } from "framer";
//
// import { getColorKeys } from "../../codeFile/theme/theme.ts";
// import { Theme } from "../App.tsx";
//
// addPropertyControls(Carousel, {
//   data: {
//     type: ControlType.Array,
//     control: {
//       type: ControlType.Object,
//       controls: {
//         src: {
//           type: ControlType.String,
//           defaultValue: "image here",
//         },
//         link: {
//           type: ControlType.String,
//           defaultValue: "https://devfive.kr",
//         },
//         title: {
//           type: ControlType.String,
//           defaultValue: "title here",
//         },
//       },
//     },
//     defaultValue: [
//         {
//             src: "https://picsum.photos/1920/800",
//             link: "/",
//             title: "테스트",
//         },
//         {
//             src: "https://picsum.photos/1920/800",
//             link: "/",
//             title: "테스트",
//         },
//         {
//             src: "https://picsum.photos/1920/800",
//             link: "/",
//             title: "테스트",
//         },
//     ],
//   },
//   isLoading: {
//     type: ControlType.Boolean,
//     defaultValue: false,
//   },
//   autoplaySpeed: {
//     type: ControlType.Number,
//     defaultValue: 5000,
//   },
//   bg: {
//     type: ControlType.Enum,
//     options: getColorKeys(Theme),
//     defaultValue: "primary",
//   },
//   showAutoplayToggle: {
//     type: ControlType.Boolean,
//     defaultValue: false,
//   },
//   showAll: {
//     type: ControlType.Boolean,
//     defaultValue: false,
//   },
//   color: {
//     type: ControlType.Enum,
//     options: getColorKeys(Theme),
//     defaultValue: "primary",
//   },
//   defaultShowAll: {
//     type: ControlType.Boolean,
//     defaultValue: false,
//   },
//   height: {
//     type: ControlType.String,
//     defaultValue: "fit-content",
//   },
//   controller: {
//     type: ControlType.Boolean,
//     defaultValue: false,
//   },
//   fade: {
//         type: ControlType.Boolean,
//         defaultValue: false,
//     },
// });
