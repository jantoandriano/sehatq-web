import React, { useState } from "react";
import { ForumFilterListViewMobile } from "./forum-filter-list-view-mobile";

export type ForumFilterListViewProps = {
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

export function ForumFilterListView(props: ForumFilterListViewProps) {
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
    return <ForumFilterListViewMobile {...generalProps} />;
  }
  return null;
}
