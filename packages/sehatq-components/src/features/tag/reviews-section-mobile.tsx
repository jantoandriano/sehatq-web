import React, { useState } from "react";
import { useNavigation, useAssets } from "@sehatq/utils";

import {
  Box,
  Text,
  LinkOverlay,
  LinkBox,
  Link,
  HStack,
  VStack,
  Divider,
  StackDivider,
  Skeleton,
  useImage,
} from "../../user-interfaces";
import { ReviewBanner } from "../review";

export interface ReviewsSectionMobileProps {
  reviews: Array<ReviewItemProps>;
  featured: ReviewItemProps | null;
  tagSlug: string;
}

export interface ReviewCategory {
  name: string;
  slug: string;
}

export interface ReviewAuthor {
  name: string;
  slug: string;
}

export interface ReviewItemProps {
  id: number;
  slug: string;
  title: string;
  imageUrl: string;
  imageAlt: string;
  category: ReviewCategory;
  author: ReviewAuthor;
  publishedDate: string;
}

const ReviewItem = (props: ReviewItemProps) => {
  const [isBrokenAvatar, setIsBrokenAvatar] = useState(false);
  const Image = useImage();
  const ASSETS = useAssets(["NO_IMAGE"]);
  const { Navigate } = useNavigation();
  const { imageUrl, imageAlt, title, slug, category, author, publishedDate } =
    props;

  function onAvatarError() {
    setIsBrokenAvatar(true);
  }
  return (
    <LinkBox width="100%">
      <HStack align="start" spacing={2.5}>
        <VStack spacing="1" align="flex-start" width="full">
          <Text
            color="sea.500"
            fontSize="xxs"
            lineHeight="normal"
            fontWeight="semibold"
          >
            {category.name}
          </Text>
          <Navigate name="REVIEW" query={{ slug }}>
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
          <Text fontSize="xxs" color="brownGrey.500">
            {publishedDate}
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
        <Box>
          <Image
            src={isBrokenAvatar ? `${ASSETS.NO_IMAGE}` : imageUrl}
            alt={imageAlt}
            layout="fill"
            objectFit="cover"
            onError={onAvatarError}
            wrapperProps={{
              cursor: "pointer",
              boxSize: "90px",
              position: "relative",
              borderRadius: "base",
              overflow: "hidden",
            }}
          />
        </Box>
      </HStack>
    </LinkBox>
  );
};

export function ReviewsSectionMobile({
  reviews,
  featured,
  tagSlug,
}: ReviewsSectionMobileProps) {
  const { Navigate } = useNavigation();
  return (
    <Box background="white">
      {featured && <ReviewBanner {...featured} isMobile />}
      <VStack p={4} spacing={4} align="flex-start">
        <Text
          fontSize="lg"
          fontWeight="semibold"
          fontFamily="poppins"
          textTransform="capitalize"
        >
          Review Seputar {tagSlug.split("-").join(" ")}
        </Text>
        <VStack
          spacing={4}
          width="100%"
          align="flex-start"
          divider={<StackDivider borderColor="veryLightPink" />}
        >
          {reviews.length &&
            reviews.map((review) => <ReviewItem key={review.id} {...review} />)}
        </VStack>
        <Divider borderColor="veryLightPink" />
        <Navigate name="REVIEWS">
          <Link
            textAlign="center"
            fontSize="sm"
            color="sea.500"
            fontWeight="semibold"
            width="100%"
            height="20px"
            variant="unstyled"
          >
            Lihat Semua
          </Link>
        </Navigate>
      </VStack>
    </Box>
  );
}

export function ReviewSectionMobileSkeleton() {
  const Image = useImage();
  return (
    <VStack p={4} background="white" spacing={4} align="flex-start">
      <Skeleton width="320px" height="23px" />
      <VStack
        spacing={4}
        width="100%"
        align="flex-start"
        divider={<StackDivider borderColor="veryLightPink" />}
      >
        {Array.from(Array(3).keys()).map((id) => (
          <HStack key={id} spacing={2.5}>
            <VStack spacing={0.5} align="flex-start">
              <Skeleton width="131px" height="14px" />
              <Skeleton width="224px" height="42px" />
              <Skeleton width="200px" height="14px" />
            </VStack>
            <Image
              src="https://www.sehatq.com/public/assets/img/no-image.jpg"
              alt="no image"
              layout="fill"
              objectFit="cover"
              wrapperProps={{
                boxSize: "90px",
                position: "relative",
                borderRadius: "base",
                overflow: "hidden",
              }}
            />
          </HStack>
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
        Lihat Semua
      </Text>
    </VStack>
  );
}
