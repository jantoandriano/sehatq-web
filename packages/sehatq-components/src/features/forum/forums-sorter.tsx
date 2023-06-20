import { useNavigation } from "@sehatq/utils";
import React, { useState } from "react";
import {
  ForumsSorterDesktop,
  ForumsSorterDesktopSkeleton,
} from "./forums-sorter-desktop";
import {
  ForumsSorterMobile,
  ForumsSorterMobileSkeleton,
} from "./forums-sorter-mobile";

export type ForumsSorterProps = {
  isMobile: boolean;
  selectedSorter: string;
};

export function ForumsSorter(props: ForumsSorterProps) {
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
      id: "newest",
      name: "Terbaru",
    },
    {
      id: "popular",
      name: "Paling banyak dilihat",
    },
    {
      id: "mostcommented",
      name: "Komentar terbanyak",
    },
  ];

  const onImplement = () => {
    navigate(
      "FORUM",
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
  };

  if (isMobile) {
    return <ForumsSorterMobile {...otherProps} />;
  }

  return <ForumsSorterDesktop {...otherProps} />;
}

export type ForumsSorterSkeletonProps = { isMobile: boolean };

export function ForumsSorterSkeleton(props: ForumsSorterSkeletonProps) {
  const { isMobile } = props;

  if (isMobile) {
    return <ForumsSorterMobileSkeleton />;
  }

  return <ForumsSorterDesktopSkeleton />;
}
