import { ASSETS } from "@sehatq/constants";
import React from "react";
import {
  CloseIcon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  SearchIcon,
  VStack,
} from "../../user-interfaces";
import { Fallback } from "../general";
import {
  AddressCard,
  AddressCardProps,
  AddressCardSkeleton,
} from "./address-card";

export type AddressListDesktopProps = {
  data: AddressCardProps[];
  searchValue: string;
  clearInputSearch: () => void;
  onChangeSearchValue: React.ChangeEventHandler<HTMLInputElement>;
  isLoading: boolean;
};

export function AddressListDesktop(props: AddressListDesktopProps) {
  return (
    <VStack width="full" spacing={4} height="full">
      <InputGroup background="white" borderRadius="xl" boxShadow="lg">
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="brownGrey.500" />
        </InputLeftElement>
        <Input
          width="full"
          borderRadius="xl"
          px={10}
          value={props.searchValue}
          placeholder="Cari Alamat"
          fontSize="sm"
          autoComplete="off"
          focusBorderColor="sea.500"
          borderColor="gray.500"
          onChange={props.onChangeSearchValue}
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
      {props.isLoading ? (
        <AddressListDesktopSkeleton />
      ) : !props.data.length ? (
        <Fallback
          isMobile={false}
          title="Alamat Tidak Ditemukan"
          description="Kata kunci yang kamu gunakan salah atau alamat yang kamu cari belum disimpan ke daftar alamat"
          image={{
            src: ASSETS.EMPTY_HCP_LIST,
            width: 330,
            height: 341,
          }}
        />
      ) : (
        props.data.map((dt) => <AddressCard {...dt} key={dt.id} />)
      )}
    </VStack>
  );
}

export function AddressListDesktopSkeleton() {
  return (
    <VStack width="full">
      {Array.from(Array(4).keys()).map((key) => (
        <AddressCardSkeleton key={key} />
      ))}
    </VStack>
  );
}
