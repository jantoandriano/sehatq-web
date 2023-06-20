import { URLS } from "@sehatq/constants";
import { useNavigation } from "@sehatq/utils";
import React, { useState } from "react";
import {
  HealthCareProfessionalSorterDesktop,
  HealthCareProfessionalSorterDesktopSkeleton,
} from "./health-care-professional-sorter-desktop";
import {
  HealthCareProfessionalSorterMobile,
  HealthCareProfessionalSorterMobileSkeleton,
} from "./health-care-professional-sorter-mobile";

export type HealthCareProfessionalSorterProps = {
  isMobile: boolean;
  selectedSorter: string;
  navigateName?: keyof typeof URLS;
};

export function HealthCareProfessionalSorter(
  props: HealthCareProfessionalSorterProps
) {
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
      props.navigateName ?? "HEALTH_CARE_PROFESIONAL",
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
    return <HealthCareProfessionalSorterMobile {...otherProps} />;
  }

  return <HealthCareProfessionalSorterDesktop {...otherProps} />;
}

export type HealthCareProfessionalSorterSkeletonProps = { isMobile: boolean };

export function HealthCareProfessionalSorterSkeleton(
  props: HealthCareProfessionalSorterSkeletonProps
) {
  const { isMobile } = props;

  if (isMobile) {
    return <HealthCareProfessionalSorterMobileSkeleton />;
  }

  return <HealthCareProfessionalSorterDesktopSkeleton />;
}
