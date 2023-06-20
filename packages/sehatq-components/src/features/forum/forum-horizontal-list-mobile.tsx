import React from "react";
import { Flex, Box } from "../../user-interfaces";
import {
  SimpleForumCard,
  SimpleForumCardProps,
  SimpleForumCardSkeleton,
} from "./simple-forum-card";

export interface ForumHorizontalListMobileProps {
  forums: Omit<SimpleForumCardProps, "isMobile">[];
  isLoading: boolean;
}

export function ForumHorizontalListMobile({
  forums,
  isLoading,
}: ForumHorizontalListMobileProps) {
  return (
    <Flex
      width="calc(100% + 24px)"
      overflowX="auto"
      marginLeft={-3}
      mt={1.5}
      py={2}
      px={3}
    >
      {forums.length
        ? forums.map((forum, index) => (
            <Box
              minWidth="244px"
              key={forum.slug}
              marginLeft={index === 0 ? 0 : 3}
            >
              <SimpleForumCard isMobile {...forum} />
            </Box>
          ))
        : isLoading
        ? Array.from(Array(3).keys()).map((id, index) => (
            <Box
              key={id}
              marginRight={3}
              marginLeft={index === 0 ? 3 : 0}
              minWidth="244px"
            >
              <SimpleForumCardSkeleton key={id} />
            </Box>
          ))
        : null}
    </Flex>
  );
}
