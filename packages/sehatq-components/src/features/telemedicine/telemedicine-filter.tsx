import { URLS } from "@sehatq/constants";
import React, { useEffect, useState } from "react";

import {
  InfiniteTelemedicineDoctorsCache,
  useGetInfiniteTelemedicineDoctors,
} from "./doctor-queries";
import { TelemedicineFilterDesktop } from "./telemedicine-filter-desktop";
import { FilterKeys, generateFilters } from "./telemedicine-filter-helpers";
import { TelemedicineFilterMobile } from "./telemedicine-filter-mobile";

export type TelemedicineFilterProps = {
  isMobile?: boolean;
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
  navigateName: keyof typeof URLS;
  resetQuery?: Record<string, string>;
};

function selectDoctorsMeta(cache: InfiniteTelemedicineDoctorsCache) {
  return cache.pages[cache.pages.length - 1].meta.filters;
}

export function TelemedicineFilter(props: TelemedicineFilterProps) {
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
    resetQuery,
  } = props;

  const [tempSelectedFilters, setTempSelectedFilters] = useState<
    Partial<Record<FilterKeys, string | undefined>>
  >({
    specialitySlug,
    city,
    price,
    gender,
    doctorExperience,
  });
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    setTempSelectedFilters((oldTempSelectedFilters) => {
      let isChange = false;
      let newTempSelectedFilters = { ...oldTempSelectedFilters };
      if (oldTempSelectedFilters?.specialitySlug !== specialitySlug) {
        isChange = true;
        newTempSelectedFilters = {
          ...newTempSelectedFilters,
          specialitySlug,
        };
      }
      if (oldTempSelectedFilters?.city !== city) {
        isChange = true;
        newTempSelectedFilters = {
          ...newTempSelectedFilters,
          city,
        };
      }
      if (oldTempSelectedFilters?.price !== price) {
        isChange = true;
        newTempSelectedFilters = {
          ...newTempSelectedFilters,
          price,
        };
      }
      if (oldTempSelectedFilters?.gender !== gender) {
        isChange = true;
        newTempSelectedFilters = {
          ...newTempSelectedFilters,
          gender,
        };
      }
      if (oldTempSelectedFilters?.doctorExperience !== doctorExperience) {
        isChange = true;
        newTempSelectedFilters = {
          ...newTempSelectedFilters,
          doctorExperience,
        };
      }
      if (isChange) return newTempSelectedFilters;
      return oldTempSelectedFilters;
    });
  }, [specialitySlug, city, price, doctorExperience, gender, campaignSlug]);

  const queryFilters = {
    page,
    perPage,
    sort: sortBy,
    userLat,
    userLon: userLong,
    search: query,
    campaignSlug: campaignSlug ?? "",
    city: tempSelectedFilters?.city ?? "",
    doctorExperience: tempSelectedFilters?.doctorExperience ?? "",
    gender: tempSelectedFilters?.gender ?? "",
    price: tempSelectedFilters?.price ?? "",
    specialityId: tempSelectedFilters?.specialitySlug ?? "",
    hospitalId: hospitalSlug,
  };

  if (sortBy != "nearby") {
    queryFilters.userLat = "";
    queryFilters.userLon = "";
  }

  const { data: doctorsMeta, isLoading } = useGetInfiniteTelemedicineDoctors(
    queryFilters,
    {
      select: selectDoctorsMeta,
    }
  );

  function onClickFilterIcon() {
    setShowFilter(!showFilter);
    setTempSelectedFilters({
      specialitySlug,
      city,
      price,
      gender,
      doctorExperience,
    });
  }

  function onSelectFilter(filterKey: FilterKeys, value: string) {
    setTempSelectedFilters({
      ...tempSelectedFilters,
      [filterKey]: tempSelectedFilters?.[filterKey] === value ? "" : value,
    });
  }

  const filters = generateFilters({
    tempSelectedFilters,
    specialityOptions: {
      options: doctorsMeta?.specialities ?? [],
      isLoading,
    },
    priceOptions: {
      options: doctorsMeta?.price ?? [],
      isLoading,
    },
    experiencesOptions: {
      options: doctorsMeta?.experiences ?? [],
      isLoading,
    },
    citiesOptions: {
      options: doctorsMeta?.cities ?? [],
      isLoading,
    },
    genderOptions: {
      options: doctorsMeta?.gender ?? [],
      isLoading,
    },
  });

  const otherProps = {
    filterCount: filters.filter((f) => f.selectedValue != "").length,
    filters,
    tempSelectedFilters,
    onSelectFilter,
    showFilter,
    onClickFilterIcon,
    resetQuery,
    navigateName: props.navigateName,
  };

  if (props.isMobile) {
    return <TelemedicineFilterMobile {...otherProps} />;
  }

  return <TelemedicineFilterDesktop {...otherProps} />;
}
