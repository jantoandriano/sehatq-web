import { toPascalCase } from "@sehatq/utils";
import React, { useState, useEffect } from "react";
import {
  HealthCareProfessionalFiltersDesktop,
  HealthCareProfessionalFiltersDesktopSkeleton,
} from "./health-care-professional-filters-desktop";
import {
  generateFilters,
  FilterKeys,
  generateHCPQueryParams,
} from "./health-care-professional-filters-helpers";
import {
  HealthCareProfessionalFiltersMobile,
  HealthCareProfessionalFiltersMobileSkeleton,
} from "./health-care-professional-filters-mobile";
import {
  InfiniteHCPListCache,
  useGetInfiniteHCPList,
} from "./health-care-professional-queries";

export type HealthCareProfessionalFiltersProps = {
  isMobile: boolean;
  page: number;
  perPage?: number;
  userLat?: string;
  userLong?: string;
  query?: string;
  sortBy?: string;
  hcfId?: string;
  date?: string;
  specialityDefaultValue?: string;
  cityDefaultValue?: string;
  genderDefaultValue?: string;
  scheduleDefaultValue?: string;
  procedureDefaultValue?: string;
};

function selectHCPListMeta(hcpList: InfiniteHCPListCache) {
  return hcpList.pages[hcpList.pages.length - 1].meta;
}

export function HealthCareProfessionalFilters(
  props: HealthCareProfessionalFiltersProps
) {
  const {
    isMobile,
    page = 1,
    perPage = 9,
    userLat = "",
    userLong = "",
    query = "",
    sortBy = "",
    hcfId = "",
    date,
    cityDefaultValue,
    genderDefaultValue,
    scheduleDefaultValue,
    procedureDefaultValue,
    specialityDefaultValue,
  } = props;

  const [tempSelectedFilters, setTempSelectedFilters] = useState<
    Partial<Record<FilterKeys, string | undefined>>
  >({
    specialitySlug: specialityDefaultValue,
    citySlug: cityDefaultValue,
    gender: genderDefaultValue,
    schedule: scheduleDefaultValue,
    procedureId: procedureDefaultValue,
  });
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    setTempSelectedFilters((oldTempSelectedFilters) => {
      let isChange = false;
      let newTempSelectedFilters = { ...oldTempSelectedFilters };
      if (oldTempSelectedFilters?.specialitySlug !== specialityDefaultValue) {
        isChange = true;
        newTempSelectedFilters = {
          ...newTempSelectedFilters,
          specialitySlug: specialityDefaultValue,
        };
      }
      if (oldTempSelectedFilters?.citySlug !== cityDefaultValue) {
        isChange = true;
        newTempSelectedFilters = {
          ...newTempSelectedFilters,
          citySlug: cityDefaultValue,
        };
      }
      if (oldTempSelectedFilters?.gender !== genderDefaultValue) {
        isChange = true;
        newTempSelectedFilters = {
          ...newTempSelectedFilters,
          gender: genderDefaultValue,
        };
      }
      if (oldTempSelectedFilters?.schedule !== scheduleDefaultValue) {
        isChange = true;
        newTempSelectedFilters = {
          ...newTempSelectedFilters,
          schedule: scheduleDefaultValue,
        };
      }
      if (oldTempSelectedFilters?.procedureId !== procedureDefaultValue) {
        isChange = true;
        newTempSelectedFilters = {
          ...newTempSelectedFilters,
          procedureId: procedureDefaultValue,
        };
      }
      if (isChange) return newTempSelectedFilters;
      return oldTempSelectedFilters;
    });
  }, [
    specialityDefaultValue,
    cityDefaultValue,
    genderDefaultValue,
    scheduleDefaultValue,
    procedureDefaultValue,
  ]);

  const hcpListQuery = {
    page: `${page}`,
    perPage: `${perPage}`,
    userLat,
    userLong,
    query,
    procedureId: tempSelectedFilters?.procedureId ?? "",
    scheduleDayId: tempSelectedFilters?.schedule ?? "",
    citySlug: tempSelectedFilters?.citySlug ?? "",
    gender: tempSelectedFilters?.gender ?? "",
    specialitySlug: tempSelectedFilters?.specialitySlug ?? "",
    sortBy,
    hcfId,
  };

  const { data: hcpListMeta, isLoading } = useGetInfiniteHCPList(hcpListQuery, {
    select: selectHCPListMeta,
  });

  const hcpSlugs = {
    specialitySlug: hcpListQuery.specialitySlug,
    citySlug: hcpListQuery.citySlug,
    procedureId: hcpListQuery.procedureId,
  };

  function generateQuery(queries: Record<string, string | string[]>) {
    return generateHCPQueryParams(
      {
        ...queries,
        ...(hcfId ? { hcfId } : null),
        ...(date ? { date } : null),
      },
      queries.specialitySlug ? undefined : hcpSlugs
    );
  }

  function onClickFilterIcon() {
    setShowFilter(!showFilter);
    setTempSelectedFilters({
      specialitySlug: specialityDefaultValue,
      citySlug: cityDefaultValue,
      gender: genderDefaultValue,
      schedule: scheduleDefaultValue,
      procedureId: procedureDefaultValue,
    });
  }

  function onSelectFilter(filterKey: FilterKeys, value: string) {
    setTempSelectedFilters({
      ...(filterKey == "specialitySlug" ? null : tempSelectedFilters),
      [filterKey]: tempSelectedFilters?.[filterKey] === value ? "" : value,
    });
  }

  const filters = generateFilters({
    tempSelectedFilters,
    specialityOptions: { options: hcpListMeta?.specialities ?? [], isLoading },
    proceduresOptions: { options: hcpListMeta?.procedures ?? [], isLoading },
    citiesOptions: { options: hcpListMeta?.cities ?? [], isLoading },
    scheduleOptions: {
      options:
        hcpListMeta?.schedules.map((day) => ({
          id: day,
          name: toPascalCase(day),
        })) ?? [],
      isLoading,
    },
    genderOptions: { options: hcpListMeta?.genders ?? [], isLoading },
  });

  const otherProps = {
    filters,
    showFilter,
    onSelectFilter,
    onClickFilterIcon,
    tempSelectedFilters,
    generateQuery,
    hcpSlugs: hcpSlugs,
  };
  if (isMobile) {
    return <HealthCareProfessionalFiltersMobile {...otherProps} />;
  }

  return <HealthCareProfessionalFiltersDesktop {...otherProps} />;
}

export type HealthCareProfessionalFiltersSkeletonProps = {
  isMobile: boolean;
};

export function HealthCareProfessionalFiltersSkeleton(
  props: HealthCareProfessionalFiltersSkeletonProps
) {
  const { isMobile } = props;
  if (isMobile) {
    return <HealthCareProfessionalFiltersMobileSkeleton />;
  }

  return <HealthCareProfessionalFiltersDesktopSkeleton />;
}
