import React, { useEffect, useState } from "react";
import { DCPInputDesktop, DCPInputDesktopSkeleton } from "./dcp-input-desktop";
import { DCPInputMobile, DCPInputMobileSkeleton } from "./dcp-input-mobile";
import {
  DCPSuggestionCache,
  useGetDCPSuggestion,
} from "./dcp-suggestion-query";

export type DCPInputProps = {
  isMobile?: boolean;
  value?: {
    subdistrict: string;
    district: string;
    city: string;
    province: string;
    zipCode: string;
  };
  onChange: (value: {
    subdistrict: string;
    district: string;
    city: string;
    province: string;
    zipCode: string;
  }) => void;
  errorMessage?: string;
};

function selectSuggestions(cache: DCPSuggestionCache) {
  return cache.data;
}

export function DCPInput(props: DCPInputProps) {
  const defaultValue = [
    props.value?.subdistrict,
    props.value?.district,
    props.value?.city,
    props.value?.province,
  ]
    .filter(Boolean)
    .join(", ");

  const [value, setValue] = useState(defaultValue ?? "");

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const [isShowSearchResult, setShowSearchResult] = useState(false);
  function clearInputSearch() {
    setValue("");
    props.onChange({
      subdistrict: "",
      district: "",
      city: "",
      province: "",
      zipCode: "",
    });
  }

  const { data } = useGetDCPSuggestion(
    { search: value },
    { select: selectSuggestions, enabled: Boolean(value) }
  );

  function onChangeSearchValue(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setValue(e.target.value);
  }
  function showSearchResult() {
    setShowSearchResult(true);
  }
  function hideSearchResult() {
    setShowSearchResult(false);
  }

  const otherProps = {
    value,
    onChangeSearchValue,
    clearInputSearch,
    suggestion: data,
    isShowSearchResult,
    showSearchResult,
    hideSearchResult,
    onSelect: props.onChange,
    errorMessage: props.errorMessage,
  };

  if (props.isMobile) {
    return <DCPInputMobile {...otherProps} />;
  }
  return <DCPInputDesktop {...otherProps} />;
}

export type DCPInputSkeletonProps = {
  isMobile?: boolean;
};

export function DCPInputSkeleton(props: DCPInputSkeletonProps) {
  if (props.isMobile) {
    return <DCPInputMobileSkeleton />;
  }
  return <DCPInputDesktopSkeleton />;
}
