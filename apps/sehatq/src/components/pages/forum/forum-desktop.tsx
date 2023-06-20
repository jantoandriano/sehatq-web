import React from "react";
import {
  AdSlot,
  Box,
  ForumAnswer,
  ForumCommentForm,
  ForumCommentList,
  ForumQuestion,
  ForumRatingInput,
  ForumTags,
  GridBlock,
  GridBlockItem,
  SehatQFooter,
  VStack,
  RelatedForums,
  RelatedArticles,
  Text,
} from "@sehatq/components";
import { ForumGPTProvider } from "@components/gpt-provider/forum";
import { SehatqNavbar } from "@components/ui/sehatq-navbar";
import { ForumHead } from "@components/head/forum";

export type ForumDesktopProps = {
  isMobile: boolean;
  forumSlug: string;
  forumId: number;
  commentPage: number;
  commentPerPage: number;
  isAnswer: boolean;
  tagId: string;
};

export function ForumDesktop(props: ForumDesktopProps) {
  const { commentPage, commentPerPage, isAnswer, tagId } = props;
  return (
    <>
      <ForumHead />
      <ForumGPTProvider {...props}>
        <>
          <SehatqNavbar withCompanyPartner />
          <GridBlock my={6} isReverse>
            <GridBlockItem>
              <VStack
                align="normal"
                spacing={5}
                justify="space-between"
                width={760}
              >
                <ForumQuestion {...props} />
                {isAnswer && (
                  <>
                    <ForumAnswer {...props} />
                    <ForumTags {...props} />
                    <ForumRatingInput {...props} />
                  </>
                )}
                <ForumCommentForm {...props} />
                <ForumCommentList
                  {...props}
                  page={commentPage}
                  perPage={commentPerPage}
                />
              </VStack>
              {tagId && (
                <VStack align="normal" spacing="4" justify="space-between">
                  <Box pt={5} pb={4} align="normal" background="white">
                    <RelatedForums {...props} />
                  </Box>
                  <Box pt={5} pb={4} background="white">
                    <Text
                      fontFamily="poppins"
                      fontSize="3xl"
                      fontWeight="semibold"
                      marginBottom={5}
                    >
                      Article Terkait
                    </Text>
                    <RelatedArticles {...props} />
                  </Box>
                </VStack>
              )}
            </GridBlockItem>
            <GridBlockItem>
              <Box position="sticky" top="144px">
                <AdSlot divId="div-gpt-ad-mr1" />
              </Box>
            </GridBlockItem>
          </GridBlock>
          <Box marginBottom={10} marginTop={32}>
            <SehatQFooter {...props} />
          </Box>
        </>
      </ForumGPTProvider>
    </>
  );
}
