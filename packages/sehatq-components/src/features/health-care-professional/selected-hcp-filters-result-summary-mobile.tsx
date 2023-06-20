import React from "react";
import { Box, Skeleton } from "../../user-interfaces";

export type SelectedHCPFiltersResultSummaryMobileProps = {
  start: string;
  end: string;
  totalRecords: string;
  speciality?: string;
  area?: string;
};

export function SelectedHCPFiltersResultSummaryMobile(
  props: SelectedHCPFiltersResultSummaryMobileProps
) {
  const { start, end, totalRecords, speciality, area } = props;
  return (
    <Box fontFamily="openSans" color="brownGrey.500" fontSize="xs">
      Menampilkan {start} - {end} dari {totalRecords} dokter {speciality} {area}{" "}
      yang ditemukan
    </Box>
  );
}

export function SelectedHCPFiltersResultSummaryMobileSkeleton() {
  return <Skeleton width={200} height={4} />;
}
