import { ASSETS } from "@sehatq/constants";
import React, { useState } from "react";
import { Fallback } from "../general";
import { AddressListDesktop } from "./address-list-desktop";
import { AddressListMobile } from "./address-list-mobile";
import { AddressesCache, useGetAddresses } from "./address-query";

export type AddressListProps = {
  isMobile?: boolean;
  selectedValue?: string;
  onClickAddress?: (value: string) => void;
  onEditAddress?: (value: string) => void;
  callback?: (
    data:
      | {
          id: string;
          receiverName: string;
          label: string;
          address: string;
          phone: string;
          note: string;
          isDefault: boolean;
          googlePlaceId: string | null;
        }[]
      | undefined
  ) => void;
};

function selectAddresses(cache: AddressesCache) {
  return cache.data.map((item) => ({
    id: item.id,
    receiverName: item.receiverName,
    label: item.label,
    address: item.address,
    phone: item.phone,
    note: item.note,
    isDefault: item.isDefault,
    googlePlaceId: item.googlePlaceId,
  }));
}

export function AddressList(props: AddressListProps) {
  const [searchValue, setSearchValue] = useState("");
  const { data: address, isLoading } = useGetAddresses(
    {
      query: searchValue,
    },
    {
      select: selectAddresses,
    }
  );

  function clearInputSearch() {
    setSearchValue("");
  }

  function onChangeSearchValue(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setSearchValue(e.target.value);
  }

  if (props.callback) props.callback(address);

  if ((!address || address.length == 0) && !isLoading && !searchValue) {
    return (
      <Fallback
        isMobile={props.isMobile}
        title="Belum Ada Alamat Pengiriman"
        description="Tambah alamat untuk mempercepat proses belanja dan memudahkan pengiriman"
        image={{
          src: ASSETS.ILLUSTRATION_KURIR,
          width: 330,
          height: 341,
        }}
      />
    );
  }

  const otherProps = {
    data: address
      ? address?.map((item) => ({
          ...item,
          isSelected: props.selectedValue == item.id,
          onSelect: props.onClickAddress ? props.onClickAddress : undefined,
          onEditAddress: props.onEditAddress ? props.onEditAddress : undefined,
        }))
      : [],
    searchValue,
    onChangeSearchValue,
    clearInputSearch,
    isLoading,
  };
  if (props.isMobile) return <AddressListMobile {...otherProps} />;
  return <AddressListDesktop {...otherProps} />;
}
