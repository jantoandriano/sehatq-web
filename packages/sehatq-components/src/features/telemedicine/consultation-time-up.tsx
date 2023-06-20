import React from "react";
import { useNavigation } from "@sehatq/utils";
import { ConsultationTimeUpDesktop } from "./consultation-time-up-desktop";
import { ConsultationTimeUpMobile } from "./consultation-time-up-mobile";

export type ConsultationTimeUpProps = {
  isMobile?: boolean;
  doctorSlug: string;
  isOpen: boolean;
  onClose?: () => void;
  onClickFinish?: () => void;
};

export function ConsultationTimeUp(props: ConsultationTimeUpProps) {
  const {
    isMobile,
    doctorSlug,
    isOpen,
    onClose = () => {
      navigate("TELEMEDICINES");
    },
    onClickFinish,
  } = props;
  const { navigate } = useNavigation();

  function onTryToRegister() {
    navigate("TELEMED_DOCTOR", { slug: doctorSlug });
  }

  const newProps = {
    isOpen,
    onClickFinish,
    onTryToRegister,
    onClose,
  };

  if (isMobile) {
    return <ConsultationTimeUpMobile {...newProps} />;
  }
  return <ConsultationTimeUpDesktop {...newProps} />;
}
