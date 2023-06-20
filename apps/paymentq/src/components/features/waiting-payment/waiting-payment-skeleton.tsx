import React from "react";
import {
  Box,
  Container,
  Skeleton,
  SkeletonText,
  VStack,
} from "@sehatq/components";

export function WaitingPaymentSkeleton(props: { isMobile: boolean }) {
  if (props.isMobile) {
    return <WaitingPaymentSkeletonLoadingMobile />;
  }

  return <WaitingPaymentSkeletonLoadingDesktop />;
}

function WaitingPaymentSkeletonLoadingMobile() {
  return (
    <Container maxW="full" marginTop="5">
      <Container centerContent mb={2} mt={12}>
        <Skeleton height="102px" w="40%" />
      </Container>
      <VStack mb={5} spacing={3}>
        <SkeletonText width="full" noOfLines={1} skeletonHeight="4" />
        <SkeletonText width="full" noOfLines={1} skeletonHeight="4" />
        <SkeletonText width="full" noOfLines={1} skeletonHeight="4" />
        <SkeletonText width="full" noOfLines={1} skeletonHeight="4" />
      </VStack>
      <VStack>
        <Skeleton height={16} w="full" />
        <Skeleton height={16} w="full" />
        <Skeleton height={16} w="full" />
      </VStack>

      <Box>
        <SkeletonText
          width="40%"
          noOfLines={1}
          skeletonHeight="4"
          marginBottom="1"
          mt={5}
        />
        <Skeleton height={200} w="full" />
      </Box>

      <VStack>
        <Skeleton height={14} w="full" />
        <Skeleton height={14} w="full" />
        <Skeleton height={14} w="full" />
      </VStack>
    </Container>
  );
}

function WaitingPaymentSkeletonLoadingDesktop() {
  return (
    <Container
      maxW="3xl"
      borderRadius="lg"
      boxShadow="base"
      bgColor="white"
      marginY="4"
      padding="3"
    >
      <Container centerContent mb={2} mt={10}>
        <Skeleton height="102px" w="40%" />
      </Container>
      <VStack spacing={4} mx={40} my={5}>
        <SkeletonText width="full" noOfLines={1} skeletonHeight="4" />
        <SkeletonText width="full" noOfLines={1} skeletonHeight="4" />
        <SkeletonText width="full" noOfLines={1} skeletonHeight="4" />
        <SkeletonText width="full" noOfLines={1} skeletonHeight="4" />
      </VStack>

      <VStack>
        <Skeleton height={14} w="full" />
        <Skeleton height={14} w="full" />
        <Skeleton height={14} w="full" />
      </VStack>

      <Box>
        <SkeletonText
          width="40%"
          noOfLines={1}
          skeletonHeight="4"
          marginBottom="5"
          mt={5}
        />
        <Skeleton height={150} w="full" />
      </Box>

      <VStack>
        <Skeleton height={14} w="full" />
        <Skeleton height={14} w="full" />
        <Skeleton height={14} w="full" />
      </VStack>
    </Container>
  );
}
