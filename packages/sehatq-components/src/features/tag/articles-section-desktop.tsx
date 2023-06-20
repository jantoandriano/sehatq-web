import React from "react";
import { useNavigation } from "@sehatq/utils";
import { Divider } from "@chakra-ui/react";

import {
  Box,
  StarRating,
  Text,
  LinkOverlay,
  LinkBox,
  Link,
  HStack,
  VStack,
  StackDivider,
  Skeleton,
  useImage,
} from "../../user-interfaces";

export interface ArticlesSectionDesktopProps {
  articles: Array<ArticleItemProps>;
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
  imageUrl: string;
  title: string;
  category: ArticleCategory;
  author: ArticleAuthor;
  date: string;
  rating?: ArticleRating;
}

const ArticleItem = (props: ArticleItemProps) => {
  const Image = useImage();
  const { Navigate } = useNavigation();
  const { imageUrl, title, slug, rating } = props;
  return (
    <LinkBox>
      <HStack spacing={2.5} align="flex-start">
        <Box>
          <Image
            src={imageUrl}
            alt={title}
            layout="fill"
            objectFit="cover"
            wrapperProps={{
              boxSize: "60px",
              position: "relative",
              borderRadius: "base",
              overflow: "hidden",
            }}
          />
        </Box>
        <VStack spacing={0.5} align="flex-start">
          <Navigate
            name="ARTICLE"
            query={{
              slugs: [slug],
            }}
          >
            <LinkOverlay
              fontWeight="semibold"
              fontSize="sm"
              color="main"
              noOfLines={2}
            >
              {title}
            </LinkOverlay>
          </Navigate>
          <StarRating
            rating={rating?.average ?? 0}
            ratingTotal={rating?.totalReview ?? 0}
            useSingleStar
            iconWidth={2.5}
            iconHeight={2.5}
            fontSize="xxs"
          />
        </VStack>
      </HStack>
    </LinkBox>
  );
};

export function ArticlesSectionDesktop({
  articles,
  tagSlug,
}: ArticlesSectionDesktopProps) {
  const { Navigate } = useNavigation();
  return (
    <VStack
      px={5}
      pt={5}
      pb={2}
      boxShadow="base"
      borderRadius="xl"
      background="white"
      spacing={4}
      align="flex-start"
      minW="352px"
      maxH="440px"
      height="fit-content"
    >
      <Text
        fontSize="xl"
        fontWeight="semibold"
        fontFamily="poppins"
        textTransform="capitalize"
      >
        Artikel {tagSlug.split("-").join(" ")}
      </Text>
      <Divider borderColor="veryLightPink" />
      <VStack
        spacing={4}
        width="100%"
        align="flex-start"
        divider={<StackDivider borderColor="veryLightPink" />}
      >
        {articles.length &&
          articles.map((article) => (
            <ArticleItem key={article.id} {...article} />
          ))}
      </VStack>
      <Navigate name="ARTICLES">
        <Link
          textAlign="center"
          fontSize="sm"
          color="sea.500"
          fontWeight="semibold"
          width="100%"
          variant="unstyled"
        >
          Lihat Semua Artikel
        </Link>
      </Navigate>
    </VStack>
  );
}

export function ArticleSectionDesktopSkeleton() {
  const Image = useImage();
  return (
    <VStack
      px={5}
      pt={5}
      pb={3}
      boxShadow="base"
      borderRadius="xl"
      background="white"
      spacing={4}
      align="flex-start"
    >
      <Skeleton width="312px" height="28px" />
      <Divider borderColor="veryLightPink" />
      <VStack
        spacing={4}
        divider={<StackDivider borderColor="veryLightPink" />}
      >
        {Array.from(Array(3).keys()).map((id) => (
          <HStack key={id} spacing={2.5}>
            <Image
              src="https://www.sehatq.com/public/assets/img/no-image.jpg"
              alt="no image"
              layout="fill"
              objectFit="cover"
              wrapperProps={{
                boxSize: "60px",
                position: "relative",
                borderRadius: "base",
                overflow: "hidden",
              }}
            />
            <VStack align="flex-start">
              <Skeleton width="240px" height="15px" />
              <Skeleton width="140px" height="15px" />
              <Skeleton width="50px" height="13px" />
            </VStack>
          </HStack>
        ))}
      </VStack>
      <Text
        textAlign="center"
        fontSize="sm"
        color="sea.500"
        fontWeight="semibold"
        width="100%"
        variant="unstyled"
      >
        Lihat Semua Artikel
      </Text>
    </VStack>
  );
}
