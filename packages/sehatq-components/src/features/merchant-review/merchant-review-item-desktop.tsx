import React from "react";
import {
  Flex,
  Box,
  Text,
  Badge,
  StarRating,
  Skeleton,
  SkeletonText,
} from "../../user-interfaces";
export type MerchantReviewItemDesktopProps = {
  id: string;
  rating: number;
  review: string;
  createdAt: string;
  userName: string;
  tags: string[];
};

export function MerchantReviewItemDesktop(
  props: MerchantReviewItemDesktopProps
) {
  const { id, rating, review, createdAt, userName, tags } = props;
  return (
    <Box
      key={id}
      borderRadius="xl"
      boxShadow="base"
      backgroundColor="white"
      marginBottom={3}
    >
      <Flex flexDirection="column">
        <Flex
          px="5"
          pt="3"
          pb="2.5"
          align="center"
          justify="space-between"
          borderBottom="0.5px solid"
          borderColor="veryLightPink"
        >
          <Box>
            <Text color="#36454f" fontSize={16} pb="1" fontWeight={600}>
              {userName}
            </Text>
            <StarRating rating={rating} iconWidth={3} iconHeight={3} />
          </Box>
          <Text color="#a7a7a7" fontSize={16} pb="5">
            {createdAt}
          </Text>
        </Flex>

        {tags.length > 0 && (
          <Box px="5" pt={3}>
            {tags.map((tag: string) => (
              <Badge
                key={tag}
                color="white"
                backgroundColor="orange.300"
                borderRadius="xl"
                size="sm"
                pl={2}
                pr={2}
                marginRight={2}
                textTransform="none"
              >
                <Text fontSize={14}>{tag}</Text>
              </Badge>
            ))}
          </Box>
        )}
        <Text color="#36454f" fontSize={14} pt={2.5} px="5" pb="3">
          {review}
        </Text>
      </Flex>
    </Box>
  );
}

export function MerchantReviewItemDesktopSkeleton() {
  return (
    <Box borderRadius="xl" boxShadow="base" backgroundColor="white">
      <Flex flexDirection="column">
        <Flex
          px="5"
          pt="3"
          pb="2.5"
          align="center"
          justify="space-between"
          borderBottom="0.5px solid"
          borderColor="veryLightPink"
        >
          <Box>
            <Skeleton width={100} height={5} marginBottom={3} />
            <StarRating rating={0} iconWidth={3} iconHeight={3} />
          </Box>
          <Skeleton width={100} height={5} marginBottom={7} />
        </Flex>
        <Box px="5" pt={3} pb="2.5">
          <Skeleton height={5} />
        </Box>
        <Box px="5" pb="3">
          <SkeletonText height={10} />
        </Box>
      </Flex>
    </Box>
  );
}
