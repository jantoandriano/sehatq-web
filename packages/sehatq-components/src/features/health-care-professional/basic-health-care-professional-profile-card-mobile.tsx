import React from "react";
import {
  Box,
  Flex,
  HStack,
  Skeleton,
  SkeletonCircle,
  StarRating,
  Text,
  useImage,
} from "../../user-interfaces";

export type BasicHCPProfileCardMobileProps = {
  imageUrl: string;
  imageAlt: string;
  doctorName: string;
  speciality: string;
  rating?: number;
  totalReview?: number;
};

export function BasicHCPProfileCardMobile(
  props: BasicHCPProfileCardMobileProps
) {
  const Image = useImage();
  return (
    <Flex
      direction="row"
      justify="flex-start"
      align="center"
      color="charcoalGrey"
    >
      <Image
        alt={props.imageAlt}
        src={props.imageUrl}
        priority
        layout="fill"
        objectFit="cover"
        sizes="80px"
        wrapperProps={{
          boxSize: "80px",
          position: "relative",
          borderRadius: "full",
          overflow: "hidden",
        }}
      />
      <Box pl="4">
        <Text
          as="h1"
          mb={1}
          fontFamily="poppins"
          fontWeight="semibold"
          fontSize="sm"
        >
          {props.doctorName}
        </Text>
        <Text color="brownGrey.500" fontSize="xs">
          {props.speciality}
        </Text>
        {props.rating && (
          <HStack mt={2} spacing={1} fontSize="xxs">
            <StarRating
              fontSize="xxs"
              rating={props.rating}
              iconWidth="10px"
              iconHeight="10px"
            />
            {props.totalReview && (
              <Text color="brownGrey.500">({props.totalReview})</Text>
            )}
          </HStack>
        )}
      </Box>
    </Flex>
  );
}

export function BasicHCPProfileCardMobileSkeleton() {
  return (
    <Flex direction="row" justify="flex-start" align="center">
      <SkeletonCircle boxSize="80px" />
      <Box pl="4">
        <Skeleton width={48} height={4} mb={2} />
        <Skeleton width={36} height={4} mb={2} />
        <Skeleton width={28} height={4} />
      </Box>
    </Flex>
  );
}
