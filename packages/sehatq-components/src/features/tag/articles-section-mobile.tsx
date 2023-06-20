import React from "react";
import { useNavigation } from "@sehatq/utils";
import {
  Box,
  Text,
  VStack,
  StackDivider,
  Divider,
  Link,
  Skeleton,
} from "../../user-interfaces";
import {
  ArticleCard,
  ArticleCardSkeleton,
  ArticleBanner,
  ArticleBannerProps,
} from "../article";

export interface ArticlesSectionMobileProps {
  articles: Array<ArticleItemProps>;
  featured?: Omit<ArticleBannerProps, "isMobile">;
  tagSlug: string;
}

export interface ArticleCategory {
  name: string;
  slug: string;
}
export interface ArticleAuthor {
  name: string;
  slug: string;
}

export type ArticleRating = {
  average: number;
  totalReview: number;
};

export interface ArticleItemProps {
  id: number;
  slug: string;
  title: string;
  imageUrl: string;
  category: ArticleCategory;
  author: ArticleAuthor;
  date: string;
  rating?: ArticleRating;
}

export function ArticlesSectionMobile({
  articles,
  featured,
  tagSlug,
}: ArticlesSectionMobileProps) {
  const { Navigate } = useNavigation();
  return (
    <Box background="white">
      {featured && <ArticleBanner {...featured} isMobile />}
      <VStack p={4} spacing={4} align="flex-start">
        <Text
          fontSize="lg"
          fontWeight="semibold"
          fontFamily="poppins"
          textTransform="capitalize"
        >
          Artikel Seputar {tagSlug.split("-").join(" ")}
        </Text>
        <VStack
          spacing={4}
          width="100%"
          align="flex-start"
          divider={<StackDivider borderColor="veryLightPink" />}
        >
          {articles.length &&
            articles.map((article) => (
              <ArticleCard
                isMobile
                key={article.id}
                {...article}
                imageAlt={article.title}
              />
            ))}
        </VStack>
        <Divider borderColor="veryLightPink" />
        <Navigate name="ARTICLES">
          <Link
            textAlign="center"
            fontSize="sm"
            color="sea.500"
            fontWeight="semibold"
            width="100%"
            height="20px"
            variant="unstyled"
          >
            Lihat Semua Artikel
          </Link>
        </Navigate>
      </VStack>
    </Box>
  );
}

export function ArticleSectionMobileSkeleton() {
  return (
    <VStack p={4} background="white" spacing={4} align="flex-start">
      <Skeleton width="250px" height="23px" />
      <VStack
        spacing={4}
        divider={<StackDivider borderColor="veryLightPink" />}
      >
        {Array.from(Array(3).keys()).map((id) => (
          <ArticleCardSkeleton key={id} isMobile />
        ))}
      </VStack>
      <Divider borderColor="veryLightPink" />
      <Text
        textAlign="center"
        fontSize="sm"
        color="sea.500"
        fontWeight="semibold"
        width="100%"
        height="20px"
        variant="unstyled"
      >
        Lihat Semua Artikel
      </Text>
    </VStack>
  );
}
