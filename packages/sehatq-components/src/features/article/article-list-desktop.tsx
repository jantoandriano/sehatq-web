import { slugToName } from "@sehatq/utils";
import React from "react";
import { Box, Center, PaginationLink, Text } from "../../user-interfaces";
import { AdSlot } from "../google-publisher-tag";
import {
  ArticleBannerDesktop,
  ArticleBannerSkeletonDesktop,
  ArticleBannerDesktopProps,
} from "./article-banner-desktop";
import {
  ArticleCardDesktop,
  ArticleCardDesktopSkeleton,
  ArticleCardDesktopProps,
} from "./article-card-desktop";

export type ArticleListDesktopProps = {
  articles: ArticleCardDesktopProps[];
  featured?: ArticleBannerDesktopProps;
  page: string;
  maxPage: string;
  categorySlug?: string;
  adsMiddle?: ReturnType<typeof AdSlot>;
};

export function ArticleListDesktop(props: ArticleListDesktopProps) {
  const { articles, categorySlug, page, maxPage, featured, adsMiddle } = props;
  return (
    <>
      {featured && <ArticleBannerDesktop {...featured} />}
      <Text
        marginTop="20px"
        marginBottom="16px"
        fontSize="5xl"
        fontFamily="poppins"
        fontWeight="semibold"
        color="charcoalGrey"
        as="h1"
      >
        {categorySlug
          ? `Artikel Tentang ${slugToName(categorySlug)}`
          : "Artikel Terbaru"}
      </Text>
      {articles.map((article: ArticleCardDesktopProps, index: number) => {
        return (
          <>
            <Box key={article.slug} pb={8}>
              <ArticleCardDesktop {...article} imagePriority={index < 3} />
            </Box>
            {index == 4 && adsMiddle && <Box pb={8}>{adsMiddle}</Box>}
          </>
        );
      })}
      <Center mt="69px">
        <PaginationLink
          page={Number(page)}
          maxPage={Number(maxPage)}
          navigateName="ARTICLE"
          navigateOptions={{ shallow: true, scroll: true }}
        />
      </Center>
    </>
  );
}

export type ArticleListSkeletonDesktopProps = Pick<
  ArticleListDesktopProps,
  "categorySlug" | "adsMiddle"
>;

export function ArticleListSkeletonDesktop(props: ArticleListDesktopProps) {
  const { categorySlug, adsMiddle } = props;
  return (
    <>
      <ArticleBannerSkeletonDesktop />
      <Text
        marginTop="20px"
        marginBottom="16px"
        fontSize="5xl"
        fontFamily="poppins"
        fontWeight="semibold"
        color="charcoalGrey"
        as="h1"
      >
        {categorySlug
          ? `Artikel Tentang ${slugToName(categorySlug)}`
          : "Artikel Terbaru"}
      </Text>
      {Array.from(Array(4).keys()).map((index) => {
        return (
          <>
            <Box key={index} pb={8}>
              <ArticleCardDesktopSkeleton />
            </Box>
            {index == 1 && adsMiddle && <Box pb={8}>{adsMiddle}</Box>}
          </>
        );
      })}
    </>
  );
}
