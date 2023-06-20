import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { AdSlot } from "../google-publisher-tag";
import { EmptyHealthCareProfessionalList } from "./empty-health-care-professional-list";
import { HealthCareProfessionalCardSkeleton } from "./health-care-professional-card";
import { HealthCareProfessionalListDesktop } from "./health-care-professional-list-desktop";
import { HealthCareProfessionalListMobile } from "./health-care-professional-list-mobile";
import { HCPList } from "./health-care-professional-model";
import {
  InfiniteHCPListCache,
  useGetInfiniteHCPList,
} from "./health-care-professional-queries";

export type HealthCareProfessionalListProps = {
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
  adsMiddle?: ReturnType<typeof AdSlot>[];
};

function selectHCPList(hcpList: InfiniteHCPListCache) {
  return hcpList.pages.reduce<HCPList[]>(
    (oldItems, page) => [...oldItems, ...page.data],
    []
  );
}

function selectPagination(hcpList: InfiniteHCPListCache) {
  return hcpList.pages[hcpList.pages.length - 1].meta;
}

export function HealthCareProfessionalList(
  props: HealthCareProfessionalListProps
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
    adsMiddle,
  } = props;
  const { ref: refInView, inView } = useInView();

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
    fetchNextPage,
    isFetchingNextPage,
    data: hcpData,
    isLoading,
    error,
  } = useGetInfiniteHCPList(queryFilter, {
    select: selectHCPList,
  });

  const { data: hcpListPagination } = useGetInfiniteHCPList(queryFilter, {
    select: selectPagination,
  });

  const isMaxPage =
    hcpListPagination?.total == 0 ||
    hcpListPagination?.page == hcpListPagination?.maxPage
      ? true
      : false;

  useEffect(() => {
    if (inView && !isFetchingNextPage && !isMaxPage && isMobile) {
      fetchNextPage();
    }
  }, [inView, isFetchingNextPage, isMaxPage, fetchNextPage, isMobile]);

  const otherProps = {
    data: error ? [] : hcpData ?? [],
    page: error ? Number(queryFilter.page) : hcpListPagination?.page,
    maxPage: error ? 1 : hcpListPagination?.maxPage,
    refInView: refInView,
    isMaxPage,
    adsMiddle,
  };

  if (isLoading) {
    return <HealthCareProfessionalCardSkeleton isMobile={isMobile} />;
  }

  if (otherProps.data.length == 0) {
    return <EmptyHealthCareProfessionalList isMobile={isMobile} />;
  }

  if (isMobile) {
    return <HealthCareProfessionalListMobile {...otherProps} />;
  }
  return <HealthCareProfessionalListDesktop {...otherProps} />;
}
