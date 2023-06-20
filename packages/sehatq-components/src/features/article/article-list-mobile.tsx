import { slugToName } from "@sehatq/utils";
import React from "react";
import {
  Box,
  Center,
  Divider,
  PaginationLink,
  VStack,
  Text,
} from "../../user-interfaces";
import { AdSlot } from "../google-publisher-tag";
import {
  ArticleBannerMobile,
  ArticleBannerSkeletonMobile,
  ArticleBannerMobileProps,
} from "./article-banner-mobile";
import {
  ArticleCardMobile,
  ArticleCardMobileSkeleton,
  ArticleCardMobileProps,
} from "./article-card-mobile";

export type ArticleListMobileProps = {
  articles: ArticleCardMobileProps[];
  featured?: ArticleBannerMobileProps;
  page: string;
  maxPage: string;
  categorySlug?: string;
  adsTop?: ReturnType<typeof AdSlot>;
  adsMiddle?: ReturnType<typeof AdSlot>;
  adsBottom?: ReturnType<typeof AdSlot>;
};

export function ArticleListMobile(props: ArticleListMobileProps) {
  const {
    articles,
    page,
    maxPage,
    featured,
    adsTop,
    adsBottom,
    adsMiddle,
    categorySlug,
  } = props;
  return (
    <>
      {featured && <ArticleBannerMobile {...featured} />}
      {adsTop && <Box pt={3}>{adsTop}</Box>}
      <Box p={3} align="normal">
        <Text
          marginTop="20px"
          marginBottom="12px"
          fontSize="md"
          fontFamily="poppins"
          fontWeight="semibold"
          color="charcoalGrey"
          as="h1"
        >
          {categorySlug
            ? `Artikel Tentang ${slugToName(categorySlug)}`
            : "Artikel Terbaru"}
        </Text>
        <VStack
          spacing="3"
          align="normal"
          divider={<Divider borderColor="veryLightPink" />}
        >
          {articles.length > 0
            ? articles.map((article: ArticleCardMobileProps, index: number) => {
                return (
                  <>
                    {index == 5 && adsMiddle && (
                      <Box pt={4} pb={6}>
                        {adsMiddle}
                      </Box>
                    )}
                    <Box key={article.slug}>
                      <ArticleCardMobile
                        key={article.id}
                        {...article}
                        imagePriority={index < 3}
                      />
                    </Box>
                  </>
                );
              })
            : null}

          <Center mt="10px">
            <VStack spacing={5}>
              {adsBottom}
              <PaginationLink
                size="small"
                navigateOptions={{ shallow: true, scroll: true }}
                page={Number(page)}
                maxPage={Number(maxPage)}
                navigateName="ARTICLE"
              />
            </VStack>
          </Center>
        </VStack>
      </Box>
    </>
  );
}

export type ArticleListSkeletonDesktopProps = Pick<
  ArticleListMobileProps,
  "categorySlug" | "adsTop" | "adsMiddle" | "adsBottom"
>;

export function ArticleListSkeletonMobile(props: ArticleListMobileProps) {
  const { adsTop, adsBottom, adsMiddle, categorySlug } = props;
  return (
    <>
      <ArticleBannerSkeletonMobile />
      {adsTop && <Box pt={3}>{adsTop}</Box>}
      <Box p={3} align="normal">
        <Text
          marginTop="20px"
          marginBottom="12px"
          fontSize="md"
          fontFamily="poppins"
          fontWeight="semibold"
          color="charcoalGrey"
          as="h1"
        >
          {categorySlug
            ? `Artikel Tentang ${slugToName(categorySlug)}`
            : "Artikel Terbaru"}
        </Text>
        <VStack
          spacing="3"
          align="normal"
          divider={<Divider borderColor="veryLightPink" />}
        >
          {Array.from(Array(4).keys()).map((index) => {
            return (
              <React.Fragment key={index}>
                {index == 2 && adsMiddle && (
                  <Box pt={4} pb={6}>
                    {adsMiddle}
                  </Box>
                )}
                <ArticleCardMobileSkeleton />
              </React.Fragment>
            );
          })}

          <Center mt="10px">{adsBottom}</Center>
        </VStack>
      </Box>
    </>
  );
}
