import React from "react";
import {
  Button,
  CloseIcon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  SearchIcon,
  VStack,
  Text,
  LocationIcon,
  Divider,
} from "../../user-interfaces";
import { PlaceSuggestion } from "./google-map-model";

export type GooglePlaceSuggestionGeneralProps = {
  searchValue: string;
  clearInputSearch: () => void;
  onChangeSearchValue: React.ChangeEventHandler<HTMLInputElement>;
  showSearchResult: () => void;
  hideSearchResult: () => void;
  isShowSearchResult: boolean;
  suggestion: PlaceSuggestion[] | undefined;
  onSelectPlace: (placeId: string) => void;
  onClickCurrentLocation: () => void;
};

export function GooglePlaceSuggestionDesktop(
  props: GooglePlaceSuggestionGeneralProps
) {
  return (
    <>
      <InputGroup background="white" borderRadius="xl" boxShadow="lg">
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="brownGrey.500" />
        </InputLeftElement>
        <Input
          px={10}
          value={props.searchValue}
          placeholder="Cari Alamat"
          borderRadius="xl"
          fontSize="xs"
          autoComplete="off"
          focusBorderColor="sea.500"
          borderColor="gray.500"
          onChange={props.onChangeSearchValue}
          onFocus={props.showSearchResult}
          onBlur={props.hideSearchResult}
          _placeholder={{ color: "brownGrey.500", fontSize: "xs" }}
        />
        {props.searchValue ? (
          <InputRightElement pointerEvents="stroke">
            <IconButton
              variant="fit"
              aria-label="clear"
              onClick={props.clearInputSearch}
              icon={<CloseIcon w="3" h="3" color="gray" />}
            />
          </InputRightElement>
        ) : null}
      </InputGroup>
      {props.isShowSearchResult && props.suggestion ? (
        <VStack
          cursor="pointer"
          onMouseDown={(e) => e.preventDefault()}
          spacing={0}
          align="start"
          width="full"
          background="white"
          borderRadius="xl"
          boxShadow="base"
          divider={
            <Divider
              width="96.5%"
              alignSelf="center"
              border="0.5px solid"
              borderColor="veryLightPink"
            />
          }
        >
          {props.suggestion.length > 0 ? (
            props.suggestion.map((sugges) => (
              <Text
                width="full"
                p={3}
                fontSize="xs"
                color="charcoalGrey"
                key={sugges.placeId}
                _hover={{ background: "veryLightPink" }}
                onClick={() => props.onSelectPlace(sugges.placeId)}
              >
                {sugges.description}
              </Text>
            ))
          ) : (
            <Text width="full" p={3} fontSize="xs" color="charcoalGrey">
              Lokasi tidak diemukan
            </Text>
          )}
        </VStack>
      ) : (
        <Button
          width="full"
          borderRadius="xl"
          variant="outline"
          colorScheme="main"
          fontSize="sm"
          fontWeight="semibold"
          color="sea.500"
          background="white"
          onClick={props.onClickCurrentLocation}
        >
          <LocationIcon color="main.600" mr={2} /> Gunakan Lokasi Saat ini
        </Button>
      )}
    </>
  );
}
