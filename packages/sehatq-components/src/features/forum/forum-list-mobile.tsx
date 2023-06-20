import React from "react";
import {
  Box,
  Center,
  Divider,
  PaginationLink,
  VStack,
} from "../../user-interfaces";
import { AdSlot } from "../google-publisher-tag";
import { ForumCard, ForumCardSkeleton } from "./forum-card";
import { ForumCardMobileProps } from "./forum-card-mobile";

export type ForumListMobileProps = {
  forums: ForumCardMobileProps[];
  page: string;
  maxPage: string;
  adsTop?: ReturnType<typeof AdSlot>;
  adsMiddle?: ReturnType<typeof AdSlot>;
  popularForumsMiddle?: React.ReactElement;
};

export function ForumListMobile(props: ForumListMobileProps) {
  const { forums, page, maxPage, adsTop, adsMiddle, popularForumsMiddle } =
    props;
  return (
    <>
      <VStack spacing="4" align="normal" background="iceBlue.500">
        {forums.length > 0
          ? forums.map((forum: ForumCardMobileProps, index) => {
              return (
                <Box key={forum.id}>
                  <Box px={4}>
                    <ForumCard isMobile {...forum} />
                  </Box>
                  {index == 0 && (
                    <Box mt={4} px={4}>
                      {adsTop}
                    </Box>
                  )}
                  {index == 4 && (
                    <Box mt={4} px={4}>
                      {adsMiddle}
                    </Box>
                  )}
                  {index == 2 && (
                    <Box mt={4} background="paleBlue.500" px={4} py={6}>
                      {popularForumsMiddle}
                    </Box>
                  )}
                </Box>
              );
            })
          : null}

        <Center mt="10px">
          <PaginationLink
            size="small"
            navigateOptions={{ shallow: true, scroll: true }}
            page={Number(page)}
            maxPage={Number(maxPage)}
            navigateName="FORUM"
          />
        </Center>
      </VStack>
    </>
  );
}

export function ForumListSkeletonMobile() {
  return (
    <>
      <VStack
        spacing="4"
        align="normal"
        divider={<Divider borderColor="veryLightPink" />}
        background="iceBlue.500"
      >
        {Array.from(Array(4).keys()).map((index) => {
          return (
            <Box px={4} key={index}>
              <ForumCardSkeleton isMobile />
            </Box>
          );
        })}
      </VStack>
    </>
  );
}
