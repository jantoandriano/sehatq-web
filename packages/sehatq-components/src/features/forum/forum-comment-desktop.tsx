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

export type ForumCommentDesktopProps = {
  forumId: number;
  commentId: number;
  createdBy: string;
  createdAt: string;
  comment: string;
  showActions: boolean;
  gender: string;
};

export function ForumCommentDesktop(props: ForumCommentDesktopProps) {
  return (
    <Flex
      direction="column"
      borderRadius="xl"
      background="white"
      border="solid 0.5px"
      borderColor="veryLightPink"
    >
      <HStack px={6} py={4} background="iceBlue.500" borderTopRadius="xl">
        <Box
          width={7}
          height={7}
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
          <HStack fontSize="md" color="charcoalGrey" spacing={1}>
            <Text>Dikomentari oleh</Text>
            <Text fontWeight="semibold">{props.createdBy}</Text>
          </HStack>
          <Text fontSize="xs" color="sea.500">
            {props.createdAt}
          </Text>
        </Box>
      </HStack>
      <Text p={6} color="charcoalGrey" fontSize="md" lineHeight="tall">
        {props.comment}
      </Text>
      {props.showActions && (
        <Box paddingX={6} paddingBottom={6}>
          <ForumCommentActions
            forumId={props.forumId}
            commentBy={props.createdBy}
            commentId={props.commentId}
            comment={props.comment}
            isMobile={false}
          />
        </Box>
      )}
    </Flex>
  );
}

export function ForumCommentDesktopSkeleton() {
  return (
    <Flex
      direction="column"
      borderRadius="xl"
      background="white"
      border="solid 0.5px"
      borderColor="veryLightPink"
      justify="space-between"
    >
      <HStack px={6} py={4} background="iceBlue.500" borderTopRadius="xl">
        <SkeletonCircle width={7} height={7} />
        <Box>
          <Skeleton width={36} height={5} mb={2} />
          <Skeleton width={28} height={4} />
        </Box>
      </HStack>
      <Box p={6}>
        <Skeleton width="full" height={4} mb={2} />
        <Skeleton width="full" height={4} mb={2} />
        <Skeleton width="90%" height={4} mb={4} />
        <Skeleton width={40} height={9} borderRadius="base" />
      </Box>
    </Flex>
  );
}
