import {
  Box,
  HealthCareFacilityDetailCard,
  HealthCareFacilityFeatures,
  HealthCareFacilityProfile,
  HealthCareFacilityServices,
  RelatedHealthCareFacilitySearch,
  UnavailableHealthCareFacilityBookingInfo,
  SehatQFooter,
} from "@sehatq/components";
import React from "react";
import { HealthCareFacilityHead } from "@components/head";

export type HealthCareFacilityMobileProps = {
  slug: string;
  userLat: string;
  userLong: string;
  hcfId: string;
  bookingOnline: boolean;
};

export function HealthCareFacilityMobile(props: HealthCareFacilityMobileProps) {
  return (
    <Box background="#F5F5F5">
      <HealthCareFacilityHead />
      <Box background="white">
        <HealthCareFacilityDetailCard {...props} isMobile />
      </Box>
      <HealthCareFacilityServices {...props} isMobile />
      <Box background="white" p={4}>
        <HealthCareFacilityProfile {...props} isMobile />
      </Box>
      <Box background="white" mt={3} p={4}>
        <HealthCareFacilityFeatures {...props} isMobile />
      </Box>
      <Box background="white" p={4} align="normal">
        <SehatQFooter {...props} isMobile />
      </Box>
      <Box position="sticky" bottom="0" p={4} background="white">
        {props.bookingOnline ? (
          <RelatedHealthCareFacilitySearch
            {...props}
            hcfSlug={props.slug}
            isMobile
          />
        ) : (
          <UnavailableHealthCareFacilityBookingInfo isMobile />
        )}
      </Box>
    </Box>
  );
}
