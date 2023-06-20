import { generatePriceDisplay, slugToName } from "@sehatq/utils";
import React from "react";
import {
  SelectedHCPFiltersResultSummaryDesktop,
  SelectedHCPFiltersResultSummaryDesktopSkeleton,
} from "./selected-hcp-filters-result-summary-desktop";
import {
  SelectedHCPFiltersResultSummaryMobile,
  SelectedHCPFiltersResultSummaryMobileSkeleton,
} from "./selected-hcp-filters-result-summary-mobile";
import {
  InfiniteHCPListCache,
  useGetInfiniteHCPList,
} from "./health-care-professional-queries";

export type SelectedHCPFiltersResultSummaryProps = {
  isMobile: boolean;
  page: number;
  perPage?: number;
  userLat?: string;
  userLong?: string;
  query?: string;
  procedureId?: string;
  scheduleDayId?: string;
  citySlug?: string;
  districtSlug?: string;
  gender?: string;
  specialitySlug?: string;
  sortBy?: string;
  hcfId?: string;
};

function selectHCPMeta(hcpList: InfiniteHCPListCache) {
  return hcpList.pages[hcpList.pages.length - 1].meta;
}

function generateArea(citySlug: string, districtSlug: string) {
  const city = citySlug ? slugToName(citySlug) : "";
  const district = districtSlug ? slugToName(districtSlug) : "";
  let area = "";
  if (city && district) {
    area = `di ${district}, ${city}`;
  } else if (city || district) {
    area = `di ${district} ${city}`;
  }
  return area;
}

export function SelectedHCPFiltersResultSummary(
  props: SelectedHCPFiltersResultSummaryProps
) {
  const {
    isMobile,
    page = 1,
    perPage = 9,
    userLat = "",
    userLong = "",
    query = "",
    procedureId = "",
    scheduleDayId = "",
    citySlug = "",
    districtSlug = "",
    gender = "",
    specialitySlug = "",
    sortBy = "",
    hcfId = "",
  } = props;

  const queryFilter = {
    page: `${page}`,
    perPage: `${perPage}`,
    userLat,
    userLong,
    query,
    procedureId,
    scheduleDayId,
    citySlug,
    districtSlug,
    gender,
    specialitySlug,
    sortBy,
    hcfId,
  };

  const {
    data: hcpMeta,
    isLoading,
    error,
  } = useGetInfiniteHCPList(queryFilter, {
    select: selectHCPMeta,
  });

  const currentPage = hcpMeta?.page ?? 1;
  const limit = hcpMeta?.perPage ?? 1;
  const totalPage = hcpMeta?.maxPage ?? 1;
  const totalRecords = hcpMeta?.total ?? 0;
  const start = generatePriceDisplay((currentPage - 1) * limit + 1, "");
  const end =
    currentPage == totalPage ? totalRecords : (currentPage - 1) * limit + limit;
  const area = generateArea(queryFilter.citySlug, queryFilter.districtSlug);

  const otherProps = {
    start,
    end: generatePriceDisplay(end, ""),
    totalRecords: generatePriceDisplay(totalRecords, ""),
    speciality: queryFilter.specialitySlug
      ? slugToName(queryFilter.specialitySlug)
      : "",
    area,
  };

  if (isLoading) {
    return <SelectedHCPFiltersResultSummarySkeleton isMobile={isMobile} />;
  }

  if (error || totalRecords == 0) {
    return null;
  }

  if (isMobile) {
    return <SelectedHCPFiltersResultSummaryMobile {...otherProps} />;
  }

  return <SelectedHCPFiltersResultSummaryDesktop {...otherProps} />;
}

export type SelectedHCPFiltersResultSummarySkeletonProps = {
  isMobile: boolean;
};

export function SelectedHCPFiltersResultSummarySkeleton(
  props: SelectedHCPFiltersResultSummarySkeletonProps
) {
  const { isMobile } = props;
  if (isMobile) return <SelectedHCPFiltersResultSummaryMobileSkeleton />;

  return <SelectedHCPFiltersResultSummaryDesktopSkeleton />;
}
