import React from "react";
import { Box, Text } from "../../user-interfaces";
import { HealthCareFacilityHorizontalList } from "./health-care-facility-horizontal-list";
import { HealthCareFacilityHorizontalListDesktopProps } from "./health-care-facility-horizontal-list-desktop";

export function RecommendedHealthCareFacilitiesDesktop(
  props: HealthCareFacilityHorizontalListDesktopProps
) {
  const { isLoading, healthCareFacilities } = props;
  return (
    <Box>
      <Text fontSize="md" fontFamily="poppins" mb={3} fontWeight="semibold">
        Rekomendasi Faskes
      </Text>
      <HealthCareFacilityHorizontalList
        isLoading={isLoading}
        healthCareFacilities={healthCareFacilities}
      />
    </Box>
  );
}
