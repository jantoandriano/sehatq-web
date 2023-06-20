import React from "react";
import { Box, SimpleGrid } from "../../user-interfaces";
import {
  SimpleForumCard,
  SimpleForumCardProps,
  SimpleForumCardSkeleton,
} from "./simple-forum-card";

export interface ForumHorizontalListDesktopProps {
  forums: Omit<SimpleForumCardProps, "isMobile">[];
  isLoading: boolean;
}

export function ForumHorizontalListDesktop({
  forums,
  isLoading,
}: ForumHorizontalListDesktopProps) {
  return (
    <SimpleGrid mt={5} spacing={3} columns={forums.length || 5}>
      {forums.length
        ? forums.map((forum) => (
            <Box key={forum.slug}>
              <SimpleForumCard isMobile={false} {...forum} />
            </Box>
          ))
        : isLoading
        ? Array.from(Array(5).keys()).map((id) => (
            <Box key={id}>
              <SimpleForumCardSkeleton key={id} />
            </Box>
          ))
        : null}
    </SimpleGrid>
  );
}
