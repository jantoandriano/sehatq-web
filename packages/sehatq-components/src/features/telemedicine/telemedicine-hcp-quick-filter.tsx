import { URLS } from "@sehatq/constants";
import React from "react";
import {
  InfiniteTelemedicineDoctorsCache,
  useGetInfiniteTelemedicineDoctors,
} from "./doctor-queries";
import { TelemedicineHCPQuickFilterMobile } from "./telemedicine-hcp-quick-filter-mobile";

export type TelemedicineHCPQuickFilterProps = {
  page: string;
  perPage: string;
  sortBy?: string;
  userLat?: string;
  userLong?: string;
  query?: string;
  campaignSlug?: string;
  city?: string;
  doctorExperience?: string;
  gender?: string;
  price?: string;
  specialitySlug?: string;
  hospitalSlug?: string;
  navigateName?: keyof typeof URLS;
};

function selectQuickFilter(cache: InfiniteTelemedicineDoctorsCache) {
  return cache.pages[cache.pages.length - 1].meta;
}
export type QuickFilterKeys =
  | "specialitySlug"
  | "price"
  | "city"
  | "campaignSlug"
  | "doctorExperience"
  | "gender"
  | "sort";

export function TelemedicineHCPQuickFilter(
  props: TelemedicineHCPQuickFilterProps
) {
  const {
    page = "1",
    perPage = "12",
    sortBy = "",
    userLat = "",
    userLong = "",
    query = "",
    campaignSlug = "",
    city = "",
    doctorExperience = "",
    gender = "",
    price = "",
    specialitySlug = "",
    hospitalSlug = "",
    navigateName,
  } = props;

  const queryFilters = {
    page,
    perPage,
    sort: sortBy,
    userLat,
    userLon: userLong,
    search: query,
    campaignSlug,
    city,
    doctorExperience,
    gender,
    price,
    specialityId: specialitySlug,
    hospitalId: hospitalSlug,
  };

  if (sortBy != "nearby") {
    queryFilters.userLat = "";
    queryFilters.userLon = "";
  }

  const { data: meta } = useGetInfiniteTelemedicineDoctors(queryFilters, {
    select: selectQuickFilter,
  });

  if (!meta || !meta.quickFilter) {
    return null;
  }

  const values = {
    sort: sortBy,
    campaignSlug,
    city,
    doctorExperience,
    gender,
    price,
    specialitySlug,
  };

  const newQuickFilter = meta.quickFilter.map((quick) => {
    if (quick.param == "specialityId") {
      const slug = meta.filters.specialities.find(
        (f) => f.id.toString() == quick.id
      )?.slug;
      if (slug) {
        quick.id = slug;
      }
    }
    return quick;
  });

  const otherProps = {
    filterOptions: newQuickFilter,
    filterActive: Object.keys(values ?? {})
      .map((key) => values[key as QuickFilterKeys])
      .filter(Boolean),
    navigateName,
  };

  return <TelemedicineHCPQuickFilterMobile {...otherProps} />;
}
