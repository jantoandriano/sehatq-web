import React from "react";
import { Box, Text, SkeletonText, Skeleton } from "../../user-interfaces";
export type TagHeadlineMobileProps = {
  title: string;
  description: string;
};

export function TagHeadlineMobile(props: TagHeadlineMobileProps) {
  const { title, description } = props;
  return (
    <Box>
      <Text
        as="h1"
        fontWeight="semibold"
        fontFamily="poppins"
        fontSize="xl"
        color="charcoalGrey"
      >
        Tag {title}
      </Text>
      <Text fontSize="md" color="charcoalGrey">
        {description}
      </Text>
    </Box>
  );
}

export function TagHeadlineMobileSkeleton() {
  return (
    <Box>
      <Skeleton height={3} marginBottom="2" width="28" />
      <SkeletonText noOfLines={3} />
    </Box>
  );
}
