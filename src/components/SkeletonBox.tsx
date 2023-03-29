import { As, Box, BoxProps, chakra, keyframes } from "@chakra-ui/react";

import { DevfiveComponent as ComponentType } from "../interfaces/types";

const _SkeletonBox = chakra<As, BoxProps>(Box);

const SkeletonBox: ComponentType<BoxProps> = ({ ...rest }: BoxProps) => (
  <_SkeletonBox {...rest} />
);

const skeletonKeyFrame = keyframes`
  0% {
    transform: translateX(-37.5%)
  }
  100% {
    transform: translateX(37.5%)
  }
`;

SkeletonBox.defaultProps = {
  _after: {
    position: "absolute",
    top: 0,
    right: "-150%",
    bottom: 0,
    left: "-150%",
    background:
      "linear-gradient(90deg, rgba(0, 0, 0, 0.06) 25%, rgba(0, 0, 0, 0.15) 37%, rgba(0, 0, 0, 0.06) 63%)",
    animation: `${skeletonKeyFrame} 1.4s ease infinite`,
    content: `""`,
  },
  backgroundColor: "hsla(0, 0%, 74.5%, .2)",
  display: "block",
  h: "100%",
  lineHeight: "32px",
  overflow: "hidden",
  position: "relative",
  verticalAlign: "top",
  w: "100%",
  zIndex: "0",
};

export default SkeletonBox;

// import { addPropertyControls, ControlType } from "framer";
//
// addPropertyControls(SkeletonBox, {
//   width: {
//     type: ControlType.String,
//     defaultValue: "320px",
//   },
//   height: {
//     type: ControlType.String,
//     defaultValue: "320px",
//   },
// });
