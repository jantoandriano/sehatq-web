import {
  Box,
  GridBlock,
  GridBlockItem,
  VStack,
  SehatQFooter,
  HealthCareFacilityProfile,
  RelatedHealthCareFacilitySearch,
  HealthCareFacilityDetailCard,
  HealthCareFacilityServices,
  HealthCareFacilityFeatures,
  UnavailableHealthCareFacilityBookingInfo,
} from "@sehatq/components";
import React from "react";

import { HealthCareFacilityHead } from "@components/head";
import { SehatqNavbar } from "@components/ui/sehatq-navbar";

export type HealthCareFacilityDesktopProps = {
  slug: string;
  userLat: string;
  userLong: string;
  hcfId: string;
  bookingOnline: boolean;
};

export function HealthCareFacilityDesktop(
  props: HealthCareFacilityDesktopProps
) {
  return (
    <>
      <HealthCareFacilityHead />
      <Box>
        <SehatqNavbar withCompanyPartner />
        <GridBlock my={12} isReverse>
          <GridBlockItem>
            <VStack spacing={9}>
              <HealthCareFacilityDetailCard {...props} />
              <HealthCareFacilityServices {...props} />
              <HealthCareFacilityProfile {...props} />
              <HealthCareFacilityFeatures {...props} />
            </VStack>
          </GridBlockItem>
          <GridBlockItem>
            <VStack spacing={4} position="sticky" top="144px">
              {props.bookingOnline ? (
                <RelatedHealthCareFacilitySearch
                  {...props}
                  hcfSlug={props.slug}
                />
              ) : (
                <UnavailableHealthCareFacilityBookingInfo isMobile={false} />
              )}
            </VStack>
          </GridBlockItem>
        </GridBlock>
      </Box>
      <Box marginBottom={10} marginTop={32}>
        <SehatQFooter {...props} isMobile={false} />
      </Box>
    </>
  );
}
