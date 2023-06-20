import React, { useState } from "react";
import { AddressDetailCache, useGetAddressDetail } from "./address-query";
import {
  ShippingAddressInputDesktop,
  ShippingAddressInputDesktopSkeleton,
} from "./shipping-address-input-desktop";
import {
  ShippingAddressInputMobile,
  ShippingAddressInputMobileSkeleton,
} from "./shipping-address-input-mobile";

export type ShippingAddressInputProps = {
  isMobile?: boolean;
  value?: string;
  onChange: (addressId: string) => void;
};

function selectDetail(cache: AddressDetailCache) {
  const data = cache.data;
  return {
    label: data.label,
    receiver: data.receiver,
    address: data.address,
    phone: data.phone,
    isDefault: data.default,
  };
}

export function ShippingAddressInput(props: ShippingAddressInputProps) {
  const [isShowAddressList, setShowAddressList] = useState(false);
  const [isShowAddressForm, setShowAddressForm] = useState(false);
  const [addressId, setAddressId] = useState(props.value ?? "");
  const [isShowSubmitButton, setShowSubmitButton] = useState(false);
  const { data, isLoading } = useGetAddressDetail(
    { addressId: props.value ?? "" },
    { select: selectDetail, enabled: Boolean(props.value) }
  );

  function onShowHideAddressList() {
    setShowAddressList(!isShowAddressList);
    setShowAddressForm(false);
    setAddressId(props.value ?? "");
  }

  function onShowHideAddressForm() {
    setShowAddressForm(!isShowAddressForm);
  }

  function onSelectAddress(value: string) {
    setAddressId(value);
    setShowAddressForm(false);
  }

  function onEditAddress(value: string) {
    setAddressId(value);
    setShowAddressForm(true);
  }

  function onSubmit(value: string) {
    props.onChange(value);
    setShowAddressForm(false);
    setShowAddressList(false);
  }

  function onCallbackAddress(
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
  ) {
    if (data && data?.length > 0) {
      setShowSubmitButton(true);
    } else {
      setShowSubmitButton(false);
    }
  }

  if (isLoading) {
    return <ShippingAddressInputSkeleton isMobile={props.isMobile} />;
  }

  const otherPorps = {
    selectedAddress: data,
    onShowHideAddressList,
    isShowAddressList,
    onSelectAddress,
    onSubmit,
    isShowAddressForm,
    onShowHideAddressForm,
    onSuccessAddNewAddress: onSubmit,
    selectedAddressId: addressId,
    onEditAddress,
    onCallbackAddress,
    isShowSubmitButton,
  };

  if (props.isMobile) {
    return <ShippingAddressInputMobile {...otherPorps} />;
  }
  return <ShippingAddressInputDesktop {...otherPorps} />;
}

export type ShippingAddressInputSkeletonProps = {
  isMobile?: boolean;
};

export function ShippingAddressInputSkeleton(
  props: ShippingAddressInputSkeletonProps
) {
  if (props.isMobile) {
    return <ShippingAddressInputMobileSkeleton />;
  }
  return <ShippingAddressInputDesktopSkeleton />;
}
