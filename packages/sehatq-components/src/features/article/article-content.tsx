import React from "react";
import { insertHTMLContent, useNavigation } from "@sehatq/utils";
import { Content, getFirstTextNode } from "../layout";
import {
  SkeletonText,
  VStack,
  Box,
  UnorderedList,
  Text,
  ListItem,
  Link,
} from "../../user-interfaces";
import { ArticleCache, useGetArticle } from "./article-queries";
import {
  useGetRelatedArticles,
  RelatedArticlesCache,
} from "./related-article-queries";

export type ArticleContentProps = {
  isMobile?: boolean;
  articleSlug: string;
};

function selectRelatedArticles(cache: RelatedArticlesCache) {
  return cache.data;
}

function selectArticle(article: ArticleCache) {
  return article.data;
}

export function ArticleContent(props: ArticleContentProps) {
  const { isMobile, articleSlug } = props;

  const { data: article } = useGetArticle(
    { articleSlug },
    { select: selectArticle }
  );

  if (!article) {
    return (
      <VStack>
        <SkeletonText skeletonHeight="3" noOfLines={5} spacing={3} />
      </VStack>
    );
  }

  let newArticleContent = article?.content ?? "";
  let inlineRelatedArticlesCounter = 1;
  newArticleContent = newArticleContent.replace(
    /\[\[artikel-terkait\]\]/gi,
    () => {
      inlineRelatedArticlesCounter += 1;
      return `${inlineRelatedArticlesCounter}-artikel-terkait`;
    }
  );
  if (isMobile) {
    const mr1 = `<div id="gpt-ad-mr1" class="ad-slot" variant="normal"></div>`;
    newArticleContent = insertHTMLContent(newArticleContent, "p", 1, mr1, true);

    const mr2 = `<div id="gpt-ad-mr2" class="ad-slot" variant="normal"></div>`;
    newArticleContent = insertHTMLContent(newArticleContent, "h2", 2, mr2);

    const flying = `<div id="gpt-ad-flyingcarpet" class="ad-slot" variant="flying-carpet"></div>`;
    newArticleContent = insertHTMLContent(newArticleContent, "h3", 1, flying);
  } else {
    const middleLeaderboard = `<div id="gpt-ad-middleleaderboard" class="ad-slot" variant="normal"></div>`;
    newArticleContent = insertHTMLContent(
      newArticleContent,
      "p",
      1,
      middleLeaderboard,
      true
    );
  }
  const tagId = article.tags?.map((tag) => tag.id).join(",");

  return (
    <Content
      isMobile={isMobile}
      hasTableOfContent
      renderCustomElement={(node) => {
        if (getFirstTextNode(node)?.data?.includes("artikel-terkait")) {
          const [repeater] = getFirstTextNode(node).data.split("-");
          return tagId ? (
            <InlineRelatedArticles
              isMobile={isMobile}
              tagId={tagId}
              repeater={repeater}
            />
          ) : (
            <></>
          );
        }
      }}
    >
      {newArticleContent}
    </Content>
  );
}

interface InlineRelatedArticlesProps {
  repeater: string;
  tagId: string;
  isMobile?: boolean;
}

function InlineRelatedArticles(props: InlineRelatedArticlesProps) {
  const { tagId, repeater, isMobile = false } = props;
  const { Navigate } = useNavigation();

  const query = {
    quantity: "3",
    repeater,
    tagId,
  };

  const { data: relatedArticles } = useGetRelatedArticles(query, {
    select: selectRelatedArticles,
  });
  return (
    <Box
      my={5}
      py={isMobile ? 4 : 5}
      px={isMobile ? 5 : 6}
      background="iceBlue.500"
      borderRadius="xl"
    >
      <Text fontFamily="poppins" fontWeight="semibold" mb={2}>
        Baca Juga
      </Text>
      {relatedArticles ? (
        <UnorderedList>
          {relatedArticles?.map((relatedArticle) => (
            <ListItem key={relatedArticle.id} marginTop={2}>
              <Navigate name="ARTICLE" query={{ slugs: [relatedArticle.slug] }}>
                <Link colorScheme="sea" fontSize={isMobile ? "sm" : "md"}>
                  {relatedArticle.title}
                </Link>
              </Navigate>
            </ListItem>
          ))}
        </UnorderedList>
      ) : (
        <SkeletonText skeletonHeight="3" spacing={3} />
      )}
    </Box>
  );
}
