import React from "react";
import { Box, VStack } from "../../user-interfaces";
import { AdSlot } from "../google-publisher-tag";

import {
  HealthCareFacilityCard,
  HealthCareFacilityCardProps,
  HealthCareFacilityCardSkeleton,
} from "./health-care-facility-card";

export type HealthCareFacilityListMobileProps = {
  data: HealthCareFacilityCardProps[];
  refInView?: (node?: Element | null) => void;
  isMaxPage?: boolean;
  adsMiddle?: ReturnType<typeof AdSlot>[];
};

export function HealthCareFacilityListMobile(
  props: HealthCareFacilityListMobileProps
) {
  const { data, refInView, isMaxPage, adsMiddle } = props;
  return (
    <VStack width="full" alignItems="normal" spacing={4}>
      {data.map((hcf, index) => (
        <React.Fragment key={hcf.hcfSlug}>
          <HealthCareFacilityCard {...hcf} isMobile />
          {index == 2 && adsMiddle && <Box marginTop={4}>{adsMiddle[0]}</Box>}
          {index == 9 && adsMiddle && <Box marginTop={4}>{adsMiddle[1]}</Box>}
        </React.Fragment>
      ))}
      {!isMaxPage && (
        <Box ref={refInView} marginTop={4}>
          <HealthCareFacilityCardSkeleton isMobile />
        </Box>
      )}
    </VStack>
  );
}

export function HealthCareFacilityListMobileSkeleton() {
  return (
    <>
      {Array.from(Array(4).keys()).map((index) => {
        return (
          <Box key={index} pb={4}>
            <HealthCareFacilityCardSkeleton isMobile />
          </Box>
        );
      })}
    </>
  );
}
