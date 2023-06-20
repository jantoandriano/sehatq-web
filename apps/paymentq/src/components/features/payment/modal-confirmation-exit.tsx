import React from "react";
import { ModalConfirmationExitDesktop } from "./modal-confirmation-exit-desktop";
import { ModalConfirmationExitMobile } from "./modal-confirmation-exit-mobile";

type ModalConfirmationExitProps = {
  isMobile: boolean;
  isOpen: boolean;
  onClose: () => void;
  onConfrim: () => void;
};

export function ModalConfirmationExit(props: ModalConfirmationExitProps) {
  const { isMobile } = props;

  if (isMobile) {
    return <ModalConfirmationExitMobile {...props} />;
  }
  return <ModalConfirmationExitDesktop {...props} />;
}
