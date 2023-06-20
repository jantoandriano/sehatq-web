import React from "react";
import { Box, Text, SkeletonText, Skeleton } from "../../user-interfaces";
export type TagHeadlineDesktopProps = {
  title: string;
  description: string;
};

export function TagHeadlineDesktop(props: TagHeadlineDesktopProps) {
  const { title, description } = props;
  return (
    <Box>
      <Text
        as="h1"
        fontWeight="semibold"
        fontFamily="poppins"
        fontSize="3xl"
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

export function TagHeadlineDesktopSkeleton() {
  return (
    <Box>
      <Skeleton height={3} marginBottom="2" width="28" />
      <SkeletonText noOfLines={3} />
    </Box>
  );
}
