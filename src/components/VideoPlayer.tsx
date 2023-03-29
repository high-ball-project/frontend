import { Box, Flex } from "@chakra-ui/react";
import { ComponentType, useCallback, useEffect, useRef, useState } from "react";
import ReactPlayer, { ReactPlayerProps } from "react-player";

import { useIsClient } from "../index";

export interface VideoPlayerProps {
  full?: boolean;
  interaction?: boolean;
  opacity?: number;
}

/** VideoPlayer
 * @param {boolean} full
 * @param {CSS.Property.Width} width
 * @param {CSS.Property.Height} height
 * @param {boolean} interaction
 * @param {number} opacity
 * @param {ReactPlayerProps} rest
 * @return {ReactNode}
 * */
const VideoPlayer: ComponentType<VideoPlayerProps & ReactPlayerProps> = ({
  full = false,
  width,
  interaction = false,
  opacity = 1,
  url,
  loop,
  ...rest
}: VideoPlayerProps & ReactPlayerProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [videoWidth, setVideoWidth] = useState<number>(0);
  const isClient = useIsClient();

  const handleResize = useCallback(() => {
    if (!ref.current) return;
    setVideoWidth(ref.current?.clientWidth ?? 0);
  }, [ref]);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize, width]);

  return (
    <Box
      ref={ref}
      h={(full ? 2160 / 3840 : 3840 / 2160) * videoWidth}
      pos="relative"
      w={width}
    >
      <Box
        data-testid="video"
        h="100%"
        left={0}
        opacity={opacity}
        pos="absolute"
        w="100%"
      >
        {isClient && (
          <ReactPlayer
            height="100%"
            loop={loop}
            url={typeof url === "string" && loop ? [url, url] : url}
            width="100%"
            {...rest}
            config={{
              youtube: {
                playerVars: {
                  controls: 0,
                },
              },
            }}
          />
        )}
      </Box>
      {!interaction && (
        <Flex data-testid="interaction" h="100%" pos="absolute" w="100%" />
      )}
    </Box>
  );
};
export default VideoPlayer;

// import { addPropertyControls, ControlType } from "framer";
//
// addPropertyControls(VideoPlayer, {
//   full: {
//     type: ControlType.Boolean,
//     defaultValue: false,
//   },
//   width: {
//     type: ControlType.String,
//     defaultValue: "100%",
//   },
//   interaction: {
//     type: ControlType.Boolean,
//     defaultValue: false,
//   },
//   opacity: {
//     type: ControlType.Number,
//     defaultValue: 1,
//   },
//   url: {
//     type: ControlType.Array,
//     control: {
//       type: ControlType.String,
//       defaultValue: "https://www.youtube.com/watch?v=b1fTnxiMRwQ",
//     },
//   },
//   loop: {
//     type: ControlType.Boolean,
//     defaultValue: false,
//   },
// });
