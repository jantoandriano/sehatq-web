import React, { useState } from "react";

import { GooglePlaceSuggestionDesktop } from "./google-place-suggestion-desktop";
import { GooglePlaceSuggestionMobile } from "./google-place-suggestion-mobile";
import {
  PlaceSuggestionCache,
  useGetPlaceSuggestion,
} from "./google-map-query";

export type GooglePlaceSuggestionProps = {
  isMobile?: boolean;
  searchValue?: string;
  onSelectPlace: (placeId: string) => void;
  onClickCurrentLocation: () => void;
};

function selectSuggestion(cache: PlaceSuggestionCache) {
  return cache.data;
}

export function GooglePlaceSuggestion(props: GooglePlaceSuggestionProps) {
  const [searchValue, setSearchValue] = useState("");
  const [isShowSearchResult, setShowSearchResult] = useState(false);

  const { data: suggestion } = useGetPlaceSuggestion(
    {
      input: searchValue,
      latitude: "",
      longitude: "",
    },
    { select: selectSuggestion, enabled: Boolean(searchValue) }
  );

  function clearInputSearch() {
    setSearchValue("");
  }
  function onChangeSearchValue(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setSearchValue(e.target.value);
  }
  function showSearchResult() {
    setShowSearchResult(true);
  }
  function hideSearchResult() {
    setShowSearchResult(false);
  }

  const otherProps = {
    searchValue,
    onChangeSearchValue,
    clearInputSearch,
    suggestion: suggestion,
    isShowSearchResult,
    showSearchResult,
    hideSearchResult,
    onSelectPlace: props.onSelectPlace,
    onClickCurrentLocation: props.onClickCurrentLocation,
  };

  if (props.isMobile) {
    return <GooglePlaceSuggestionMobile {...otherProps} />;
  }

  return <GooglePlaceSuggestionDesktop {...otherProps} />;
}
