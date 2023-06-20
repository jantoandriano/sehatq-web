import {
  InfiniteHCPListCache,
  useGetHCPListQuery,
  useGetInfiniteHCPList,
} from "@sehatq/components";
import { useRouter } from "next/router";
import React from "react";
import { HealthCareProfessionalsDesktop } from "./health-care-professionals-desktop";
import { HealthCareProfessionalsMobile } from "./health-care-professionals-mobile";

export type HealtCareProfessionalsProps = {
  isMobile: boolean;
};

function selectPagination(hcpList: InfiniteHCPListCache) {
  return hcpList.pages[hcpList.pages.length - 1].meta;
}

export function HealthCareProfessionals(props: HealtCareProfessionalsProps) {
  const router = useRouter();
  const { isMobile } = props;

  const hcpListQuery = useGetHCPListQuery(
    router.query as Record<string, string | string[]>
  );

  const { data: hcpListPagination } = useGetInfiniteHCPList(hcpListQuery, {
    select: selectPagination,
  });

  const otherProps = {
    ...props,
    ...hcpListQuery,
    page: Number(hcpListQuery.page),
    perPage: Number(hcpListQuery.perPage),
    totalRecords: hcpListPagination?.total ?? 0,
  };

  if (isMobile) {
    return <HealthCareProfessionalsMobile {...otherProps} />;
  }

  return <HealthCareProfessionalsDesktop {...otherProps} />;
}
