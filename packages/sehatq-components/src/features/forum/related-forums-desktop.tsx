import React from "react";
import { Text } from "../../user-interfaces";
import {
  ForumHorizontalListDesktop,
  ForumHorizontalListDesktopProps,
} from "./forum-horizontal-list-desktop";

export function RelatedForumsDesktop({
  forums,
  isLoading,
}: ForumHorizontalListDesktopProps) {
  return (
    <>
      <Text fontSize="3xl" fontFamily="poppins" fontWeight="semibold">
        Diskusi Terkait di Forum
      </Text>
      <ForumHorizontalListDesktop forums={forums} isLoading={isLoading} />
    </>
  );
}
