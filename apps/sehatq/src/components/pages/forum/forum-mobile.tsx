import React from "react";
import {
  AdSlot,
  Box,
  ForumAnswer,
  ForumCommentForm,
  ForumCommentList,
  ForumForm,
  ForumQuestion,
  ForumRatingInput,
  ForumTags,
  HStack,
  SehatQFooter,
  RelatedForums,
  VStack,
  RelatedArticles,
  Text,
  RegularTelemedicineBanner,
} from "@sehatq/components";
import { ForumGPTProvider } from "@components/gpt-provider/forum";
import { SehatQHeader } from "@components/ui/sehatq-header";
import { ForumHead } from "@components/head/forum";

export type ForumMobileProps = {
  isMobile: boolean;
  forumSlug: string;
  forumId: number;
  commentPage: number;
  commentPerPage: number;
  isAnswer: boolean;
  tagId: string;
};

export function ForumMobile(props: ForumMobileProps) {
  const { commentPage, commentPerPage, isAnswer, tagId } = props;
  return (
    <>
      <ForumHead />
      <ForumGPTProvider {...props} isMobile>
        <>
          <SehatQHeader variant="search" />
          <VStack
            background="white"
            padding={3}
            align="normal"
            spacing="5"
            justify="space-between"
          >
            <ForumQuestion {...props} />
            <AdSlot divId="div-gpt-ad-leaderboard" />
            {isAnswer && (
              <>
                <ForumAnswer {...props} />
                <Box paddingBottom={2}>
                  <Text
                    fontFamily="poppins"
                    fontWeight="semibold"
                    marginBottom={1}
                  >
                    Lanjutkan dengan Chat Dokter
                  </Text>
                  <Text fontSize="sm" marginBottom={3}>
                    Untuk mendapatkan diagnosa lebih akurat
                  </Text>
                  <RegularTelemedicineBanner isMobile={true} />
                </Box>
                <ForumTags {...props} />
                <ForumRatingInput {...props} />
              </>
            )}
            <AdSlot divId="div-gpt-ad-bot-leaderboard" />
            <ForumCommentList
              {...props}
              page={commentPage}
              perPage={commentPerPage}
            />
            <AdSlot divId="div-gpt-ad-mr1" />
          </VStack>
          {tagId && (
            <VStack
              background="#f5f5f5"
              py={2.5}
              align="normal"
              spacing="4"
              justify="space-between"
            >
              <Box pt={5} pb={4} px={4} align="normal" background="white">
                <RelatedForums {...props} />
              </Box>
              <Box pt={5} pb={4} px={4} background="white">
                <Text
                  fontFamily="poppins"
                  fontSize="lg"
                  fontWeight="semibold"
                  marginBottom={3}
                >
                  Article Terkait
                </Text>
                <RelatedArticles {...props} />
              </Box>
            </VStack>
          )}
          <Box background="white" p={3} pt={7} align="normal">
            <SehatQFooter {...props} />
          </Box>
          <AdSlot divId="div-gpt-ad-sticky" variant="fixed" bottom="72px" />
          <HStack
            position="sticky"
            bottom="0"
            p={4}
            background="white"
            direction="row"
            justify="space-between"
            spacing={2}
          >
            <ForumForm {...props} widthButton="40%" />
            <ForumCommentForm {...props} widthButton="60%" />
          </HStack>
        </>
      </ForumGPTProvider>
    </>
  );
}
