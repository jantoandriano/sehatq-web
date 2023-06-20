import {
  InfiniteHCFListCache,
  useGetHCFListQuery,
  useGetInfiniteHCFList,
} from "@sehatq/components";
import { useRouter } from "next/router";
import React from "react";
import { HealthCareFacilityListDesktop } from "./health-care-facility-list-desktop";
import { HealthCareFacilityListMobile } from "./health-care-facility-list-mobile";

export type HealtCareFacilityListProps = {
  isMobile: boolean;
};

function selectPagination(hcfList: InfiniteHCFListCache) {
  return hcfList.pages[hcfList.pages.length - 1].meta;
}

export function HealthCareFacilityList(props: HealtCareFacilityListProps) {
  const router = useRouter();
  const { isMobile } = props;

  const hcfListQuery = useGetHCFListQuery(
    router.query as Record<string, string | string[]>
  );

  const { data: hcfListPagination } = useGetInfiniteHCFList(hcfListQuery, {
    select: selectPagination,
  });

  const otherProps = {
    ...props,
    ...hcfListQuery,
    page: hcfListQuery.page,
    perPage: hcfListQuery.perPage,
    totalRecords: hcfListPagination?.total ?? 0,
    facility: hcfListQuery?.medicalFacilityId,
  };

  if (isMobile) {
    return <HealthCareFacilityListMobile {...otherProps} />;
  }

  return <HealthCareFacilityListDesktop {...otherProps} />;
}
