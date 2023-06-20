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

export type ForumQuestionMobileProps = {
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

export function ForumQuestionMobile(props: ForumQuestionMobileProps) {
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
      <HStack alignItems="center">
        <Navigate
          name="FORUM"
          query={{ slugs: [category.slug], sort: "newest" }}
        >
          <Link
            color="sea.500"
            fontWeight="semibold"
            fontSize="xs"
            _hover={{ textDecoration: "none" }}
          >
            {category.name}
          </Link>
        </Navigate>
        <Spacer />
        <MarkForumAsSpam isMobile forumId={id} />
        <SocialShareButton isMobile shareUrl={shareUrl} />
      </HStack>
      <Text
        as="h1"
        fontFamily="poppins"
        fontSize="lg"
        fontWeight="semibold"
        lineHeight="1.33"
        marginBottom={1}
      >
        {title}
      </Text>
      <Text fontSize="xxs" color="brownGrey.500" marginBottom={3}>
        {date}
      </Text>
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
      <Text fontSize="sm" lineHeight="tall" marginTop={4} marginBottom={5}>
        {question}
      </Text>
      <HStack
        borderTop="1px"
        borderTopColor="veryLightPink"
        spacing={8}
        paddingY={3}
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
  );
}

export function ForumQuestionMobileSkeleton() {
  return (
    <Box>
      <HStack alignItems="center" marginBottom={1}>
        <Skeleton width="100px" height="12px" />
        <Spacer />
        <SkeletonCircle width={6} height={6} />
        <SkeletonCircle width={6} height={6} />
      </HStack>
      <SkeletonText
        marginBottom={3}
        noOfLines={2}
        spacing="1"
        skeletonHeight="5"
      />
      <Skeleton width="90px" height="10px" marginBottom={4} />
      <HStack
        background="iceBlue.500"
        borderRadius="xl"
        spacing={2.5}
        paddingX={2}
        paddingY={1.5}
      >
        <SkeletonCircle width={6} height={6} />
        <Skeleton width="160px" height="12px" />
      </HStack>
      <SkeletonText
        marginTop={5}
        marginBottom={6}
        noOfLines={7}
        spacing="3"
        skeletonHeight="3.5"
      />
      <HStack
        borderTop="1px"
        borderTopColor="veryLightPink"
        spacing={8}
        paddingY={3}
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
