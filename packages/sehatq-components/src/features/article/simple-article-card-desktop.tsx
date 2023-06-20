import React from "react";
import { useNavigation } from "@sehatq/utils";
import {
  Box,
  Skeleton,
  Link,
  SkeletonText,
  useImage,
  LinkOverlay,
  LinkBox,
  Text,
} from "../../user-interfaces";

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

export type SimpleArticleCardDesktopProps = {
  slug: string;
  category: ArticleCategory;
  title: string;
  imageUrl?: string;
  imageAlt?: string;
  date: string;
};

export function SimpleArticleCardDesktop(props: SimpleArticleCardDesktopProps) {
  const { slug, category, title, imageUrl, imageAlt, date } = props;
  const { Navigate } = useNavigation();
  const Image = useImage();
  return (
    <LinkBox
      borderRadius="base"
      overflow="hidden"
      boxShadow="base"
      height="100%"
    >
      {imageUrl && (
        <Image
          src={imageUrl}
          alt={imageAlt || title}
          layout="fill"
          objectFit="cover"
          sizes="144px"
          wrapperProps={{
            width: "100%",
            paddingBottom: "100%",
          }}
        />
      )}
      <Box padding={2.5} backgroundColor="white" height="100%">
        <Navigate
          name="ARTICLE"
          query={{
            slugs: [category.slug],
          }}
          options={{ shallow: true, scroll: true }}
        >
          <Link fontSize="xs" colorScheme="sea" fontWeight="semibold">
            {category.name}
          </Link>
        </Navigate>
        <Navigate
          name="ARTICLE"
          query={{
            slugs: [slug],
          }}
        >
          <LinkOverlay
            fontSize="sm"
            fontWeight="semibold"
            fontFamily="poppins"
            noOfLines={4}
            lineHeight="shorter"
          >
            {title}
          </LinkOverlay>
        </Navigate>
        <Text fontSize="xs" color="brownGrey.500" marginTop={1.5}>
          {date}
        </Text>
      </Box>
    </LinkBox>
  );
}

export function SimpleArticleCardDesktopSkeleton() {
  const Image = useImage();
  return (
    <Box borderRadius="base" overflow="hidden" boxShadow="base">
      <Image
        src="https://www.sehatq.com/public/assets/img/no-image.jpg"
        alt="no image"
        layout="fill"
        objectFit="cover"
        wrapperProps={{
          cursor: "pointer",
          boxSize: "144px",
        }}
      />
      <Box padding={2.5} backgroundColor="white">
        <Skeleton width="70px" height={2.5} marginBottom={1.5} />
        <SkeletonText skeletonHeight={2.5} noOfLines={4} spacing={1} />
        <Skeleton width="60px" height={2} marginTop={2} />
      </Box>
    </Box>
  );
}
