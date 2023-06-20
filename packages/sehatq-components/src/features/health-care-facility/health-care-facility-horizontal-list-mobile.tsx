import React from "react";
import { Box, Flex } from "../../user-interfaces";
import {
  SimpleHealthCareFacilityCard,
  SimpleHealthCareFacilityCardProps,
  SimpleHealthCareFacilityCardSkeleton,
} from "./simple-health-care-facility-card";

export interface HealthCareFacilityHorizontalListMobileProps {
  healthCareFacilities: Omit<SimpleHealthCareFacilityCardProps, "isMobile">[];
  isLoading: boolean;
}

export function HealthCareFacilityHorizontalListMobile({
  healthCareFacilities,
  isLoading,
}: HealthCareFacilityHorizontalListMobileProps) {
  return (
    <Flex
      width="calc(100% + 24px)"
      overflowX="auto"
      marginLeft={-3}
      pb={2}
      px={3}
    >
      {healthCareFacilities.length ? (
        healthCareFacilities.map((healthCareFacility, index) => (
          <Box
            minWidth="144px"
            key={healthCareFacility.slug}
            marginLeft={index === 0 ? 0 : 2.5}
          >
            <SimpleHealthCareFacilityCard isMobile {...healthCareFacility} />
          </Box>
        ))
      ) : isLoading ? (
        <HealthCareFacilityHorizontalListSkeletonMobile />
      ) : null}
    </Flex>
  );
}

export function HealthCareFacilityHorizontalListSkeletonMobile() {
  return (
    <Flex
      width="calc(100% + 24px)"
      overflowX="auto"
      marginLeft={-3}
      pb={2}
      px={3}
    >
      {Array.from(Array(5).keys()).map((id, index) => (
        <Box key={id} marginLeft={index === 0 ? 0 : 2.5} minWidth="144px">
          <SimpleHealthCareFacilityCardSkeleton isMobile />
        </Box>
      ))}
    </Flex>
  );
}
