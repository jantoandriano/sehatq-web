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

export type ForumAnswerMobileProps = {
  answer: string;
  answeredBy: string;
  doctorAuthorSlug?: string;
  rating?: {
    average: number;
    totalReview: number;
  };
};

export function ForumAnswerMobile(props: ForumAnswerMobileProps) {
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
        fontSize="sm"
        fontWeight="semibold"
        _hover={{ textDecoration: "none" }}
      >
        {answeredBy}
      </Link>
    </Navigate>
  ) : (
    <Text fontSize="sm" as="span" color="sea.500" fontWeight="semibold">
      {answeredBy}
    </Text>
  );

  return (
    <Box borderRadius="xl" overflow="hidden" background="iceBlue.500">
      <HStack
        background="#daeff2"
        alignItems="start"
        paddingX={5}
        paddingY={3}
        spacing={3}
      >
        <Image
          alt="SehatQ Logo"
          src={ASSETS.SEHATQ_SM}
          width={24}
          height={24}
          layout="fixed"
          priority
          wrapperProps={{
            height: "24px",
          }}
        />
        <Box>
          <Text fontSize="sm">Dijawab oleh {authorLink}</Text>
          <StarRating
            rating={rating ? rating.average : 0}
            ratingTotal={rating ? rating.totalReview : 0}
            iconWidth="10px"
            iconHeight="10px"
          />
        </Box>
      </HStack>
      <Box paddingX={5} paddingTop={4} paddingBottom={5}>
        <Content isMobile>{answer}</Content>
      </Box>
    </Box>
  );
}

export function ForumAnswerMobileSkeleton() {
  return (
    <Box borderRadius="xl" overflow="hidden" background="iceBlue.500">
      <HStack
        background="#daeff2"
        alignItems="start"
        paddingX={5}
        paddingY={3}
        spacing={3}
      >
        <SkeletonCircle width={6} height={6} />
        <Box pt={1}>
          <Skeleton width="180px" height="14px" mb={2} />
          <Skeleton width="100px" height="10px" mb={1} />
        </Box>
      </HStack>
      <Box paddingX={5} paddingTop={6} paddingBottom={5}>
        <Skeleton width="140px" height="16px" marginBottom={8} />
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
