import React from "react";
import { useNavigation } from "@sehatq/utils";
import {
  Box,
  Flex,
  Link,
  HStack,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Text,
  ForumEyeIcon,
  ForumCommentIcon,
  Spacer,
} from "../../user-interfaces";
import { SocialShareButton } from "../general/social-share-button";
import { MarkForumAsSpam } from "./mark-forum-as-spam";

export type ForumQuestionDesktopProps = {
  id: number;
  date: string;
  category: {
    id: number;
    name: string;
    slug: string;
  };
  title: string;
  question: string;
  shareUrl: string;
  user: {
    id: number;
    email: string;
    nameInitial?: string;
    gender?: string;
    genderName?: string;
    genderNameBg: string;
    age?: number;
  };
  viewsCount: number;
  commentsCount: number;
};

export function ForumQuestionDesktop(props: ForumQuestionDesktopProps) {
  const {
    id,
    question,
    date,
    category,
    title,
    user,
    viewsCount,
    commentsCount,
    shareUrl,
  } = props;
  const { Navigate } = useNavigation();
  return (
    <Box>
      <HStack alignItems="center" spacing={4}>
        <Navigate
          name="FORUM"
          query={{ slugs: [category.slug], sort: "newest" }}
        >
          <Link
            color="sea.500"
            fontWeight="semibold"
            fontSize="sm"
            _hover={{ textDecoration: "none" }}
          >
            {category.name}
          </Link>
        </Navigate>
        <Spacer />
        <MarkForumAsSpam forumId={id} />
        <SocialShareButton shareUrl={shareUrl} />
      </HStack>
      <Text
        as="h1"
        fontFamily="poppins"
        fontSize="3xl"
        fontWeight="semibold"
        marginBottom={1}
      >
        {title}
      </Text>
      <Text fontSize="xs" color="brownGrey.500" marginBottom={5}>
        {date}
      </Text>
      <HStack
        background="iceBlue.500"
        borderRadius="xl"
        spacing={3}
        paddingX={3}
        paddingY={2}
      >
        <Flex
          background={user.genderNameBg}
          w={8}
          h={8}
          borderRadius="full"
          alignItems="center"
          justifyContent="center"
        >
          <Text fontSize="xs" color="white" fontWeight="semibold">
            {user.nameInitial}
          </Text>
        </Flex>
        <Text fontSize="sm">
          Info Penanya: {user.nameInitial}
          {user.gender ? `, ${user.genderName}` : null}
          {user.age ? `, ${user.age} Tahun` : null}
        </Text>
      </HStack>
      <Text lineHeight="tall" marginY={5}>
        {question}
      </Text>
      <HStack
        borderTop="1px"
        borderTopColor="veryLightPink"
        spacing={8}
        paddingY={4}
      >
        <Flex alignItems="center">
          <ForumEyeIcon boxSize="24px" marginRight={1.5} />
          <Text fontSize="sm" color="brownGrey.500">
            Dilihat {viewsCount}
          </Text>
        </Flex>
        <Flex alignItems="center">
          <ForumCommentIcon boxSize="24px" marginRight={1.5} />
          <Text fontSize="sm" color="brownGrey.500">
            {commentsCount} Komentar
          </Text>
        </Flex>
      </HStack>
    </Box>
  );
}

export function ForumQuestionDesktopSkeleton() {
  return (
    <Box>
      <HStack alignItems="center" spacing={4} marginBottom={2}>
        <Skeleton width="120px" height="14px" />
        <Spacer />
        <SkeletonCircle width={7} height={7} />
        <SkeletonCircle width={7} height={7} />
      </HStack>
      <Skeleton width="70%" height="24px" marginBottom={4} />
      <Skeleton width="100px" height="12px" marginBottom={5} />
      <HStack
        background="iceBlue.500"
        borderRadius="xl"
        spacing={3}
        paddingX={3}
        paddingY={2}
      >
        <SkeletonCircle width={8} height={8} />
        <Skeleton width="180px" height="14px" />
      </HStack>
      <SkeletonText marginY={5} noOfLines={4} spacing="2" skeletonHeight="5" />
      <HStack
        borderTop="1px"
        borderTopColor="veryLightPink"
        spacing={8}
        paddingY={4}
      >
        <Flex alignItems="center">
          <SkeletonCircle width={6} height={6} marginRight={1.5} />
          <Skeleton width="70px" height="14px" />
        </Flex>
        <Flex alignItems="center">
          <SkeletonCircle width={6} height={6} marginRight={1.5} />
          <Skeleton width="70px" height="14px" />
        </Flex>
      </HStack>
    </Box>
  );
}
