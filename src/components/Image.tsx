import { As, chakra } from "@chakra-ui/react";
import _Image, { ImageProps } from "antd/es/image";

import fallbackImage from "../images/fallback.png";
import { DevfiveComponent as ComponentType } from "../interfaces/types";

const __Image = chakra<As, ImageProps>(_Image);

const Image: ComponentType<ImageProps> = ({ ...rest }: ImageProps) => (
  <__Image {...rest} />
);

Image.defaultProps = {
  fallback: fallbackImage,
};

export default Image;

// import { addPropertyControls, ControlType } from "framer";
//
// addPropertyControls(Image, {
//   src: {
//     type: ControlType.String,
//     defaultValue: "https://picsum.photos/150/150",
//   },
//   width: {
//     type: ControlType.String,
//     defaultValue: "150px",
//   },
//   height: {
//     type: ControlType.String,
//     defaultValue: "150px",
//   },
//   preview: {
//     type: ControlType.Boolean,
//     defaultValue: false,
//   },
// });
