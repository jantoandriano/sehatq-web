import React from "react";
import { Box, Text } from "../../user-interfaces";
import { HealthCareFacilityHorizontalList } from "./health-care-facility-horizontal-list";
import { HealthCareFacilityHorizontalListMobileProps } from "./health-care-facility-horizontal-list-mobile";

export function RecommendedHealthCareFacilititesMobile(
  props: HealthCareFacilityHorizontalListMobileProps
) {
  const { isLoading, healthCareFacilities } = props;
  return (
    <Box>
      <Text fontSize="md" fontFamily="poppins" mb={3} fontWeight="semibold">
        Rekomendasi Faskes
      </Text>
      <HealthCareFacilityHorizontalList
        isMobile
        isLoading={isLoading}
        healthCareFacilities={healthCareFacilities}
      />
    </Box>
  );
}
