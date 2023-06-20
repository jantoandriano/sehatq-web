import React, { useState } from "react";
import { DiseaseFilterListViewMobile } from "./disease-filter-list-view-mobile";

export type DiseaseFilterListViewProps = {
  isMobile: true;
  selectedValue: string;
  options?: {
    id: number;
    name: string;
    imageUrl: string[];
    slug: string;
  }[];
  isLoading?: boolean;
  onClose: () => void;
};

export function DiseaseFilterListView(props: DiseaseFilterListViewProps) {
  const { isMobile, selectedValue, options, isLoading, onClose } = props;
  const [searchValue, setSearchValue] = useState("");

  function clearInputSearch() {
    setSearchValue("");
  }

  function onChangeSearchValue(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setSearchValue(e.target.value);
  }

  const generalProps = {
    selectedValue,
    searchValue,
    onChangeSearchValue,
    clearInputSearch,
    options: options?.filter((option) =>
      option.name.toLowerCase().includes(searchValue.toLowerCase())
    ),
    isLoading,
    onClose,
  };

  if (isMobile) {
    return <DiseaseFilterListViewMobile {...generalProps} />;
  }
  return null;
}
