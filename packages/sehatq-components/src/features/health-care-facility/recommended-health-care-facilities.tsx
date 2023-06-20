import React from "react";
import {
  useGetHCFList,
  HCFListCache,
  HCFListQuery,
} from "./health-care-facility-queries";
import { RecommendedHealthCareFacilitiesDesktop } from "./recommended-health-care-facilities-desktop";
import { RecommendedHealthCareFacilititesMobile } from "./recommended-health-care-facilities-mobile";

export type RecommendedHealthCareFacilitiesProps = {
  isMobile?: boolean;
} & Partial<HCFListQuery>;

function selectRecommendedHealtCareFacilities({ data }: HCFListCache) {
  return data.map((item) => {
    const { name, type, imageUrl, city, district, partner, slug } = item;
    return {
      hcfName: name,
      imageUrl,
      partner,
      slug,
      hcfType: type,
      district,
      city,
    };
  });
}

export function RecommendedHealthCareFacilities(
  props: RecommendedHealthCareFacilitiesProps
) {
  const {
    isMobile,
    sortBy = "terdekat",
    perPage = "5",
    userLat = "",
    userLong = "",
    page = "1",
  } = props;
  const { data: healthCareFacilities = [], isLoading } = useGetHCFList(
    {
      sortBy,
      perPage,
      userLat,
      userLong,
      page,
      partner: "",
      hcfTypeSlug: "",
      procedureId: "",
      medicalFacilityId: "",
      query: "",
      citySlug: "",
    },
    { select: selectRecommendedHealtCareFacilities }
  );

  const otherProps = {
    isLoading,
    healthCareFacilities,
  };

  if (!healthCareFacilities.length && !isLoading) return null;

  if (isMobile) {
    return <RecommendedHealthCareFacilititesMobile {...otherProps} />;
  }

  return <RecommendedHealthCareFacilitiesDesktop {...otherProps} />;
}
