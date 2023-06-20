import React from "react";
import { useNavigation, useAssets } from "@sehatq/utils";
import {
  Box,
  HStack,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Text,
  useImage,
  Link,
  StarRating,
} from "../../user-interfaces";
import { Content } from "../layout";

export type ForumAnswerDesktopProps = {
  answer: string;
  answeredBy: string;
  doctorAuthorSlug?: string;
  rating?: {
    average: number;
    totalReview: number;
  };
};

export function ForumAnswerDesktop(props: ForumAnswerDesktopProps) {
  const { answer, answeredBy, doctorAuthorSlug, rating } = props;
  const ASSETS = useAssets(["SEHATQ_SM"]);
  const { Navigate } = useNavigation();
  const Image = useImage();

  const authorLink = doctorAuthorSlug ? (
    <Navigate
      name="AUTHOR"
      query={{
        slug: doctorAuthorSlug,
      }}
    >
      <Link
        color="sea.500"
        variant="link"
        fontWeight="semibold"
        _hover={{ textDecoration: "none" }}
      >
        {answeredBy}
      </Link>
    </Navigate>
  ) : (
    <Text as="span" color="sea.500" fontWeight="semibold">
      {answeredBy}
    </Text>
  );

  return (
    <Box borderRadius="xl" overflow="hidden" background="iceBlue.500">
      <HStack
        background="#daeff2"
        alignItems="start"
        paddingX={8}
        paddingY="18px"
        spacing={3}
      >
        <Image
          alt="SehatQ Logo"
          src={ASSETS.SEHATQ_SM}
          width={28}
          height={28}
          layout="fixed"
          priority
          wrapperProps={{
            height: "28px",
          }}
        />
        <Box>
          <Text>Dijawab oleh {authorLink}</Text>
          <StarRating
            rating={rating ? rating.average : 0}
            ratingTotal={rating ? rating.totalReview : 0}
            iconWidth="10px"
            iconHeight="10px"
          />
        </Box>
      </HStack>
      <Box paddingX={8} paddingTop={5} paddingBottom={8}>
        <Content isMobile={false}>{answer}</Content>
      </Box>
    </Box>
  );
}

export function ForumAnswerDesktopSkeleton() {
  return (
    <Box borderRadius="xl" overflow="hidden" background="iceBlue.500">
      <HStack
        background="#daeff2"
        alignItems="start"
        paddingX={8}
        paddingY="18px"
        spacing={3}
      >
        <SkeletonCircle width={7} height={7} />
        <Box pt={1}>
          <Skeleton width="260px" height="16px" mb={2} />
          <Skeleton width="80px" height="10px" mb={1} />
        </Box>
      </HStack>
      <Box paddingX={8} paddingTop={7} paddingBottom={8}>
        <Skeleton width="160px" height="16px" marginBottom={8} />
        <SkeletonText
          noOfLines={5}
          spacing="4"
          skeletonHeight="4"
          marginBottom={7}
        />
        <SkeletonText noOfLines={5} spacing="4" skeletonHeight="4" />
      </Box>
    </Box>
  );
}
