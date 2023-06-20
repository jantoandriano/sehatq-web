import React from "react";
import { Box, SimpleGrid } from "../../user-interfaces";
import {
  SimpleHealthCareProfessionalCard,
  SimpleHealthCareProfessionalCardProps,
  SimpleHealthCareProfessionalCardSkeleton,
} from "./simple-health-care-professional-card";

export interface HealthCareProfessionalHorizontalListDesktopProps {
  professionalHealthCares: Omit<
    SimpleHealthCareProfessionalCardProps,
    "isMobile"
  >[];
  isLoading: boolean;
}

export function HealthCareProfessionalHorizontalListDesktop({
  professionalHealthCares,
  isLoading,
}: HealthCareProfessionalHorizontalListDesktopProps) {
  return (
    <SimpleGrid spacing={3} columns={professionalHealthCares.length || 5}>
      {professionalHealthCares.length
        ? professionalHealthCares.map((professionalHealthCare) => (
            <Box key={professionalHealthCare.doctorSlug}>
              <SimpleHealthCareProfessionalCard
                isMobile={false}
                {...professionalHealthCare}
              />
            </Box>
          ))
        : isLoading
        ? Array.from(Array(5).keys()).map((id) => (
            <Box key={id}>
              <SimpleHealthCareProfessionalCardSkeleton key={id} />
            </Box>
          ))
        : null}
    </SimpleGrid>
  );
}
