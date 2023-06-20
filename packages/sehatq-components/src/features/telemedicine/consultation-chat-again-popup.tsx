import React from "react";
import { ConsultationChatAgainPopupDesktop } from "./consultation-chat-again-popup-desktop";
import { ConsultationChatAgainPopupMobile } from "./consultation-chat-again-popup-mobile";

export type ConsultationChatAgainPopupProps = {
  isMobile?: boolean;
  isOpen: boolean;
  onClose: () => void;
};

export function ConsultationChatAgainPopup(
  props: ConsultationChatAgainPopupProps
) {
  const { isMobile, isOpen, onClose } = props;

  const newProps = {
    isOpen,
    onClose,
  };

  if (isMobile) {
    return <ConsultationChatAgainPopupMobile {...newProps} />;
  }
  return <ConsultationChatAgainPopupDesktop {...newProps} />;
}
