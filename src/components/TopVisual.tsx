import { Center, ColorProps, Flex, LayoutProps } from "@chakra-ui/react";
import Text from "@components/Text";
import VideoPlayer, { VideoPlayerProps } from "@components/VideoPlayer";
import { Theme } from "@emotion/react";
import { ComponentType } from "react";
import { ReactPlayerProps } from "react-player";

export interface TopVisualProps {
  src?: string;
  video?: VideoPlayerProps & ReactPlayerProps;
  title?: string;
  height?: LayoutProps["h"];
  color?: ColorProps["color"] | keyof Theme["colors"];
}

const TopVisual: ComponentType<TopVisualProps> = ({
  src,
  title,
  video,
  color = "mainText",
  height = ["240px", "360px", "480px"],
}: TopVisualProps) => (
  <Flex
    bgImage={src}
    bgRepeat="no-repeat"
    bgSize="cover"
    data-testid="topVisualImage"
    h={height}
    height={video ? "initial" : height}
    overflow="hidden"
    position="relative"
    w="100%"
  >
    {video && <VideoPlayer full h="100%" width="100%" {...video} />}
    {title && (
      <Center
        data-testid="topVisualTitle"
        height="100%"
        position="absolute"
        width="100%"
      >
        <Text color={color} fontSize="4xl" fontWeight="bold">
          {title}
        </Text>
      </Center>
    )}
  </Flex>
);

export default TopVisual;

// import { addPropertyControls, ControlType } from "framer";
//
// addPropertyControls(TopVisual, {
//   src: {
//     type: ControlType.String,
//     defaultValue:
//       "https://fastly.picsum.photos/id/468/1920/600.jpg?hmac=REmqJu0hzGuiX9x2BgVgFjBJph_OTwViK7Lh_uqqAwA",
//   },
//   title: {
//     type: ControlType.String,
//     defaultValue: "Title Here",
//   },
//   height: {
//     type: ControlType.Array,
//     control : {
//       type: ControlType.String,
//       defaultValue: "180px",
//     },
//     defaultValue : ["240px", "360px", "480px"]
//   },
//   color: {
//     type: ControlType.String,
//     defaultValue: "mainText",
//   },
// });
