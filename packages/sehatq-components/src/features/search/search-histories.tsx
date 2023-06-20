import React from "react";
import { useAtom } from "jotai";
import {} from "../../user-interfaces";
import {
  SearchHistoriesAtom,
  searchHistoriesAtom,
} from "./search-histories-atoms";
import { SearchHistoriesDesktop } from "./search-histories-desktop";
import { SearchHistoriesMobile } from "./search-histories-mobile";

export function saveSearchHistories({
  keyword,
  savedSearchHistories = [],
}: {
  keyword: string;
  savedSearchHistories: SearchHistoriesAtom;
}) {
  if (keyword) {
    // remove existing keyword in history
    const removeExistingKeyword = savedSearchHistories.filter(
      (item) => item.id !== keyword
    );

    // if found
    if (removeExistingKeyword.length) {
      savedSearchHistories = [...removeExistingKeyword]; // deep clone array without duplicate keyword
    }

    savedSearchHistories.unshift({ id: keyword, name: keyword }); // put in first position
    // remove the last history
    if (savedSearchHistories.length > 5) {
      savedSearchHistories.pop();
    }
  }

  return savedSearchHistories;
}

export type SearchHistoriesProps = {
  isMobile?: boolean;
};

export function SearchHistories(props: SearchHistoriesProps) {
  const [searchHistories, setSearchHistories] = useAtom(searchHistoriesAtom);

  function clearSearchHistories() {
    setSearchHistories([]);
  }

  function removeSearchHistories(id: string) {
    const result = searchHistories.filter((history) => history.id !== id);

    setSearchHistories([...result]);
  }

  const otherProps = {
    searchHistories,
    clearSearchHistories,
    removeSearchHistories,
  };

  if (props.isMobile) {
    return <SearchHistoriesMobile {...otherProps} />;
  }

  return <SearchHistoriesDesktop {...otherProps} />;
}
