import React from "react";
import { InView } from "react-intersection-observer";
import { VStack, Text, Box } from "../../user-interfaces";
import { AdSlot } from "../google-publisher-tag/ad-slot";
import { RelatedForums } from "../forum/related-forums";
import { SocialShare } from "../general/social-share";
import { ArticleHeadline } from "./article-headline";
import { RelatedArticles } from "./related-articles";
import { ArticleReferences } from "./article-references";
import { ArticleTags } from "./article-tags";
import { ArticleContent } from "./article-content";

export type ArticleDetailMobileProps = {
  tagId: string;
  articleSlug: string;
  shareUrl: string;
  quantity: number;
  submitArticleCounter: (inView: boolean) => void;
};

export function ArticleDetailMobile(props: ArticleDetailMobileProps) {
  const { shareUrl, tagId, articleSlug } = props;
  return (
    <Box background="#f5f5f5" marginTop={3}>
      <VStack
        background="white"
        paddingX={3}
        paddingBottom={3}
        align="normal"
        spacing="5"
        justify="space-between"
      >
        <ArticleHeadline isMobile articleSlug={articleSlug} />
        <Box>
          <ArticleContent isMobile articleSlug={articleSlug} />
        </Box>
        <InView onChange={props.submitArticleCounter} triggerOnce />
        <AdSlot divId="gpt-ad-leaderboard" />
        <ArticleTags isMobile articleSlug={articleSlug} />
        <ArticleReferences isMobile articleSlug={articleSlug} />
        <AdSlot divId="gpt-ad-bot-leaderboard" />
        <SocialShare
          isMobile={true}
          px={4}
          py={3}
          spacing={3}
          sizeIcon="38"
          url={shareUrl}
          hideTitleShare={true}
          hideTitleSocial={true}
        />
      </VStack>
      {tagId && (
        <>
          <VStack
            marginTop="2"
            marginBottom="2"
            background="white"
            px={3}
            py={5}
            align="normal"
            spacing="4"
            justify="space-between"
          >
            <Text fontSize="lg" fontWeight="semibold" fontFamily="poppins">
              Artikel Terkait
            </Text>
            <RelatedArticles isMobile tagId={tagId} extended={1} />
          </VStack>
          <Box
            pt={5}
            pb={3}
            px={3}
            align="normal"
            marginBottom="2"
            background="white"
          >
            <RelatedForums isMobile tagId={tagId} />
          </Box>
        </>
      )}
      <AdSlot divId="gpt-ad-sticky" variant="sticky" />
    </Box>
  );
}
