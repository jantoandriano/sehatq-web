import React, { useState } from "react";
import {
  AddressCardDesktop,
  AddressCardDesktopSkeleton,
  AddressCardGeneralProps,
} from "./address-card-desktop";
import {
  AddressCardMobile,
  AddressCardMobileSkeleton,
} from "./address-card-mobile";
import { useDeleteAddress } from "./address-query";

export type AddressCardProps = {
  isMobile?: boolean;
} & AddressCardGeneralProps;

export function AddressCard(props: AddressCardProps) {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { mutate, isLoading } = useDeleteAddress();
  function onDelete() {
    setShowConfirmation(!showConfirmation);
  }

  function onOkConfirmation(id: string) {
    mutate({ addressId: id });
  }

  if (isLoading) {
    <AddressCardSkeleton isMobile={props.isMobile} />;
  }

  const otherProps = {
    ...props,
    onDelete,
    onOkConfirmation,
    showConfirmation,
  };

  if (props.isMobile) {
    return <AddressCardMobile {...otherProps} />;
  }
  return <AddressCardDesktop {...otherProps} />;
}

export type AddressCardSkeletonProps = {
  isMobile?: boolean;
};

export function AddressCardSkeleton(props: AddressCardSkeletonProps) {
  if (props.isMobile) {
    return <AddressCardMobileSkeleton />;
  }
  return <AddressCardDesktopSkeleton />;
}
