import React from "react";

import {
  Flex,
  HStack,
  SimpleGrid,
  Skeleton,
  Text,
  useImage,
  VStack,
} from "../../user-interfaces";

import { HealthCareFacilityFeaturesGeneralProps } from "./health-care-facility-features-desktop";

export type HealthCareFacilityFeaturesMobileProps =
  HealthCareFacilityFeaturesGeneralProps;

function GenerateFeaturesDesktop(props: {
  items: {
    id: number;
    name: string;
    imageUrl?: string;
  }[];
}) {
  const Image = useImage();
  return (
    <SimpleGrid columns={2} spacing={1}>
      {props.items.map((item) => (
        <HStack width="140px" spacing={1} key={item.id}>
          {item.imageUrl ? (
            <Image
              layout="fixed"
              width={16}
              height={16}
              src={item.imageUrl}
              alt={item.name}
            />
          ) : null}
          <Text as="span" fontSize="xs">
            {item.name}
          </Text>
        </HStack>
      ))}
    </SimpleGrid>
  );
}

export function HealthCareFacilityFeaturesMobile(
  props: HealthCareFacilityFeaturesMobileProps
) {
  return (
    <Flex direction="column">
      {props.medicalFacility.length > 0 ? (
        <VStack width="full" align="start">
          <Text
            fontSize="md"
            color="charcoalGrey"
            fontWeight="semibold"
            fontFamily="poppins"
          >
            Fasilitas Medis
          </Text>
          <GenerateFeaturesDesktop items={props.medicalFacility} />
        </VStack>
      ) : null}
      {props.generalFacility.length > 0 ? (
        <VStack mt={4} width="full" align="start">
          <Text
            fontSize="md"
            color="charcoalGrey"
            fontWeight="semibold"
            fontFamily="poppins"
          >
            Fasilitas Umum
          </Text>
          <GenerateFeaturesDesktop items={props.generalFacility} />
        </VStack>
      ) : null}
      {props.insurance.length > 0 ? (
        <VStack mt={4} width="full" align="start">
          <Text
            fontSize="md"
            color="charcoalGrey"
            fontWeight="semibold"
            fontFamily="poppins"
          >
            Asuransi
          </Text>
          <GenerateFeaturesDesktop items={props.insurance} />
        </VStack>
      ) : null}
    </Flex>
  );
}

export function HealthCareFacilityFeaturesMobileSkeleton() {
  return (
    <Flex direction="column">
      {Array.from(Array(3).keys()).map((id) => (
        <VStack
          mt={id > 0 ? 6 : 0}
          key={id}
          width="full"
          spacing={3}
          align="start"
        >
          <Skeleton width="120px" height="24px" />
          <SimpleGrid columns={2} spacing={2}>
            {Array.from(Array(6).keys()).map((id) => (
              <Skeleton key={id} width="138px" height="20px" />
            ))}
          </SimpleGrid>
        </VStack>
      ))}
    </Flex>
  );
}
