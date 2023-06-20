import { URLS } from "@sehatq/constants";
import React from "react";
import {
  InfiniteTelemedicineDoctorsCache,
  useGetInfiniteTelemedicineDoctors,
} from "./doctor-queries";
import {
  TelemedicineHCPSorterDesktop,
  TelemedicineHCPSorterDesktopSkeleton,
} from "./telemedicine-hcp-sorter-desktop";

export type TelemedicineHCPSorterProps = {
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
  navigateName?: keyof typeof URLS;
  hospitalSlug?: string;
};

function selectSorter(cache: InfiniteTelemedicineDoctorsCache) {
  return cache.pages[cache.pages.length - 1].meta;
}

export function TelemedicineHCPSorter(props: TelemedicineHCPSorterProps) {
  const {
    page = "1",
    perPage = "10",
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

  const { data: meta, isLoading } = useGetInfiniteTelemedicineDoctors(
    queryFilters,
    {
      select: selectSorter,
    }
  );

  if (isLoading) {
    return <TelemedicineHCPSorterDesktopSkeleton />;
  }

  if (!meta || !meta.sort) {
    return null;
  }

  const otherProps = {
    selectedValue: sortBy,
    selectedName: meta.sort.find((ft) => ft.id == sortBy)?.name ?? "",
    options: meta.sort,
    navigateName: props.navigateName,
  };

  return <TelemedicineHCPSorterDesktop {...otherProps} />;
}
