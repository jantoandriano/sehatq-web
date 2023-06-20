import {
  AdSlot,
  Text,
  Box,
  GridBlock,
  GridBlockItem,
  SehatQFooter,
  ForumsCategoryFilter,
  ForumList,
  ForumForm,
  ForumsSorter,
  PopularForums,
  SimpleBlock,
  useImage,
  Center,
  VStack,
  HStack,
} from "@sehatq/components";
import React from "react";
import { ASSETS } from "@sehatq/constants";
import { SehatqNavbar } from "@components/ui/sehatq-navbar";
import { ForumsHead } from "@components/head";
import { ForumsGPTProvider } from "@components/gpt-provider/forums";

export type ForumsDesktopProps = {
  isMobile: boolean;
  page?: number;
  perPage?: number;
  categoryId?: string;
  categorySlug?: string;
  sortBy?: string;
  query?: string;
  answered?: boolean;
};

export function ForumsDesktop(props: ForumsDesktopProps) {
  const Image = useImage();
  return (
    <>
      <ForumsHead />
      <ForumsGPTProvider {...props}>
        <>
          <SehatqNavbar
            withCompanyPartner
            placeholderSearch="Cari Pertanyaan Dalam Forum"
            searchNavigation={{ name: "FORUM" }}
          />
          <GridBlock my={6} isReverse={false}>
            <GridBlockItem>
              <Center>
                <Image
                  src={ASSETS.FORUM_FORM_BANNER}
                  alt="forum-banner"
                  layout="fixed"
                  width={230}
                  height={146}
                  priority
                />
              </Center>
              <VStack
                direction="column"
                borderRadius="xl"
                boxShadow="base"
                background="white"
                p={4}
                width="full"
              >
                <Text
                  color="charcoalGrey"
                  fontFamily="poppins"
                  fontWeight="semibold"
                  fontSize="md"
                >
                  Ada keluhan atau pertanyaan? Dokter kami siap membantumu
                </Text>
                <ForumForm
                  isMobile={false}
                  disableNavigateBack={true}
                  textButton="Tulis Pertanyaan"
                  variant="solid"
                  background="main.500"
                  widthButton="full"
                />
              </VStack>
              <Box my={6}>
                <AdSlot divId="div-gpt-ad-mr2" />
              </Box>
              <ForumsCategoryFilter {...props} />
            </GridBlockItem>
            <GridBlockItem>
              <HStack justify="space-between" width="full" mb={6}>
                <Text
                  as="h1"
                  fontSize="6xl"
                  fontWeight="semibold"
                  fontFamily="poppins"
                >
                  Forum Tanya Dokter
                </Text>
                <ForumsSorter
                  isMobile={false}
                  selectedSorter={props.sortBy || "newest"}
                />
              </HStack>
              <ForumList
                {...props}
                adsMiddle={<AdSlot divId="div-gpt-ad-middleleaderboard" />}
              />
            </GridBlockItem>
          </GridBlock>
          <SimpleBlock marginY="60px">
            <PopularForums isMobile={false} />
          </SimpleBlock>
          <Box marginY={8}>
            <SehatQFooter {...props} />
          </Box>
        </>
      </ForumsGPTProvider>
    </>
  );
}
