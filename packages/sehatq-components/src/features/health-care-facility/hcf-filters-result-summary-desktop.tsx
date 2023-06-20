import React from "react";
import { Box, Skeleton, Text } from "../../user-interfaces";

export type HCFFiltersResultSummaryDesktopProps = {
  start: string;
  end: string;
  totalRecords: string;
  hcfType?: string;
  area?: string;
};

export function HCFFiltersResultSummaryDesktop(
  props: HCFFiltersResultSummaryDesktopProps
) {
  const { start, end, totalRecords, hcfType, area } = props;
  return (
    <Box fontFamily="openSans" color="brownGrey.500" fontSize="xs">
      Menampilkan{" "}
      <Text as="label" fontWeight="bold">
        {start}
      </Text>{" "}
      -
      <Text as="label" fontWeight="bold">
        {end}
      </Text>{" "}
      dari
      <Text as="label" fontWeight="bold">
        {totalRecords}
      </Text>{" "}
      {hcfType ?? "faskes"} {area} yang ditemukan
    </Box>
  );
}

export function HCFFiltersResultSummaryDesktopSkeleton() {
  return <Skeleton width={300} height={4} />;
}
