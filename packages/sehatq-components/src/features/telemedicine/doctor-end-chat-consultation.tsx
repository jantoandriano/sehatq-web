import React from "react";
import { useNavigation } from "@sehatq/utils";
import { DoctorEndChatConsultationDesktop } from "./doctor-end-chat-consultation-desktop";
import { DoctorEndChatConsultationMobile } from "./doctor-end-chat-consultation-mobile";

export type DoctorEndChatConsultationProps = {
  isMobile?: boolean;
  isOpen: boolean;
  onClose?: () => void;
  onClickFinish?: () => void;
};

export function DoctorEndChatConsultation(
  props: DoctorEndChatConsultationProps
) {
  const { navigate } = useNavigation();
  const {
    isMobile,
    isOpen,
    onClose = () => {
      navigate("TELEMEDICINES");
    },
    onClickFinish,
  } = props;

  const newProps = {
    isOpen,
    onClose,
    onClickFinish,
  };

  if (isMobile) {
    return <DoctorEndChatConsultationMobile {...newProps} />;
  }
  return <DoctorEndChatConsultationDesktop {...newProps} />;
}
