import React from "react";
import { useCancelPurchase } from "./charge-queries";

import { ModalConfirmationExitDesktop } from "./modal-confirmation-desktop";
import { ModalConfirmationExitMobile } from "./modal-confirmation-mobile";

type ModalConfirmationExitProps = {
  isMobile: boolean;
  isOpen: boolean;
  onClose: () => void;
  onConfrim: () => void;
  isLoadingCancelPurchase?: boolean;
};

export function ModalConfirmationExit(props: ModalConfirmationExitProps) {
  const { isMobile, isOpen, onClose, onConfrim } = props;
  const { isLoading: isLoadingCancelPurchase } = useCancelPurchase();

  const newProps = {
    isOpen,
    onConfrim,
    onClose,
    isLoadingCancelPurchase,
  };

  if (isMobile) {
    return <ModalConfirmationExitMobile {...newProps} />;
  }
  return <ModalConfirmationExitDesktop {...newProps} />;
}
