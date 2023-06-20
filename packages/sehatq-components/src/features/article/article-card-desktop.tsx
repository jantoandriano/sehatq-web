import React from "react";
import { useNavigation } from "@sehatq/utils";
import {
  Box,
  Skeleton,
  Flex,
  Link,
  SkeletonText,
  HStack,
  VStack,
  useImage,
  LinkOverlay,
  LinkBox,
  Text,
  StarRating,
  Divider,
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

export type ArticleCardDesktopProps = {
  id: number;
  slug: string;
  title: string;
  category?: ArticleCategory;
  imageUrl?: string;
  imageAlt?: string;
  imagePriority?: boolean;
  author?: ArticleAuthor;
  date?: string;
  meta?: string;
  rating?: ArticleRating;
};

export function ArticleCardDesktop(props: ArticleCardDesktopProps) {
  const {
    slug,
    category,
    title,
    imageUrl,
    imageAlt,
    imagePriority,
    author,
    date,
    meta,
    rating,
  } = props;
  const { Navigate } = useNavigation();
  const Image = useImage();
  return (
    <LinkBox>
      <HStack align="start">
        <VStack align="flex-start" width="full">
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
                fontSize="sm"
                lineHeight="shorter"
                fontWeight="semibold"
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
              fontSize="3xl"
              lineHeight="base"
              fontWeight="semibold"
              pr={2}
              fontFamily="poppins"
              noOfLines={3}
            >
              {title}
            </LinkOverlay>
          </Navigate>
          <Text
            marginTop="2"
            fontSize="md"
            lineHeight="base"
            pr={2}
            color="charcoalGrey"
            noOfLines={3}
          >
            {meta}
          </Text>
          <HStack
            height="13px"
            spacing={2}
            divider={
              <Divider
                orientation="vertical"
                borderColor="brownGrey.500"
                border="solid 0.5px"
                style={{ marginTop: "2px" }}
              />
            }
          >
            {rating && (
              <>
                <StarRating
                  rating={rating?.average ?? 0}
                  useSingleStar
                  iconWidth="13px"
                  iconHeight="13px"
                />
                {rating?.totalReview && (
                  <Text marginLeft="1" fontSize="xs" color="brownGrey.500">
                    ({rating.totalReview})
                  </Text>
                )}
              </>
            )}
            <Text fontSize="sm" color="brownGrey.500">
              {date}
            </Text>
            {author && author.name && (
              <Navigate
                name="AUTHOR"
                query={{
                  slug: author.slug,
                }}
              >
                <Link
                  fontSize="sm"
                  color="brownGrey.500"
                  _hover={{
                    color: "sea.500",
                  }}
                >
                  {author.name}
                </Link>
              </Navigate>
            )}
          </HStack>
        </VStack>
        {imageUrl && (
          <Box>
            <Image
              src={imageUrl}
              alt={imageAlt}
              priority={imagePriority}
              layout="fill"
              objectFit="cover"
              sizes="187px"
              wrapperProps={{
                width: "187px",
                height: "187px",
                borderRadius: "xl",
                overflow: "hidden",
              }}
            />
          </Box>
        )}
      </HStack>
    </LinkBox>
  );
}

export function ArticleCardDesktopSkeleton() {
  const Image = useImage();
  return (
    <Flex align="center" justify="space-between">
      <Box>
        <Skeleton width={100} height={3} marginBottom={3} />
        <SkeletonText
          width={500}
          skeletonHeight={5}
          noOfLines={2}
          marginBottom={5}
        />
        <SkeletonText skeletonHeight={3} marginBottom={3} noOfLines={3} />
        <Skeleton width={100} height={3} />
      </Box>
      <Image
        src="https://www.sehatq.com/public/assets/img/no-image.jpg"
        alt="no image"
        layout="fill"
        objectFit="cover"
        wrapperProps={{
          cursor: "pointer",
          height: "187px",
          width: "187px",
          position: "relative",
          borderRadius: "xl",
          overflow: "hidden",
        }}
      />
    </Flex>
  );
}
