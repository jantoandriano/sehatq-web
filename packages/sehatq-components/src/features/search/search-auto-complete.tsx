import { useAtom } from "jotai";
import React from "react";
import { ProfileCache, useGetProfile } from "../profile/profile-queries";
import { inputSearchAtom } from "./search-atoms";
import { SearchAutoCompleteDesktop } from "./search-auto-complete-desktop";
import { SearchAutoCompleteMobile } from "./search-auto-complete-mobile";
import { useGetSearchAutoComplete } from "./search-auto-complete-queries";

function selectUserId(response: ProfileCache) {
  return `${response.id}`;
}

export type SearchAutoCompleteProps = {
  isMobile?: boolean;
};

export function SearchAutoComplete(props: SearchAutoCompleteProps) {
  const [inputSearch] = useAtom(inputSearchAtom);
  const { data: userId = "" } = useGetProfile({ select: selectUserId });
  const { data: searchAutoComplete = [] } = useGetSearchAutoComplete(
    {
      query: inputSearch,
      userId,
    },
    { keepPreviousData: true }
  );

  const otherProps = {
    searchAutoComplete,
  };

  if (props.isMobile) {
    return <SearchAutoCompleteMobile {...otherProps} />;
  }

  return <SearchAutoCompleteDesktop {...otherProps} />;
}
