import React from "react";
import {
  InputGroup,
  Input,
  InputLeftElement,
  InputRightElement,
  SehatqSearchIcon,
  CloseIcon,
  Box,
} from "../../user-interfaces";
import { MainMenu } from "../general";
import { PopularTags } from "./popular-tags";
import { SearchHistories } from "./search-histories";
import { SearchAutoComplete } from "./search-auto-complete";

export type SehatqSearchBoxDesktopProps = {
  stateInputSearch: string;
  isShowSearchAutcomplete: boolean;
  isShowDropdown: boolean;
  showDropdown: () => void;
  hideDropdown: () => void;
  onSubmit: React.FormEventHandler<HTMLDivElement>;
  placeholderSearch: string;
  changeInputSearch: React.ChangeEventHandler<HTMLInputElement>;
  clearInputSearch: () => void;
  leftElement: React.ReactNode;
};
export function SehatqSearchBoxDesktop(props: SehatqSearchBoxDesktopProps) {
  const {
    stateInputSearch,
    isShowDropdown,
    showDropdown,
    hideDropdown,
    onSubmit,
    placeholderSearch,
    changeInputSearch,
    clearInputSearch,
    isShowSearchAutcomplete,
    leftElement = <SehatqSearchIcon />,
  } = props;

  return (
    <Box position="relative">
      <InputGroup
        as="form"
        onSubmit={onSubmit}
        variant="outline"
        background="white"
        borderRadius="xl"
        boxShadow="lg"
      >
        <InputLeftElement pointerEvents="none">{leftElement}</InputLeftElement>
        <Input
          value={stateInputSearch}
          placeholder={placeholderSearch}
          pl="10"
          autoComplete="off"
          focusBorderColor="sea.500"
          borderColor="gray.500"
          onChange={changeInputSearch}
          onFocus={showDropdown}
          onBlur={hideDropdown}
          _placeholder={{ color: "brownGrey.500", fontSize: "sm" }}
        />
        <InputRightElement>
          <CloseIcon
            display={stateInputSearch ? "block" : "none"}
            w="2"
            h="2"
            color="gray"
            cursor="pointer"
            onClick={clearInputSearch}
          />
        </InputRightElement>
      </InputGroup>
      {isShowDropdown ? (
        <Box
          position="absolute"
          backgroundColor="white"
          mt="2.5"
          px="5"
          width="100%"
          borderRadius="xl"
          boxShadow="xs"
          onMouseDown={(e) => e.preventDefault()}
        >
          {isShowSearchAutcomplete ? (
            <Box py="3">
              <SearchAutoComplete />
            </Box>
          ) : (
            <>
              <Box pt="6" pb="6" _empty={{ pb: "0" }}>
                <SearchHistories />
              </Box>
              <Box pb="6">
                <PopularTags />
              </Box>
              <Box pb="6">
                <MainMenu />
              </Box>
            </>
          )}
        </Box>
      ) : null}
    </Box>
  );
}
