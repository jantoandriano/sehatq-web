import React from "react";
import { useNavigation } from "@sehatq/utils";
import {
  Link,
  LinkBox,
  LinkOverlay,
  HStack,
  CheckCircleIcon,
  Text,
  Box,
  Skeleton,
  SkeletonText,
} from "../../user-interfaces";

export interface SimpleForumCardMobileProps {
  title: string;
  slug: string;
  answeredBy: string;
  category?: {
    slug: string;
    name: string;
  };
  date?: string;
}

export function SimpleForumCardMobile({
  title,
  slug,
  answeredBy,
  category,
  date,
}: SimpleForumCardMobileProps) {
  const { Navigate } = useNavigation();
  return (
    <LinkBox
      padding={3}
      borderRadius="lg"
      boxShadow="base"
      height="100%"
      background="white"
    >
      {category ? (
        <Navigate name="FORUM" query={{ slugs: [category.slug] }}>
          <Link fontSize="xs" fontWeight="semibold" colorScheme="sea">
            {category.name}
          </Link>
        </Navigate>
      ) : null}
      <Navigate name="FORUM" query={{ slugs: [slug] }}>
        <LinkOverlay
          fontSize="sm"
          fontWeight="semibold"
          fontFamily="poppins"
          display="block"
        >
          {title}
        </LinkOverlay>
      </Navigate>
      {date ? (
        <Text
          fontSize="xs"
          fontWeight="semibold"
          color="brownGrey.500"
          marginTop={1}
        >
          {date}
        </Text>
      ) : null}
      <HStack
        marginTop={3}
        spacing={2}
        px={2}
        py={1.5}
        background="iceBlue.500"
        borderRadius="base"
        align="flex-start"
      >
        <CheckCircleIcon boxSize="16px" color="main.500" />
        <Text fontSize="xs" color="brownGrey.500" width="100%">
          Dijawab oleh{" "}
          <Text as="span" d="inline" color="sea.500" fontWeight="bold">
            {answeredBy}
          </Text>
        </Text>
      </HStack>
    </LinkBox>
  );
}

export function SimpleForumCardMobileSkeleton() {
  return (
    <Box borderRadius="base" overflow="hidden" boxShadow="base">
      <Box padding={2.5} backgroundColor="white">
        <Skeleton width="80px" height={2.5} marginBottom={1.5} />
        <SkeletonText skeletonHeight={2.5} noOfLines={4} spacing={1} />
        <Skeleton width="60px" height={2} marginTop={2} />
        <Skeleton height={7} marginTop={3} />
      </Box>
    </Box>
  );
}
