import React from "react";
import {
  AdSlot,
  Box,
  Center,
  Divider,
  HStack,
  SehatQFooter,
  ForumsCategoryFilter,
  ForumsSorter,
  ForumList,
  ForumForm,
  PopularForums,
} from "@sehatq/components";
import { SehatQHeader } from "@components/ui/sehatq-header";
import { ForumsHead } from "@components/head";
import { ForumsGPTProvider } from "@components/gpt-provider/forums";

export type ForumsMobileProps = {
  isMobile: boolean;
  page?: number;
  perPage?: number;
  categoryId?: string;
  categorySlug?: string;
  sortBy?: string;
  query?: string;
  answered?: boolean;
};

export function ForumsMobile(props: ForumsMobileProps) {
  return (
    <>
      <ForumsHead />
      <ForumsGPTProvider {...props}>
        <Box background="iceBlue.500">
          <SehatQHeader
            variant="search"
            placeholderSearch="Cari Pertanyaan Dalam Forum"
            searchNavigation={{ name: "FORUM" }}
          />
          <Box p={4}>
            <ForumForm
              {...props}
              widthButton="full"
              textButton="Tulis Pertanyaanmu"
              heightButton="40px"
              variant="solid"
              background="main.500"
              borderRadius="base"
              disableNavigateBack={true}
            />
          </Box>
          <ForumList
            {...props}
            adsTop={<AdSlot divId="div-gpt-ad-leaderboard" />}
            adsMiddle={<AdSlot divId="div-gpt-ad-mr1" />}
            popularForumsMiddle={<PopularForums isMobile={true} />}
          />
          <Center
            position="sticky"
            bottom="58px"
            zIndex="docked"
            width="full"
            marginY={4}
          >
            <HStack
              textAlign="center"
              background="white"
              borderRadius="4xl"
              width="212px"
              height="41px"
              px={5}
              justify="space-between"
              divider={
                <Divider
                  height="20px"
                  orientation="vertical"
                  borderColor="veryLightPink"
                  border="solid 0.5px"
                />
              }
              boxShadow="base"
            >
              <ForumsSorter
                selectedSorter={props.sortBy || "newest"}
                {...props}
              />
              <ForumsCategoryFilter {...props} />
            </HStack>
          </Center>
          <AdSlot divId="div-gpt-ad-sticky" variant="fixed" />
          <Box background="white" px={3} paddingBottom={3}>
            <SehatQFooter {...props} />
          </Box>
        </Box>
      </ForumsGPTProvider>
    </>
  );
}
