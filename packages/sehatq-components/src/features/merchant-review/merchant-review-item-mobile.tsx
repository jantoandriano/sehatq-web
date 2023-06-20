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
export type MerchantReviewItemMobileProps = {
  id: string;
  rating: number;
  review: string;
  createdAt: string;
  userName: string;
  tags: string[];
};

export function MerchantReviewItemMobile(props: MerchantReviewItemMobileProps) {
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
          <Text color="#36454f" fontSize={14} pb="1" fontWeight={600}>
            {userName}
          </Text>
          <StarRating rating={rating} iconWidth={3} iconHeight={3} />
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
                <Text fontSize={10}>{tag}</Text>
              </Badge>
            ))}
          </Box>
        )}
        <Text pt={2.5} px="5" color="#36454f" fontSize={12}>
          {review}
        </Text>
        <Text px="5" pb="3" pt="3" color="#a7a7a7" fontSize={10}>
          {createdAt}
        </Text>
      </Flex>
    </Box>
  );
}

export function MerchantReviewItemMobileSkeleton() {
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
          <Skeleton width={100} height={4} colorScheme="blue" />
          <StarRating rating={0} iconWidth={3} iconHeight={3} />
        </Flex>
        <Box px="5" pt={3} pb="2.5">
          <Skeleton height={5} />
        </Box>
        <Box px="5">
          <SkeletonText height={10} />
        </Box>
        <Box px="5" pb="3" pt="3">
          <Skeleton width={100} height={3} colorScheme="blue" />
        </Box>
      </Flex>
    </Box>
  );
}
