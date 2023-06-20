import React from "react";
import { HealthCareProfessionalDistrictLinksDesktop } from "./health-care-professional-district-links-desktop";
import { HealthCareProfessionalDistrictLinksMobile } from "./health-care-professional-district-links-mobile";
import {
  InfiniteHCPListCache,
  useGetInfiniteHCPList,
} from "./health-care-professional-queries";
import {
  SpecialityLinkCache,
  useGetSpecialityLink,
} from "./health-care-professional-speciality-queries";

export type HealthCareProfessionalDistrictLinksProps = {
  isMobile: boolean;
  page: number;
  perPage?: number;
  userLat?: string;
  userLong?: string;
  query?: string;
  procedureId?: string;
  scheduleDayId?: string;
  citySlug: string;
  districtSlug?: string;
  gender?: string;
  specialitySlug?: string;
  sortBy?: string;
  hcfId?: string;
};

function selectMetaDistricts(hcpList: InfiniteHCPListCache) {
  return hcpList.pages[hcpList.pages.length - 1].meta.cities[0]?.district;
}

function selectSpecialityLink(hcpSpeciality: SpecialityLinkCache) {
  return hcpSpeciality.data;
}

export function HealthCareProfessionalDistrictLinks(
  props: HealthCareProfessionalDistrictLinksProps
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

  const { data: hcpDistricts } = useGetInfiniteHCPList(queryFilter, {
    select: selectMetaDistricts,
  });

  const { data: specialityList } = useGetSpecialityLink({
    select: selectSpecialityLink,
  });

  const foundSpeciality = specialityList?.find(
    (item) => item.slug === specialitySlug
  );

  if (!hcpDistricts) {
    return null;
  }

  const otherProps = {
    districtData: hcpDistricts,
    citySlug,
    specialitySlug,
    specialityName: foundSpeciality ? foundSpeciality.name : "",
  };

  if (isMobile) {
    return <HealthCareProfessionalDistrictLinksMobile {...otherProps} />;
  }

  return <HealthCareProfessionalDistrictLinksDesktop {...otherProps} />;
}
