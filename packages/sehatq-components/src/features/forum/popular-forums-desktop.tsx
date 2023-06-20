import React from "react";
import { Text } from "../../user-interfaces";
import {
  ForumHorizontalListDesktop,
  ForumHorizontalListDesktopProps,
} from "./forum-horizontal-list-desktop";

export function PopularForumsDesktop({
  forums,
  isLoading,
}: ForumHorizontalListDesktopProps) {
  return (
    <>
      <Text mb={3} fontSize="lg" fontFamily="poppins" fontWeight="semibold">
        Pertanyaan Terpopuler
      </Text>
      <ForumHorizontalListDesktop forums={forums} isLoading={isLoading} />
    </>
  );
}
