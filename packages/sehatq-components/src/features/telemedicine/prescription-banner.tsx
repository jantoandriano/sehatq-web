import React from "react";
import { useDisclosure } from "../../user-interfaces";
import { PrescriptionBannerDesktop } from "./prescription-banner-desktop";
import { PrescriptionBannerMobile } from "./prescription-banner-mobile";

export type PrescriptionBannerProps = {
  isMobile?: boolean;
  consultationId: string;
};

export function PrescriptionBanner(props: PrescriptionBannerProps) {
  const { isMobile, consultationId } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const otherProps = {
    isOpen,
    onOpen,
    onClose,
    consultationId,
  };

  if (isMobile) {
    return <PrescriptionBannerMobile {...otherProps} />;
  }
  return <PrescriptionBannerDesktop {...otherProps} />;
}
