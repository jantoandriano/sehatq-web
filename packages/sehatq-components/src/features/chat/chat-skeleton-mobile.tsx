import React from "react";
import {
  Flex,
  HStack,
  Box,
  Skeleton,
  SkeletonCircle,
} from "../../user-interfaces";
export type ChatSkeletonMobileProps = {
  isHistory: boolean;
};

export function ChatSkeletonMobile(props: ChatSkeletonMobileProps) {
  const { isHistory } = props;
  return (
    <Flex
      flex="1"
      direction="column"
      height="100%"
      width="100%"
      overflow="hidden"
      position="relative"
    >
      <Box boxShadow="0 2px 12px 0 rgba(42, 83, 83, 0.1)">
        <Flex paddingX={4} paddingY={2.5} background="white" align="center">
          <SkeletonCircle width="32px" height="32px" />
          <Box marginLeft={3}>
            <Skeleton height="14px" width="200px" marginBottom={1} />
            <Skeleton height="12px" width="120px" />
          </Box>
        </Flex>
        {isHistory ? (
          <Box padding={3} background="paleBlue.500">
            <Flex align="center" justify="space-between" marginBottom={2}>
              <Skeleton height="12px" width="120px" />
              <Skeleton height="12px" width="80px" />
            </Flex>
            <HStack
              paddingX={4}
              height="44px"
              background="white"
              boxShadow="base"
              borderRadius="base"
            >
              <Skeleton width={7} height={7} />
              <Skeleton height="14px" width="100%" />
            </HStack>
          </Box>
        ) : null}
      </Box>
      {isHistory ? (
        <Box flex="1" width="100%" background="iceBlue.500" />
      ) : (
        <Skeleton
          flex="1"
          width="100%"
          startColor="iceBlue.500"
          endColor="iceBlue.600"
        />
      )}
      {isHistory ? null : (
        <Flex
          padding={3}
          background="white"
          align="center"
          boxShadow="0 0 8px 0 rgba(0, 0, 0, 0.1)"
        >
          <Skeleton flex="1" height="40px" width="200px" borderRadius="lg" />
          <Skeleton
            borderRadius="md"
            marginLeft={3}
            width="28px"
            height="28px"
          />
        </Flex>
      )}
    </Flex>
  );
}
