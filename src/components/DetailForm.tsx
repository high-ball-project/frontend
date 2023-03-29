import { Box, Flex } from "@chakra-ui/react";
import ContentMenuHeader from "@components/ContentMenuHeader";
import Text from "@components/Text";

export interface DetailFormProps {
  value: Record<"title" | "content" | "createdAt" | "category", any>;
  access?: boolean;
  onRemove?: () => void;
  onModify?: () => void;
}

const DetailForm = ({
  value,
  access = true,
  onRemove,
  onModify,
}: DetailFormProps) => (
  <Flex flexDir="column" gap={4}>
    <ContentMenuHeader
      data-testid="header"
      menus={
        access
          ? [
              {
                label: "수정하기",
                icon: "MdBorderColor",
                onClick: onModify,
              },
              {
                label: "삭제하기",
                icon: "MdDangerous",
                onClick: onRemove,
              },
            ]
          : []
      }
      title={value.title}
    />
    <Flex justifyContent="space-between">
      <Text color="subText" data-testid="category" fontSize="sm">
        {value.category}
      </Text>
      <Text color="subText" data-testid="createdAt" fontSize="sm">
        {value.createdAt}
      </Text>
    </Flex>
    <Box dangerouslySetInnerHTML={{ __html: value.content }} p={2} />
  </Flex>
);

export default DetailForm;
