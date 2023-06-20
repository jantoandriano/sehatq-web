import React from "react";
import { Box, Center, PaginationLink } from "../../user-interfaces";
import { AdSlot } from "../google-publisher-tag";
import { ForumsData } from "./forums-models";
import { ForumCard, ForumCardSkeleton } from "./forum-card";

export type ForumListDesktopProps = {
  forums: ForumsData["data"][];
  page: string;
  maxPage: string;
  adsMiddle?: ReturnType<typeof AdSlot>;
};

export function ForumListDesktop(props: ForumListDesktopProps) {
  const { forums, page, maxPage, adsMiddle } = props;
  return (
    <>
      {forums.map((forum: ForumsData["data"], index) => {
        return (
          <Box key={forum.id}>
            <Box pb={5}>
              <ForumCard {...forum} />
            </Box>
            {index == 4 && adsMiddle && <Box pb={5}>{adsMiddle}</Box>}
          </Box>
        );
      })}
      <Center mt={10}>
        <PaginationLink
          page={Number(page)}
          maxPage={Number(maxPage)}
          navigateName="FORUM"
          navigateOptions={{ shallow: true, scroll: true }}
        />
      </Center>
    </>
  );
}

export function ForumListSkeletonDesktop() {
  return (
    <>
      {Array.from(Array(4).keys()).map((index) => {
        return (
          <Box key={index} pb={8}>
            <ForumCardSkeleton />
          </Box>
        );
      })}
    </>
  );
}
