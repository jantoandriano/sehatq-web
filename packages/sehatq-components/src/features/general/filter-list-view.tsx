import { URLS } from "@sehatq/constants";
import { Query } from "@sehatq/types";
import React, { useState } from "react";
import { FilterListViewDesktop } from "./filter-list-view-desktop";
import { FilterListViewMobile } from "./filter-list-view-mobile";

type GeneralProps = {
  filterKey: string;
  filterName: string;
  selectedName: string;
  selectedValue: string;
  options: {
    value: string;
    name: string;
    iconUrl?: string;
  }[];
  defaultCollaps?: boolean;
  showSearch?: boolean | undefined;
  isLoading?: boolean;
  isMultiple?: boolean;
  description?: string;
};

export type FilterListViewProps =
  | (GeneralProps & {
      isMobile?: false;
      navigateName: keyof typeof URLS;
      isResetQuery?: boolean;
      generateQuery?: (queries: Record<string, string | string[]>) => Query;
    })
  | (GeneralProps & {
      isMobile: true;
      onSelectedValueChange: (selectedValue: string) => void;
    });

export function FilterListView(props: FilterListViewProps) {
  const {
    isMobile,
    options,
    selectedValue,
    selectedName,
    defaultCollaps,
    filterKey,
    filterName,
    showSearch = false,
    isLoading,
  } = props;
  const [searchValue, setSearchValue] = useState("");
  const [showOptions, setShowOption] = useState(defaultCollaps ?? false);

  function clearInputSearch() {
    setSearchValue("");
  }

  function onChangeSearchValue(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setSearchValue(e.target.value);
  }

  function onSelectValue(value: string) {
    if (!props.isMultiple) {
      setShowOption(false);
    }

    if (isMobile && props.onSelectedValueChange) {
      props.onSelectedValueChange(selectedValue === value ? "" : `${value}`);
    }
  }

  function onShowOptions() {
    setShowOption(!showOptions);
  }

  const generalProps = {
    filterKey,
    filterName,
    selectedName:
      props.isMultiple && selectedValue
        ? selectedValue.split(",").length > 1
          ? `${selectedValue.split(",").length} terpilih`
          : selectedName
        : selectedName,
    description:
      props.isMultiple && selectedValue && selectedValue.split(",").length > 1
        ? props.selectedName
        : props.description,
    selectedValue,
    showSearch,
    searchValue,
    onChangeSearchValue,
    clearInputSearch,
    showOptions,
    onShowOptions,
    onSelectValue,
    options: options.filter((option) =>
      option.name.toLowerCase().includes(searchValue.toLowerCase())
    ),
    isLoading,
    isMultiple: props.isMultiple,
  };

  if (isMobile) {
    return (
      <FilterListViewMobile {...generalProps} onSelectValue={onSelectValue} />
    );
  }

  return (
    <FilterListViewDesktop
      {...generalProps}
      isResetQuery={props.isResetQuery}
      navigateName={props.navigateName}
      generateQuery={props.generateQuery}
    />
  );
}
