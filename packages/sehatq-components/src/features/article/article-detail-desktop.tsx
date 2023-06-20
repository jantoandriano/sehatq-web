import React from "react";
import { InView } from "react-intersection-observer";
import { VStack, Text, Box } from "../../user-interfaces";
import { AdSlot } from "../google-publisher-tag/ad-slot";
import { RelatedForums } from "../forum/related-forums";
import { GridBlock, GridBlockItem } from "../layout/grid-block";
import { SocialShare } from "../general/social-share";
import { ArticleHeadline } from "./article-headline";
import { RelatedArticles } from "./related-articles";
import { ArticleReferences } from "./article-references";
import { ArticleTags } from "./article-tags";
import { ArticleContent } from "./article-content";
import { PopularArticles } from "./popular-articles";

export type ArticleDetailDesktopProps = {
  articleSlug: string;
  tagId: string;
  shareUrl: string;
  submitArticleCounter: (inView: boolean) => void;
};

export function ArticleDetailDesktop(props: ArticleDetailDesktopProps) {
  const { tagId, articleSlug, shareUrl } = props;
  return (
    <GridBlock isReverse>
      <GridBlockItem>
        <VStack align="normal" spacing={5} justify="space-between" width={760}>
          <ArticleHeadline articleSlug={articleSlug} />
          <Box>
            <ArticleContent articleSlug={articleSlug} />
          </Box>
          <InView onChange={props.submitArticleCounter} triggerOnce />
          <AdSlot divId="gpt-ad-leaderboard" />
          <ArticleTags articleSlug={articleSlug} />
          <ArticleReferences articleSlug={articleSlug} />
          <SocialShare
            isMobile={false}
            px={6}
            py={4}
            spacing={5}
            sizeIcon="38"
            url={shareUrl}
            hideTitleSocial={true}
          />
          {tagId && (
            <>
              <Text
                pt={10}
                fontSize="3xl"
                fontWeight="semibold"
                fontFamily="poppins"
              >
                Artikel Terkait
              </Text>
              <RelatedArticles tagId={tagId} extended={1} />
              <Box marginTop={13}>
                <RelatedForums tagId={tagId} />
              </Box>
            </>
          )}
        </VStack>
      </GridBlockItem>
      <GridBlockItem>
        <Box mb="30px">
          <PopularArticles />
        </Box>
        <Box position="sticky" top="144px">
          <AdSlot divId="gpt-ad-mr1" />
        </Box>
      </GridBlockItem>
    </GridBlock>
  );
}
