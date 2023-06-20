import React from "react";
import { useNavigation } from "@sehatq/utils";
import {
  Box,
  Flex,
  HStack,
  Text,
  ForumEyeIcon,
  ForumCommentIcon,
  Spacer,
  Link,
  CheckCircleIcon,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  LinkBox,
  LinkOverlay,
} from "../../user-interfaces";

export type ForumCardMobileProps = {
  id: number;
  question: string;
  date: string;
  title: string;
  slug: string;
  user: {
    id: number;
    email: string;
    nameInitial?: string;
    gender?: string;
    genderName?: string;
    genderNameBg: string;
    age?: number;
  };
  category: {
    id: number;
    name: string;
    slug: string;
  };
  answeredBy: string;
  doctorAuthorSlug?: string;
  viewsCount: number;
  commentsCount: number;
};

export function ForumCardMobile(props: ForumCardMobileProps) {
  const {
    question,
    date,
    title,
    slug,
    user,
    category,
    answeredBy,
    doctorAuthorSlug,
    viewsCount,
    commentsCount,
  } = props;
  const { Navigate } = useNavigation();

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
        fontSize="xs"
        fontWeight="semibold"
        _hover={{ textDecoration: "none" }}
      >
        {answeredBy}
      </Link>
    </Navigate>
  ) : (
    <Text fontSize="xs" as="span" color="sea.500" fontWeight="semibold">
      {answeredBy}
    </Text>
  );

  return (
    <LinkBox>
      <Box
        borderRadius="xl"
        borderColor="veryLightPink"
        boxShadow="base"
        width="full"
        background="white"
        px={4}
        pt={4}
        pb={5}
      >
        <HStack alignItems="center">
          <Text color="sea.500" fontWeight="semibold" fontSize="xs">
            {category.name}
          </Text>
          <Spacer />
          <Text fontSize="xxs" color="brownGrey.500">
            {date}
          </Text>
        </HStack>
        <Navigate
          name="FORUM"
          query={{
            slugs: [slug],
          }}
        >
          <LinkOverlay
            fontFamily="poppins"
            fontSize="md"
            fontWeight="semibold"
            lineHeight="1.33"
            mt={1.5}
            mb={3}
            width="100%"
          >
            {title}
          </LinkOverlay>
        </Navigate>
        <HStack
          background="iceBlue.500"
          borderRadius="xl"
          spacing={2.5}
          paddingX={2}
          paddingY={1.5}
        >
          <Flex
            background={user.genderNameBg}
            w={6}
            h={6}
            borderRadius="full"
            alignItems="center"
            justifyContent="center"
          >
            <Text fontSize="xxs" color="white" fontWeight="semibold">
              {user.nameInitial}
            </Text>
          </Flex>
          <Text fontSize="xs">
            Info Penanya: {user.nameInitial}
            {user.gender ? `, ${user.genderName}` : null}
            {user.age ? `, ${user.age} Tahun` : null}
          </Text>
        </HStack>
        <Text fontSize="xs" lineHeight="tall" my={2.5}>
          {question}
        </Text>
        {answeredBy && (
          <HStack spacing={2} align="flex-start" mb={3.5}>
            <CheckCircleIcon boxSize="16px" color="main.500" mt={0.5} />
            <Text fontSize="xs" mb={3}>
              Dijawab oleh {authorLink}
            </Text>
          </HStack>
        )}
        <HStack
          borderTop="0.5px solid"
          borderTopColor="veryLightPink"
          spacing={8}
          pt={3}
          pb={1}
        >
          <Flex alignItems="center">
            <ForumEyeIcon boxSize="16px" marginRight={1} />
            <Text fontSize="xs" color="brownGrey.500">
              Dilihat {viewsCount}
            </Text>
          </Flex>
          <Flex alignItems="center">
            <ForumCommentIcon boxSize="16px" marginRight={1} />
            <Text fontSize="xs" color="brownGrey.500">
              {commentsCount} Komentar
            </Text>
          </Flex>
        </HStack>
      </Box>
    </LinkBox>
  );
}

export function ForumCardMobileSkeleton() {
  return (
    <Box
      borderRadius="xl"
      borderColor="veryLightPink"
      boxShadow="base"
      width="full"
      background="white"
      p={4}
    >
      <HStack alignItems="center">
        <Skeleton width="50px" height="17px" />
        <Spacer />
        <Skeleton width="90px" height="14px" />
      </HStack>
      <SkeletonText
        noOfLines={2}
        spacing="1"
        skeletonHeight="5"
        mt={1.5}
        mb={3}
      />
      <HStack
        background="iceBlue.500"
        borderRadius="xl"
        spacing={2.5}
        paddingX={2}
        paddingY={1.5}
      >
        <SkeletonCircle width={6} height={6} />
        <Skeleton width="160px" height="17px" />
      </HStack>
      <SkeletonText my={2.5} noOfLines={6} spacing="3" skeletonHeight="3.5" />
      <HStack spacing={2} align="flex-start" mb={3.5}>
        <SkeletonCircle width={4} height={4} />
        <Skeleton width="209px" height="17px" />
      </HStack>
      <HStack
        borderTop="0.5px solid"
        borderTopColor="veryLightPink"
        spacing={8}
        pt={3}
        pb={1}
      >
        <Flex alignItems="center">
          <SkeletonCircle width={4} height={4} marginRight={1} />
          <Skeleton width="60px" height="12px" />
        </Flex>
        <Flex alignItems="center">
          <SkeletonCircle width={4} height={4} marginRight={1} />
          <Skeleton width="60px" height="12px" />
        </Flex>
      </HStack>
    </Box>
  );
}
