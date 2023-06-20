import React from "react";
import { Text } from "../../user-interfaces";
import {
  ForumHorizontalListMobile,
  ForumHorizontalListMobileProps,
} from "./forum-horizontal-list-mobile";

export function RelatedForumsMobile({
  forums,
  isLoading,
}: ForumHorizontalListMobileProps) {
  return (
    <>
      <Text fontSize="lg" fontFamily="poppins" fontWeight="semibold">
        Diskusi Terkait di Forum
      </Text>
      <ForumHorizontalListMobile forums={forums} isLoading={isLoading} />
    </>
  );
}
