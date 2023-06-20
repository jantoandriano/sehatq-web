import React from "react";
import { Flex, Box } from "../../user-interfaces";
import {
  SimpleHealthCareProfessionalCard,
  SimpleHealthCareProfessionalCardProps,
  SimpleHealthCareProfessionalCardSkeleton,
} from "./simple-health-care-professional-card";

export interface HealthCareProfessionalHorizontalListMobileProps {
  professionalHealthCares: Omit<
    SimpleHealthCareProfessionalCardProps,
    "isMobile"
  >[];
  isLoading: boolean;
}

export function HealthCareProfessionalHorizontalListMobile({
  professionalHealthCares,
  isLoading,
}: HealthCareProfessionalHorizontalListMobileProps) {
  return (
    <Flex
      width="calc(100% + 24px)"
      overflowX="auto"
      marginLeft={-3}
      py={2}
      px={3}
    >
      {professionalHealthCares.length
        ? professionalHealthCares.map((professionalHealthCare, index) => (
            <Box
              minWidth="144px"
              key={professionalHealthCare.doctorSlug}
              marginLeft={index === 0 ? 0 : 2.5}
            >
              <SimpleHealthCareProfessionalCard
                isMobile
                {...professionalHealthCare}
              />
            </Box>
          ))
        : isLoading
        ? Array.from(Array(3).keys()).map((id, index) => (
            <Box
              key={id}
              marginRight={3}
              marginLeft={index === 0 ? 2.5 : 0}
              minWidth="244px"
            >
              <SimpleHealthCareProfessionalCardSkeleton key={id} />
            </Box>
          ))
        : null}
    </Flex>
  );
}
