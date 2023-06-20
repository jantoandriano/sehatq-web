import React from "react";
import { Box, Skeleton } from "../../user-interfaces";

export type SelectedHCPFiltersResultSummaryDesktopProps = {
  start: string;
  end: string;
  totalRecords: string;
  speciality?: string;
  area?: string;
};

export function SelectedHCPFiltersResultSummaryDesktop(
  props: SelectedHCPFiltersResultSummaryDesktopProps
) {
  const { start, end, totalRecords, speciality, area } = props;
  return (
    <Box fontFamily="openSans" color="brownGrey.500" fontSize="xs">
      Menampilkan {start} - {end} dari {totalRecords} Dokter {speciality} {area}{" "}
      yang ditemukan
    </Box>
  );
}

export function SelectedHCPFiltersResultSummaryDesktopSkeleton() {
  return <Skeleton width={300} height={4} />;
}
