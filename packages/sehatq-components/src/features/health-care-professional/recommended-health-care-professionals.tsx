import React from "react";
import {
  HCPListQuery,
  HCPListCache,
  useGetHCPList,
} from "./health-care-professional-queries";
import { RecommendedHealthCareProfessionalsDesktop } from "./recommended-health-care-professionals-desktop";
import { RecommendedHealthCareProfessionalsMobile } from "./recommended-health-care-professionals-mobile";

export type RecommendedHealthCareProfessionalsProps = {
  isMobile?: boolean;
} & Partial<HCPListQuery>;

function selectRecommendedHealtCareProfessionals({ data }: HCPListCache) {
  return data.map((item) => {
    const { name, slug, specialityHcp, hcfName, location, imageUrl, imageAlt } =
      item;
    return {
      doctorName: name,
      doctorSlug: slug,
      speciality: specialityHcp.name,
      hcfName,
      hcfAddress: location,
      imageUrl,
      imageAlt,
    };
  });
}

export function RecommendedHealthCareProfessionals(
  props: RecommendedHealthCareProfessionalsProps
) {
  const {
    isMobile,
    page = "1",
    perPage = "5",
    userLat = "",
    userLong = "",
    query = "",
    procedureId = "",
    scheduleDayId = "",
    citySlug = "",
    gender = "",
    specialitySlug = "",
    sortBy = "terdekat",
    hcfId = "",
  } = props;

  const { data: professionalHealthCares = [], isLoading } = useGetHCPList(
    {
      page,
      perPage,
      userLat,
      userLong,
      query,
      procedureId,
      scheduleDayId,
      citySlug,
      gender,
      specialitySlug,
      sortBy,
      hcfId,
    },
    { select: selectRecommendedHealtCareProfessionals }
  );

  const otherProps = {
    isLoading,
    professionalHealthCares,
  };

  if (!professionalHealthCares.length && !isLoading) return null;

  if (isMobile) {
    return <RecommendedHealthCareProfessionalsMobile {...otherProps} />;
  }

  return <RecommendedHealthCareProfessionalsDesktop {...otherProps} />;
}
