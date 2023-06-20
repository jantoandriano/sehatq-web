import React from "react";
import { Box, SimpleGrid, HStack } from "../../user-interfaces";
import {
  SimpleHealthCareFacilityCard,
  SimpleHealthCareFacilityCardProps,
  SimpleHealthCareFacilityCardSkeleton,
} from "./simple-health-care-facility-card";

export interface HealthCareFacilityHorizontalListDesktopProps {
  healthCareFacilities: Omit<SimpleHealthCareFacilityCardProps, "isMobile">[];
  isLoading: boolean;
}

export function HealthCareFacilityHorizontalListDesktop({
  healthCareFacilities,
  isLoading,
}: HealthCareFacilityHorizontalListDesktopProps) {
  return (
    <SimpleGrid spacing={2.5} columns={healthCareFacilities.length || 5}>
      {healthCareFacilities.length ? (
        healthCareFacilities.map((healthCareFacility) => (
          <Box key={healthCareFacility.slug}>
            <SimpleHealthCareFacilityCard
              isMobile={false}
              {...healthCareFacility}
            />
          </Box>
        ))
      ) : isLoading ? (
        <HealthCareFacilityHorizontalListSkeletonDesktop />
      ) : null}
    </SimpleGrid>
  );
}

export function HealthCareFacilityHorizontalListSkeletonDesktop() {
  return (
    <HStack spacing={2.5}>
      {Array.from(Array(5).keys()).map((id) => (
        <Box key={id} minWidth="144px">
          <SimpleHealthCareFacilityCardSkeleton />
        </Box>
      ))}
    </HStack>
  );
}
