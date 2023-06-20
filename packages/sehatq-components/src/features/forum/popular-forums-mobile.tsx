import React from "react";
import { Text } from "../../user-interfaces";
import {
  ForumHorizontalListMobile,
  ForumHorizontalListMobileProps,
} from "./forum-horizontal-list-mobile";

export function PopularForumsMobile({
  forums,
  isLoading,
}: ForumHorizontalListMobileProps) {
  return (
    <>
      <Text mb={1} fontSize="lg" fontFamily="poppins" fontWeight="semibold">
        Pertanyaan Terpopuler
      </Text>
      <ForumHorizontalListMobile forums={forums} isLoading={isLoading} />
    </>
  );
}
