import React from "react";
import { HealthCareProfessionalCityLinksDesktop } from "./health-care-professional-city-links-desktop";
import { HealthCareProfessionalCityLinksMobile } from "./health-care-professional-city-links-mobile";
import {
  InfiniteHCPListCache,
  useGetInfiniteHCPList,
} from "./health-care-professional-queries";
import {
  SpecialityLinkCache,
  useGetSpecialityLink,
} from "./health-care-professional-speciality-queries";

export type HealthCareProfessionalCityLinksProps = {
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

function selectMetaCities(hcpList: InfiniteHCPListCache) {
  return hcpList.pages[hcpList.pages.length - 1].meta.cities;
}

function selectSpecialityLink(hcpSpeciality: SpecialityLinkCache) {
  return hcpSpeciality.data;
}

export function HealthCareProfessionalCityLinks(
  props: HealthCareProfessionalCityLinksProps
) {
  const {
    isMobile = false,
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

  const { data: hcpCities } = useGetInfiniteHCPList(queryFilter, {
    select: selectMetaCities,
  });

  const { data: specialityList } = useGetSpecialityLink({
    select: selectSpecialityLink,
  });

  const foundSpeciality = specialityList?.find(
    (item) => item.slug === specialitySlug
  );

  if (!hcpCities) {
    return null;
  }

  const otherProps = {
    cityData: hcpCities,
    specialitySlug,
    specialityName: foundSpeciality ? foundSpeciality.name : "",
  };

  if (isMobile) {
    return <HealthCareProfessionalCityLinksMobile {...otherProps} />;
  }

  return <HealthCareProfessionalCityLinksDesktop {...otherProps} />;
}
