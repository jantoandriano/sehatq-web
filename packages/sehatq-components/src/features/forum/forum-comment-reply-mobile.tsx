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

export type ForumCommentReplyMobileProps = {
  commentId: number;
  createdBy: string;
  createdAt: string;
  comment: string;
};

export function ForumCommentReplyMobile(props: ForumCommentReplyMobileProps) {
  const ASSETS = useAssets(["SEHATQ_SM"]);
  const Image = useImage();
  return (
    <Flex direction="column" borderRadius="xl" background="iceBlue.500">
      <HStack px={4} py={2} background="paleBlue.500" borderTopRadius="xl">
        <Image
          alt="SehatQ Logo"
          src={ASSETS.SEHATQ_SM}
          width={24}
          height={24}
          layout="fixed"
          priority
          wrapperProps={{
            height: "24px",
          }}
        />
        <Box>
          <HStack fontSize="sm" color="charcoalGrey" spacing={1}>
            <Text>Dikomentari oleh</Text>
            <Text fontWeight="semibold" color="sea.500">
              {props.createdBy}
            </Text>
          </HStack>
          <Text fontSize="xxs" color="brownGrey.200">
            {props.createdAt}
          </Text>
        </Box>
      </HStack>
      <Text p={4} color="charcoalGrey" fontSize="sm" lineHeight="tall">
        <Content isMobile={true}>{props.comment}</Content>
      </Text>
    </Flex>
  );
}

export function ForumCommentReplyMobileSkeleton() {
  return (
    <Flex
      direction="column"
      borderRadius="xl"
      background="iceBlue.500"
      justify="space-between"
    >
      <HStack px={4} py={2} background="paleBlue.500" borderTopRadius="xl">
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
      </Box>
    </Flex>
  );
}
