import React from "react";
import { Box, Skeleton, Text } from "../../user-interfaces";

export type HCFFiltersResultSummaryMobileProps = {
  totalRecords: string;
  hcfType?: string;
  area?: string;
};

export function HCFFiltersResultSummaryMobile(
  props: HCFFiltersResultSummaryMobileProps
) {
  const { totalRecords, hcfType, area } = props;
  return (
    <Box fontFamily="openSans" color="brownGrey.500" fontSize="xs">
      Total{" "}
      <Text as="label" fontSize="xs" fontWeight="semibold" color="charcoalGrey">
        {totalRecords}
      </Text>{" "}
      {hcfType ?? "Faskes"} {area} siap melayanimu
    </Box>
  );
}

export function HCFFiltersResultSummaryMobileSkeleton() {
  return <Skeleton width={200} height={4} />;
}
