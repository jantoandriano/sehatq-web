import React from "react";
import {
  Flex,
  Box,
  Skeleton,
  SkeletonCircle,
  HStack,
} from "../../user-interfaces";
export type ChatSkeletonDesktopProps = {
  isHistory: boolean;
};

export function ChatSkeletonDesktop(props: ChatSkeletonDesktopProps) {
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
        <Flex paddingX={6} paddingY={3} background="white" align="center">
          <SkeletonCircle width="40px" height="40px" />
          <Box marginLeft={3}>
            <Skeleton height="14px" width="260px" marginBottom={1} />
            <Skeleton height="12px" width="120px" />
          </Box>
        </Flex>
        <Flex
          paddingX={5}
          paddingY={3}
          align="center"
          background="paleBlue.500"
        >
          <Box flex="1">
            <Skeleton height="12px" width="80px" marginBottom={1} />
            <Skeleton height="12px" width="120px" />
          </Box>
          <HStack
            paddingX={4}
            width="350px"
            height="44px"
            background="white"
            boxShadow="base"
            borderRadius="base"
          >
            <Skeleton width={7} height={7} />
            <Skeleton height="14px" width="100%" />
          </HStack>
        </Flex>
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
          paddingY={3}
          paddingX={5}
          background="white"
          align="center"
          boxShadow="0 -2px 12px 0 rgba(42, 83, 83, 0.1)"
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
