import React from "react";

import { ModalCVVInfoDesktop } from "./modal-cvvinfo-desktop";
import { ModalCVVInfoMobile } from "./modal-cvvinfo-mobile";

type ModalConfirmationExitProps = {
  isMobile: boolean;
  isOpen: boolean;
  onClose: () => void;
};

export function ModalCVVInfo(props: ModalConfirmationExitProps) {
  const { isMobile, isOpen, onClose } = props;

  const newProps = {
    isOpen,
    onClose,
  };

  if (isMobile) {
    return <ModalCVVInfoMobile {...newProps} />;
  }
  return <ModalCVVInfoDesktop {...newProps} />;
}
