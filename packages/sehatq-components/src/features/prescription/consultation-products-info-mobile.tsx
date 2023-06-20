import React from "react";
import {
  Divider,
  Flex,
  HStack,
  Skeleton,
  Text,
  VStack,
} from "../../user-interfaces";
import { ConsultationProductsInfoGeneralProps } from "./consultation-products-info-desktop";

export function ConsultationProductsInfoMobile(
  props: ConsultationProductsInfoGeneralProps
) {
  return (
    <Flex direction="column" width="full">
      <Flex direction="row" justify="space-between">
        <Text fontSize="sm" fontWeight="semibold" fontFamily="poppins">
          Rekomendasi Resep
        </Text>
        <HStack spacing={1}>
          <Text fontSize="xs" color="#4D555B">
            Total
          </Text>
          <Text fontSize="xs" fontWeight="semibold" color="sea.500">
            {props.prescriptions.length}
          </Text>
        </HStack>
      </Flex>
      <VStack
        mt={4}
        background="white"
        borderRadius="xl"
        boxShadow="base"
        p={4}
        align="start"
        divider={<Divider border="0.5px solid" borderColor="veryLightPink" />}
        spacing={2}
      >
        {props.prescriptions.map((item) => (
          <Text key={item} fontSize="sm" fontWeight="semibold">
            {item}
          </Text>
        ))}
      </VStack>
    </Flex>
  );
}

export function ConsultationProductsInfoMobileSkeleton() {
  return (
    <Flex direction="column" width="full">
      <Flex direction="row" justify="space-between">
        <Text fontSize="sm" fontWeight="semibold" fontFamily="poppins">
          Rekomendasi Resep
        </Text>
        <HStack spacing={1}>
          <Text fontSize="xs" color="#4D555B">
            Total
          </Text>
          <Skeleton width={2} height="14px" />
        </HStack>
      </Flex>
      <VStack
        mt={4}
        background="white"
        borderRadius="xl"
        boxShadow="base"
        p={4}
        align="start"
        divider={<Divider border="0.5px solid" borderColor="veryLightPink" />}
        spacing={2}
      >
        {Array.from(Array(4).keys()).map((item) => (
          <Skeleton width="full" height="19px" key={item} />
        ))}
      </VStack>
    </Flex>
  );
}
