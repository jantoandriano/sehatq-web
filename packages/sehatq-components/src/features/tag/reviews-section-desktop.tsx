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

export interface ReviewsSectionDesktopProps {
  reviews: Array<ReviewItemProps>;
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
  imageUrl: string;
  imageAlt: string;
  title: string;
  author: ReviewAuthor;
  publishedDate: string;
}

const ReviewItem = (props: ReviewItemProps) => {
  const [isBrokenAvatar, setIsBrokenAvatar] = useState(false);
  const Image = useImage();
  const ASSETS = useAssets(["NO_IMAGE"]);
  const { Navigate } = useNavigation();
  const { imageUrl, imageAlt, title, slug, author, publishedDate } = props;

  function onAvatarError() {
    setIsBrokenAvatar(true);
  }

  return (
    <LinkBox>
      <HStack spacing={2.5} align="flex-start">
        <Box>
          <Image
            src={isBrokenAvatar ? `${ASSETS.NO_IMAGE}` : imageUrl}
            alt={imageAlt}
            layout="fill"
            objectFit="cover"
            onError={onAvatarError}
            wrapperProps={{
              boxSize: "60px",
              position: "relative",
              borderRadius: "base",
              overflow: "hidden",
            }}
          />
        </Box>
        <VStack spacing={0.5} align="flex-start">
          <Navigate name="REVIEW" query={{ slug }}>
            <LinkOverlay fontWeight="semibold" fontSize="sm" noOfLines={2}>
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
      </HStack>
    </LinkBox>
  );
};

export function ReviewsSectionDesktop({
  reviews,
  tagSlug,
}: ReviewsSectionDesktopProps) {
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
    >
      <Text
        fontSize="xl"
        fontWeight="semibold"
        fontFamily="poppins"
        textTransform="capitalize"
      >
        Review {tagSlug.split("-").join(" ")}
      </Text>
      <Divider borderColor="veryLightPink" />
      <VStack
        spacing={4}
        width="100%"
        align="flex-start"
        divider={<StackDivider borderColor="veryLightPink" />}
      >
        {reviews.length &&
          reviews.map((review) => <ReviewItem key={review.id} {...review} />)}
      </VStack>
      <Navigate name="REVIEWS">
        <Link
          textAlign="center"
          fontSize="sm"
          color="sea.500"
          fontWeight="semibold"
          width="100%"
          variant="unstyled"
        >
          Lihat Semua
        </Link>
      </Navigate>
    </VStack>
  );
}

export function ReviewSectionDesktopSkeleton() {
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
      minW="352px"
      maxH="440px"
      height="fit-content"
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
            <VStack spacing={1.5} align="flex-start">
              <Skeleton width="240px" height="38px" />
              <Skeleton width="240px" height="14px" />
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
        Lihat Semua
      </Text>
    </VStack>
  );
}
