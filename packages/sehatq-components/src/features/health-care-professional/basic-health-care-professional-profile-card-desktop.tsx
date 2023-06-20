import React from "react";
import {
  Flex,
  HStack,
  Skeleton,
  SkeletonCircle,
  StarRating,
  Text,
  useImage,
} from "../../user-interfaces";

export type BasicHCPProfileCardDesktopProps = {
  imageUrl: string;
  imageAlt: string;
  doctorName: string;
  speciality: string;
  rating?: number;
  totalReview?: number;
};

export function BasicHCPProfileCardDesktop(
  props: BasicHCPProfileCardDesktopProps
) {
  const Image = useImage();
  return (
    <Flex
      direction="column"
      textAlign="center"
      align="center"
      color="charcoalGrey"
    >
      <Image
        alt={props.imageAlt}
        src={props.imageUrl}
        priority
        layout="fill"
        objectFit="cover"
        sizes="150px"
        wrapperProps={{
          boxSize: "150px",
          position: "relative",
          borderRadius: "full",
          overflow: "hidden",
        }}
      />
      <Text
        as="h1"
        mt={2}
        fontFamily="poppins"
        fontWeight="semibold"
        fontSize="lg"
      >
        {props.doctorName}
      </Text>
      <Text mt={1} color="main.500" fontSize="md">
        {props.speciality}
      </Text>
      {props.rating && (
        <HStack mt={2} spacing={1} fontSize="sm">
          <StarRating
            fontSize="sm"
            rating={props.rating}
            iconWidth="15px"
            iconHeight="15px"
          />
          {props.totalReview && (
            <Text color="brownGrey.500">({props.totalReview})</Text>
          )}
        </HStack>
      )}
    </Flex>
  );
}

export function BasicHCPProfileCardDesktopSkeleton() {
  return (
    <Flex direction="column" align="center">
      <SkeletonCircle boxSize="150px" mb={4} />
      <Skeleton width={64} height={4} mb={2.5} />
      <Skeleton width={48} height={4} mb={2.5} />
      <Skeleton width={44} height={4} />
    </Flex>
  );
}
