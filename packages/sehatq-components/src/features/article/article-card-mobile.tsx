import React from "react";
import { useNavigation } from "@sehatq/utils";
import {
  Text,
  Link,
  Box,
  Skeleton,
  Flex,
  SkeletonText,
  HStack,
  VStack,
  useImage,
  LinkBox,
  LinkOverlay,
  StarRating,
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

export type ArticleCardMobileProps = {
  id: number;
  slug: string;
  title: string;
  category?: ArticleCategory;
  imageUrl?: string;
  imageAlt?: string;
  imagePriority?: boolean;
  author?: ArticleAuthor;
  date?: string;
  rating?: ArticleRating;
};

export function ArticleCardMobile(props: ArticleCardMobileProps) {
  const {
    slug,
    category,
    title,
    imageUrl,
    imageAlt,
    imagePriority,
    author,
    date,
    rating,
  } = props;
  const { Navigate } = useNavigation();
  const Image = useImage();
  return (
    <LinkBox width="100%">
      <HStack align="start">
        <VStack spacing="1" align="flex-start" width="full">
          {category && (
            <Navigate
              name="ARTICLE"
              query={{
                slugs: [category.slug],
              }}
              options={{ shallow: true, scroll: true }}
            >
              <Link
                color="sea.500"
                fontSize="xxs"
                fontWeight="semibold"
                lineHeight="normal"
                _hover={{
                  color: "main.500",
                }}
              >
                {category.name}
              </Link>
            </Navigate>
          )}
          <Navigate
            name="ARTICLE"
            query={{
              slugs: [slug],
            }}
          >
            <LinkOverlay
              noOfLines={3}
              fontSize="sm"
              lineHeight="base"
              fontWeight="semibold"
              fontFamily="poppins"
              pr={2}
            >
              {title}
            </LinkOverlay>
          </Navigate>
          {rating && (
            <HStack spacing={1} fontSize="xxs">
              <StarRating
                fontSize="xxs"
                rating={rating?.average ?? 0}
                useSingleStar
                iconWidth="10px"
                iconHeight="10px"
              />
              {rating?.totalReview && (
                <Text color="brownGrey.500">({rating.totalReview})</Text>
              )}
            </HStack>
          )}
          <Text fontSize="xxs" color="brownGrey.500">
            {date}
            {author && author.name && (
              <Navigate
                name="AUTHOR"
                query={{
                  slug: author.slug,
                }}
              >
                <Link
                  marginLeft={1}
                  fontSize="xxs"
                  color="brownGrey.500"
                  _hover={{
                    color: "sea.500",
                  }}
                >
                  | {author.name}
                </Link>
              </Navigate>
            )}
          </Text>
        </VStack>
        {imageUrl && (
          <Box>
            <Image
              src={imageUrl}
              alt={imageAlt}
              priority={imagePriority}
              layout="fill"
              objectFit="cover"
              sizes="90px"
              wrapperProps={{
                cursor: "pointer",
                boxSize: "90px",
                position: "relative",
                borderRadius: "base",
                overflow: "hidden",
              }}
            />
          </Box>
        )}
      </HStack>
    </LinkBox>
  );
}

export function ArticleCardMobileSkeleton() {
  const Image = useImage();
  return (
    <Flex align="center" justify="space-between">
      <Box>
        <Skeleton width={50} height={2} marginBottom={3} />
        <SkeletonText
          width={200}
          skeletonHeight={3}
          noOfLines={2}
          marginBottom={3}
        />
        <Skeleton width={160} height={2} />
      </Box>
      <Image
        src="https://www.sehatq.com/public/assets/img/no-image.jpg"
        alt="no image"
        layout="fill"
        objectFit="cover"
        wrapperProps={{
          cursor: "pointer",
          boxSize: "90px",
          position: "relative",
          borderRadius: "base",
          overflow: "hidden",
        }}
      />
    </Flex>
  );
}
