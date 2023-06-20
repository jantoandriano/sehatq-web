import React, { useState } from "react";
import { useAtom } from "jotai";
import { NavigationValue, useNavigation } from "@sehatq/utils";
import { useDebounce } from "use-debounce";
import { ProfileCache, useGetProfile } from "../profile/profile-queries";
import { SehatqSearchBoxDesktop } from "./sehatq-search-box-desktop";
import { SehatqSearchBoxMobile } from "./sehatq-search-box-mobile";
import { searchHistoriesAtom } from "./search-histories-atoms";
import { inputSearchAtom } from "./search-atoms";
import {
  SearchAutoCompleteCache,
  useGetSearchAutoComplete,
} from "./search-auto-complete-queries";
import { saveSearchHistories } from "./search-histories";

export type SehatqSearchBoxProps = {
  isMobile?: boolean;
  placeholderSearch: string;
  searchNavigation: NavigationValue;
  leftElement?: React.ReactNode;
};

function selectUserId(response: ProfileCache) {
  return `${response.id}`;
}

function selectSearchAutoCompleteTotal(data: SearchAutoCompleteCache) {
  return data.length;
}

export function SehatqSearchBox(props: SehatqSearchBoxProps) {
  const { placeholderSearch, searchNavigation, leftElement } = props;
  const { navigate } = useNavigation();
  const [isShowDropdown, setIsShowDropdown] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const [stateInputSearch, setStateInputSearch] = useAtom(inputSearchAtom);
  const [inputSearch] = useDebounce(stateInputSearch, 500);
  const { data: userId = "" } = useGetProfile({ select: selectUserId });

  const { data: totalSearchAutoComplete = 0 } = useGetSearchAutoComplete(
    {
      query: inputSearch,
      userId,
    },
    {
      select: selectSearchAutoCompleteTotal,
      enabled: Boolean(inputSearch),
      keepPreviousData: true,
    }
  );

  function showDropdown() {
    setIsShowDropdown(true);
  }

  function hideDropdown() {
    setIsShowDropdown(false);
  }

  function showModal() {
    setIsShowModal(true);
  }

  function hideModal() {
    setIsShowModal(false);
  }

  const [savedSearchHistories, setSearchHistories] =
    useAtom(searchHistoriesAtom);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    const newSearchHistories = saveSearchHistories({
      keyword: stateInputSearch,
      savedSearchHistories,
    });

    setSearchHistories(newSearchHistories);

    hideModal();
    hideDropdown();

    navigate(
      searchNavigation.name,
      (oldQuery) => ({
        ...oldQuery,
        ...searchNavigation.query,
        page: "",
        q: stateInputSearch,
      }),
      { shallow: true, scroll: true }
    );
  }

  function changeInputSearch(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setStateInputSearch(e.target.value);
  }

  function clearInputSearch() {
    setStateInputSearch("");
    navigate(
      searchNavigation.name,
      (oldQuery) => ({
        ...oldQuery,
        page: "",
        q: "",
      }),
      { shallow: true, scroll: true }
    );
  }

  const otherProps = {
    stateInputSearch,
    isShowDropdown,
    showDropdown,
    hideDropdown,
    onSubmit,
    placeholderSearch,
    clearInputSearch,
    changeInputSearch,
    isShowSearchAutcomplete: totalSearchAutoComplete > 0,
    leftElement,
    isShowModal,
    showModal,
    hideModal,
  };

  if (props.isMobile) {
    return <SehatqSearchBoxMobile {...otherProps} />;
  }

  return <SehatqSearchBoxDesktop {...otherProps} />;
}
