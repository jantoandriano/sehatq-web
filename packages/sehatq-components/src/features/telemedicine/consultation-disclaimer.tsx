import React, { useState } from "react";
import { ConsultationDisclaimerDesktop } from "./consultation-disclaimer-desktop";
import { ConsultationDisclaimerMobile } from "./consultation-disclaimer-mobile";

export type ConsultationDisclaimerProps = {
  isMobile?: boolean;
  isFullWidth?: boolean;
};

export function ConsultationDisclaimer(props: ConsultationDisclaimerProps) {
  const [isOpen, setIsOpen] = useState(false);
  function onCloseDisclaimer() {
    setIsOpen(!isOpen);
  }
  const otherProps = {
    isOpen,
    onCloseDisclaimer,
    isFullWidth: props.isFullWidth,
  };
  if (props.isMobile) {
    return <ConsultationDisclaimerMobile {...otherProps} />;
  }

  return <ConsultationDisclaimerDesktop {...otherProps} />;
}
