import { Center } from "@chakra-ui/react";
import Link from "@components/Link";
import Text from "@components/Text";
import { ComponentType, ReactNode } from "react";

export interface ContentHeaderProps {
  title: string | ReactNode;
  rightTitle?: string | ReactNode;
  url?: string;
}

const ContentHeader: ComponentType<ContentHeaderProps> = ({
  title,
  rightTitle = "더보기",
  url,
}: ContentHeaderProps) => (
  <Center
    alignItems="end"
    borderBottom="1px solid"
    borderColor="border"
    data-testid="header"
    justifyContent="space-between"
    m={2}
    p={2}
  >
    {typeof title === "string" ? (
      <Text fontSize={["xl", "2xl"]} strong>
        {title}
      </Text>
    ) : (
      title
    )}
    {rightTitle && (
      <Link to={url}>
        {typeof rightTitle === "string" ? (
          <Text color="subText" data-testid="more" fontSize="xs" strong>
            {rightTitle}
          </Text>
        ) : (
          rightTitle
        )}
      </Link>
    )}
  </Center>
);

export default ContentHeader;

// import { addPropertyControls, ControlType } from "framer";
//
// addPropertyControls(ContentHeader, {
//   title: {
//     type: ControlType.String,
//     defaultValue: "Title Here",
//   },
//   rightTitle: {
//     type: ControlType.String,
//     defaultValue: "더보기",
//   },
//   url: {
//     type: ControlType.String,
//     defaultValue: "https://devfive.kr",
//   },
// });
