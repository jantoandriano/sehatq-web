import React from "react";
import { Box, Text } from "../../user-interfaces";
import {
  HealthCareProfessionalHorizontalList,
  type HealthCareProfessionalHorizontalListProps,
} from "./health-care-professional-horizontal-list";

export function RecommendedHealthCareProfessionalsDesktop(
  props: HealthCareProfessionalHorizontalListProps
) {
  const { isLoading, professionalHealthCares } = props;
  return (
    <Box>
      <Text fontSize="md" fontFamily="poppins" mb={3} fontWeight="semibold">
        Rekomendasi Dokter
      </Text>
      <HealthCareProfessionalHorizontalList
        isLoading={isLoading}
        professionalHealthCares={professionalHealthCares}
      />
    </Box>
  );
}
