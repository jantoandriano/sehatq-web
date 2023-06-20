import React from "react";
import { Divider, Flex, Skeleton, Text, VStack } from "../../user-interfaces";

export type ConsultationProductsInfoGeneralProps = {
  prescriptions: string[];
};

export function ConsultationProductsInfoDesktop(
  props: ConsultationProductsInfoGeneralProps
) {
  return (
    <Flex
      direction="column"
      background="white"
      borderRadius="xl"
      boxShadow="base"
      p={6}
      width="full"
    >
      <Text fontSize="md" fontWeight="semibold" fontFamily="poppins">
        Rekomendasi Resep
      </Text>
      <VStack
        pt={4}
        align="start"
        divider={<Divider border="0.5px solid" borderColor="veryLightPink" />}
        spacing={4}
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

export function ConsultationProductsInfoDesktopSkeleton() {
  return (
    <Flex
      direction="column"
      background="white"
      borderRadius="xl"
      boxShadow="base"
      p={6}
      width="full"
    >
      <Text fontSize="md" fontWeight="semibold" fontFamily="poppins">
        Rekomendasi Resep
      </Text>
      <VStack
        pt={4}
        align="start"
        divider={<Divider border="0.5px solid" borderColor="veryLightPink" />}
        spacing={4}
      >
        {Array.from(Array(4).keys()).map((item) => (
          <Skeleton width="full" height="19px" key={item} />
        ))}
      </VStack>
    </Flex>
  );
}
