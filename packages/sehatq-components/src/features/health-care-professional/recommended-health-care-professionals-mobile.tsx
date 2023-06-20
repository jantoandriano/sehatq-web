import React from "react";
import { Box, Text } from "../../user-interfaces";
import {
  HealthCareProfessionalHorizontalList,
  HealthCareProfessionalHorizontalListProps,
} from "./health-care-professional-horizontal-list";

export function RecommendedHealthCareProfessionalsMobile(
  props: HealthCareProfessionalHorizontalListProps
) {
  const { isLoading, professionalHealthCares } = props;
  return (
    <Box>
      <Text fontSize="md" fontFamily="poppins" mb={3} fontWeight="semibold">
        Rekomendasi Dokter
      </Text>
      <HealthCareProfessionalHorizontalList
        isMobile
        isLoading={isLoading}
        professionalHealthCares={professionalHealthCares}
      />
    </Box>
  );
}
