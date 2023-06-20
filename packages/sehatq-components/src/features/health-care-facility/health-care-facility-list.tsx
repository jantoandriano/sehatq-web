import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { AdSlot } from "../google-publisher-tag";
import { HCFList } from "./health-care-facility-model";
import {
  InfiniteHCFListCache,
  useGetInfiniteHCFList,
} from "./health-care-facility-queries";
import {
  HealthCareFacilityListDesktop,
  HealthCareFacilityListDesktopSkeleton,
} from "./health-care-facility-list-desktop";
import {
  HealthCareFacilityListMobile,
  HealthCareFacilityListMobileSkeleton,
} from "./health-care-facility-list-mobile";
import { EmptyHealthCareFacilityList } from "./empty-health-care-facility-list";

export type HealthCareFacilityListProps = {
  isMobile?: boolean;
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
  adsMiddle?: ReturnType<typeof AdSlot>[];
};

function selectHCFs(cache: InfiniteHCFListCache) {
  return cache.pages
    .reduce<HCFList[]>((oldItems, page) => [...oldItems, ...page.data], [])
    .map((hcf) => ({
      imageUrl: hcf.imageUrl,
      hcfSlug: hcf.slug,
      hcfName: hcf.name,
      hcfType: hcf.type,
      hcfClass: hcf.class,
      isPartner: Boolean(hcf.partner),
      isEmergency: Boolean(hcf.emergency),
      distance: hcf.distance,
      openTime: hcf.openTime,
      district: hcf.district,
      city: hcf.city,
      rating: hcf.rating,
    }));
}

function selectMeta(cache: InfiniteHCFListCache) {
  return cache.pages[cache.pages.length - 1].meta;
}

export function HealthCareFacilityList(props: HealthCareFacilityListProps) {
  const { ref: refInView, inView } = useInView();
  const {
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
    isMobile,
    adsMiddle,
  } = props;

  const filters = {
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
    fetchNextPage,
    isFetchingNextPage,
    data: doctors,
    isLoading,
  } = useGetInfiniteHCFList(filters, {
    select: selectHCFs,
  });

  const { data: meta } = useGetInfiniteHCFList(filters, {
    select: selectMeta,
  });

  const isMaxPage = meta?.total == 0 || meta?.page == meta?.maxPage;

  useEffect(() => {
    if (inView && !isFetchingNextPage && !isMaxPage && isMobile) {
      fetchNextPage();
    }
  }, [inView, isFetchingNextPage, isMaxPage, fetchNextPage, isMobile]);

  if (isLoading) {
    if (isMobile) return <HealthCareFacilityListMobileSkeleton />;
    return <HealthCareFacilityListDesktopSkeleton />;
  }

  if (doctors.length == 0) {
    return <EmptyHealthCareFacilityList isMobile={isMobile} />;
  }

  if (isMobile) {
    return (
      <HealthCareFacilityListMobile
        data={doctors ?? []}
        refInView={refInView}
        isMaxPage={isMaxPage}
        adsMiddle={adsMiddle}
      />
    );
  }
  return (
    <HealthCareFacilityListDesktop
      data={doctors ?? []}
      page={meta ? meta.page : 1}
      maxPage={meta ? meta?.maxPage : 1}
      adsMiddle={adsMiddle}
    />
  );
}
