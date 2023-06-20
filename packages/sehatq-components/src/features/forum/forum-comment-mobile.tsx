import React from "react";
import {
  Box,
  Flex,
  HStack,
  Skeleton,
  SkeletonCircle,
  Text,
} from "../../user-interfaces";
import { ForumCommentActions } from "./forum-comment-actions";

export type ForumCommentMobileProps = {
  forumId: number;
  commentId: number;
  createdBy: string;
  createdAt: string;
  comment: string;
  showActions: boolean;
  gender: string;
};

export function ForumCommentMobile(props: ForumCommentMobileProps) {
  return (
    <Flex
      direction="column"
      borderRadius="xl"
      background="white"
      border="solid 0.5px"
      borderColor="veryLightPink"
    >
      <HStack px={4} py={2} background="iceBlue.500" borderTopRadius="xl">
        <Box
          width={6}
          height={6}
          textAlign="center"
          borderRadius="full"
          background={
            props.gender?.toLowerCase() == "m" ? "sea.500" : "squash.500"
          }
          fontSize="sm"
          color="white"
          fontWeight="semibold"
        ></Box>
        <Box>
          <HStack fontSize="sm" color="charcoalGrey" spacing={1}>
            <Text>Dikomentari oleh</Text>
            <Text fontWeight="semibold">{props.createdBy}</Text>
          </HStack>
          <Text fontSize="xxs" color="sea.500">
            {props.createdAt}
          </Text>
        </Box>
      </HStack>
      <Text p={4} color="charcoalGrey" fontSize="sm" lineHeight="tall">
        {props.comment}
      </Text>
      {props.showActions && (
        <Box
          paddingX={4}
          paddingBottom={4}
          color="charcoalGrey"
          fontSize="sm"
          lineHeight="tall"
        >
          <ForumCommentActions
            commentBy={props.createdBy}
            commentId={props.commentId}
            forumId={props.forumId}
            comment={props.comment}
            isMobile
          />
        </Box>
      )}
    </Flex>
  );
}

export function ForumCommentMobileSkeleton() {
  return (
    <Flex
      direction="column"
      borderRadius="xl"
      background="white"
      border="solid 0.5px"
      borderColor="veryLightPink"
      justify="space-between"
    >
      <HStack px={4} py={2} background="iceBlue.500" borderTopRadius="xl">
        <SkeletonCircle width={6} height={6} />
        <Box>
          <Skeleton width={36} height={4} mb={2} />
          <Skeleton width={28} height={3} />
        </Box>
      </HStack>
      <Box p={4}>
        <Skeleton width="full" height={3} mb={2} />
        <Skeleton width="full" height={3} mb={2} />
        <Skeleton width="90%" height={3} mb={4} />
        <Skeleton width={36} height={8} borderRadius="base" />
      </Box>
    </Flex>
  );
}
