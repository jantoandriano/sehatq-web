import { generatePriceDisplay, slugToName } from "@sehatq/utils";
import React from "react";
import {
  HCFFiltersResultSummaryDesktop,
  HCFFiltersResultSummaryDesktopSkeleton,
} from "./hcf-filters-result-summary-desktop";
import {
  HCFFiltersResultSummaryMobile,
  HCFFiltersResultSummaryMobileSkeleton,
} from "./hcf-filters-result-summary-mobile";
import {
  InfiniteHCFListCache,
  useGetInfiniteHCFList,
} from "./health-care-facility-queries";

export type HCFFiltersResultSummaryProps = {
  isMobile: boolean;
  page: string;
  perPage: string;
  sortBy?: string;
  userLat?: string;
  userLong?: string;
  query?: string;
  partner?: string;
  hcfTypeSlug?: string;
  procedureId?: string;
  facility?: string;
  citySlug?: string;
  districtSlug?: string;
};

function selectHCPMeta(hcpList: InfiniteHCFListCache) {
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

export function HCFFiltersResultSummary(props: HCFFiltersResultSummaryProps) {
  const {
    isMobile,
    page = "1",
    perPage = "16",
    sortBy = "",
    userLat = "",
    userLong = "",
    query = "",
    partner = "",
    hcfTypeSlug = "",
    procedureId = "",
    facility = "",
    citySlug = "",
    districtSlug = "",
  } = props;

  const queryFilter = {
    page,
    perPage,
    sortBy,
    userLat,
    userLong,
    query,
    partner,
    hcfTypeSlug,
    procedureId,
    medicalFacilityId: facility,
    citySlug,
    districtSlug,
  };

  const {
    data: hcpMeta,
    isLoading,
    error,
  } = useGetInfiniteHCFList(queryFilter, {
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
    hcfType: queryFilter.hcfTypeSlug
      ? slugToName(queryFilter.hcfTypeSlug)
      : undefined,
    area,
  };

  if (isLoading) {
    return <HCFFiltersResultSummarySkeleton isMobile={isMobile} />;
  }

  if (error || totalRecords == 0) {
    return null;
  }

  if (isMobile) {
    return <HCFFiltersResultSummaryMobile {...otherProps} />;
  }

  return <HCFFiltersResultSummaryDesktop {...otherProps} />;
}

export type HCFFiltersResultSummarySkeletonProps = {
  isMobile: boolean;
};

export function HCFFiltersResultSummarySkeleton(
  props: HCFFiltersResultSummarySkeletonProps
) {
  const { isMobile } = props;
  if (isMobile) return <HCFFiltersResultSummaryMobileSkeleton />;

  return <HCFFiltersResultSummaryDesktopSkeleton />;
}
