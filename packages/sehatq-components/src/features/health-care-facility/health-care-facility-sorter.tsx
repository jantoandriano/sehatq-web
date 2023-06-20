import { URLS } from "@sehatq/constants";
import { useNavigation } from "@sehatq/utils";
import React, { useState } from "react";
import {
  HealthCareFacilitySorterDesktop,
  HealthCareFacilitySorterDesktopSkeleton,
} from "./health-care-facility-sorter-desktop";
import {
  HealthCareFacilitySorterMobile,
  HealthCareFacilitySorterMobileSkeleton,
} from "./health-care-facility-sorter-mobile";

export type HealthCareFacilitySorterProps = {
  isMobile: boolean;
  selectedSorter: string;
  navigateName?: keyof typeof URLS;
};

export function HealthCareFacilitySorter(props: HealthCareFacilitySorterProps) {
  const { isMobile, selectedSorter } = props;
  const [isOpen, setOpenSorter] = useState(false);
  const { navigate } = useNavigation();
  const onOpenSorter = () => {
    setOpenSorter(!isOpen);
  };
  const [selectedValue, setSelectedValue] = useState(selectedSorter);

  const onSelectedSorter = (value: string) => {
    setSelectedValue(value);
  };

  const filterOptions = [
    {
      id: "terdekat",
      name: "Jarak Terdekat",
    },
    {
      id: "asc",
      name: "A - Z",
    },
    {
      id: "desc",
      name: "Z - A",
    },
  ];

  const onImplement = () => {
    navigate(
      props.navigateName ?? "HEALTH_CARE_FACILITIES",
      (oldQuery) => ({
        ...oldQuery,
        sort: selectedValue,
        page: "1",
      }),
      { shallow: true, scroll: true }
    );
    setOpenSorter(false);
  };

  const value = isMobile ? selectedValue : selectedSorter;
  const otherProps = {
    onOpenSorter,
    isOpen,
    selectedValue: value,
    selectedName: filterOptions.find((ft) => ft.id == value)?.name ?? "",
    onSelectedSorter,
    onImplement,
    options: filterOptions,
    navigateName: props.navigateName,
  };

  if (isMobile) {
    return <HealthCareFacilitySorterMobile {...otherProps} />;
  }

  return <HealthCareFacilitySorterDesktop {...otherProps} />;
}

export type HealthCareFacilitySorterSkeletonProps = { isMobile: boolean };

export function HealthCareFacilitySorterSkeleton(
  props: HealthCareFacilitySorterSkeletonProps
) {
  const { isMobile } = props;

  if (isMobile) {
    return <HealthCareFacilitySorterMobileSkeleton />;
  }

  return <HealthCareFacilitySorterDesktopSkeleton />;
}
