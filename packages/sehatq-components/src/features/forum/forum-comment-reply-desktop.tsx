import { useAssets } from "@sehatq/utils";
import React from "react";
import {
  Box,
  Flex,
  HStack,
  Skeleton,
  SkeletonCircle,
  Text,
  useImage,
} from "../../user-interfaces";
import { Content } from "../layout";

export type ForumCommentReplyDesktopProps = {
  commentId: number;
  createdBy: string;
  createdAt: string;
  comment: string;
};

export function ForumCommentReplyDesktop(props: ForumCommentReplyDesktopProps) {
  const ASSETS = useAssets(["SEHATQ_SM"]);
  const Image = useImage();
  return (
    <Flex direction="column" borderRadius="xl" background="iceBlue.500">
      <HStack px={6} py={4} background="paleBlue.500" borderTopRadius="xl">
        <Image
          alt="SehatQ Logo"
          src={ASSETS.SEHATQ_SM}
          width={28}
          height={28}
          layout="fixed"
          priority
          wrapperProps={{
            height: "28px",
          }}
        />
        <Box>
          <HStack fontSize="md" color="charcoalGrey" spacing={1}>
            <Text>Dijawab oleh</Text>
            <Text color="sea.500" fontWeight="semibold">
              {props.createdBy}
            </Text>
          </HStack>
          <Text fontSize="xs" color="brownGrey.200">
            {props.createdAt}
          </Text>
        </Box>
      </HStack>
      <Text p={6} color="charcoalGrey" fontSize="md" lineHeight="tall">
        <Content isMobile={false}>{props.comment}</Content>
      </Text>
    </Flex>
  );
}

export function ForumCommentReplyDesktopSkeleton() {
  return (
    <Flex
      direction="column"
      borderRadius="xl"
      background="iceBlue.500"
      justify="space-between"
    >
      <HStack px={6} py={4} background="paleBlue.500" borderTopRadius="xl">
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
      </Box>
    </Flex>
  );
}
