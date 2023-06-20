import React, { useState, useEffect } from "react";
import { HCF_TYPES } from "@sehatq/constants";
import {
  HealthCareFacilityFiltersDesktop,
  HealthCareFacilityFiltersDesktopSkeleton,
} from "./health-care-facility-filters-desktop";
import {
  generateFilters,
  FilterKeys,
  generateHCFQueryParams,
} from "./health-care-facility-filters-helpers";
import {
  HealthCareFacilityFiltersMobile,
  HealthCareFacilityFiltersMobileSkeleton,
} from "./health-care-facility-filters-mobile";
import {
  InfiniteHCFListCache,
  useGetInfiniteHCFList,
} from "./health-care-facility-queries";

export type HealthCareFacilityFiltersProps = {
  isMobile: boolean;
  page: string;
  perPage?: string;
  userLat?: string;
  userLong?: string;
  query?: string;
  sortBy?: string;
  partnerDefaultValue?: string;
  hcfTypeDefaultValue?: string;
  procedureDefaultValue?: string;
  cityDefaultValue?: string;
  medicalFacilityDefaultValue?: string;
};

function selectHCFListMeta(cache: InfiniteHCFListCache) {
  return cache.pages[cache.pages.length - 1].meta;
}

export function HealthCareFacilityFilters(
  props: HealthCareFacilityFiltersProps
) {
  const {
    isMobile,
    page = "1",
    perPage = "16",
    userLat = "",
    userLong = "",
    query = "",
    sortBy = "",
    partnerDefaultValue,
    hcfTypeDefaultValue,
    procedureDefaultValue,
    cityDefaultValue,
    medicalFacilityDefaultValue,
  } = props;

  const [tempSelectedFilters, setTempSelectedFilters] = useState<
    Partial<Record<FilterKeys, string | undefined>>
  >({
    partner: partnerDefaultValue,
    hcfTypeSlug: hcfTypeDefaultValue,
    procedureId: procedureDefaultValue,
    citySlug: cityDefaultValue,
    facility: medicalFacilityDefaultValue,
  });
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    setTempSelectedFilters((oldTempSelectedFilters) => {
      let isChange = false;
      let newTempSelectedFilters = { ...oldTempSelectedFilters };
      if (oldTempSelectedFilters?.partner !== partnerDefaultValue) {
        isChange = true;
        newTempSelectedFilters = {
          ...newTempSelectedFilters,
          partner: partnerDefaultValue,
        };
      }
      if (oldTempSelectedFilters?.hcfTypeSlug !== hcfTypeDefaultValue) {
        isChange = true;
        newTempSelectedFilters = {
          ...newTempSelectedFilters,
          hcfTypeSlug: hcfTypeDefaultValue,
        };
      }
      if (oldTempSelectedFilters?.procedureId !== procedureDefaultValue) {
        isChange = true;
        newTempSelectedFilters = {
          ...newTempSelectedFilters,
          procedureId: procedureDefaultValue,
        };
      }
      if (oldTempSelectedFilters?.citySlug !== cityDefaultValue) {
        isChange = true;
        newTempSelectedFilters = {
          ...newTempSelectedFilters,
          citySlug: cityDefaultValue,
        };
      }
      if (oldTempSelectedFilters?.facility !== medicalFacilityDefaultValue) {
        isChange = true;
        newTempSelectedFilters = {
          ...newTempSelectedFilters,
          facility: medicalFacilityDefaultValue,
        };
      }

      if (isChange) return newTempSelectedFilters;
      return oldTempSelectedFilters;
    });
  }, [
    partnerDefaultValue,
    hcfTypeDefaultValue,
    procedureDefaultValue,
    cityDefaultValue,
    medicalFacilityDefaultValue,
  ]);

  const hcfListQuery = {
    page,
    perPage,
    userLat,
    userLong,
    query,
    sortBy,
    partner: tempSelectedFilters?.partner ?? "",
    hcfTypeSlug: tempSelectedFilters?.hcfTypeSlug ?? "",
    procedureId: tempSelectedFilters?.procedureId ?? "",
    citySlug: tempSelectedFilters?.citySlug ?? "",
    medicalFacilityId: tempSelectedFilters?.facility ?? "",
  };

  const { data: hcfListMeta, isLoading } = useGetInfiniteHCFList(hcfListQuery, {
    select: selectHCFListMeta,
  });

  const hcfSlugs = {
    hcfTypeSlug: hcfListQuery.hcfTypeSlug,
    citySlug: hcfListQuery.citySlug,
    procedureId: hcfListQuery.procedureId,
  };

  function generateQuery(queries: Record<string, string | string[]>) {
    return generateHCFQueryParams(
      queries,
      queries.hcfTypeSlug ? undefined : hcfSlugs
    );
  }

  function onClickFilterIcon() {
    setShowFilter(!showFilter);
    setTempSelectedFilters({
      partner: partnerDefaultValue,
      hcfTypeSlug: hcfTypeDefaultValue,
      procedureId: procedureDefaultValue,
      citySlug: cityDefaultValue,
      facility: medicalFacilityDefaultValue,
    });
  }

  function onSelectFilter(filterKey: FilterKeys, value: string) {
    setTempSelectedFilters({
      ...(filterKey == "hcfTypeSlug" ? null : tempSelectedFilters),
      [filterKey]: tempSelectedFilters?.[filterKey] === value ? "" : value,
    });
  }

  const filters = generateFilters({
    tempSelectedFilters,
    partnerOptions: {
      options:
        [
          {
            value: hcfListMeta?.partnershipTypes[0]?.value,
            key: "Partner SehatQ",
          },
        ] ?? [],
      isLoading,
    },
    hcfTypesOptions: { options: HCF_TYPES, isLoading },
    proceduresOptions: { options: hcfListMeta?.procedures ?? [], isLoading },
    citiesOptions: { options: hcfListMeta?.cities ?? [], isLoading },
    medicalFacilitiesOptions: {
      options: hcfListMeta?.medicalFacilities ?? [],
      isLoading,
    },
  });

  const otherProps = {
    filters,
    showFilter,
    onSelectFilter,
    onClickFilterIcon,
    tempSelectedFilters,
    generateQuery,
    hcfSlugs: hcfSlugs,
  };
  if (isMobile) {
    return <HealthCareFacilityFiltersMobile {...otherProps} />;
  }

  return <HealthCareFacilityFiltersDesktop {...otherProps} />;
}

export type HealthCareFacilityFiltersSkeletonProps = {
  isMobile: boolean;
};

export function HealthCareFacilityFiltersSkeleton(
  props: HealthCareFacilityFiltersSkeletonProps
) {
  const { isMobile } = props;
  if (isMobile) {
    return <HealthCareFacilityFiltersMobileSkeleton />;
  }

  return <HealthCareFacilityFiltersDesktopSkeleton />;
}
