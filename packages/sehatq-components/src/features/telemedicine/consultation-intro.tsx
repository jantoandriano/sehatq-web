import React from "react";
import {
  ConsultationIntroDesktop,
  ConsultationIntroDesktopProps,
} from "./consultation-intro-desktop";
import {
  ConsultationIntroMobile,
  ConsultationIntroMobileProps,
} from "./consultation-intro-mobile";

export type ConsultationIntroProps =
  | ({
      isMobile?: false;
    } & ConsultationIntroDesktopProps)
  | ({
      isMobile: true;
    } & ConsultationIntroMobileProps);

export function ConsultationIntro(props: ConsultationIntroProps) {
  const { isMobile, ...otehrProps } = props;

  if (isMobile) {
    return <ConsultationIntroMobile {...otehrProps} />;
  }
  return <ConsultationIntroDesktop {...otehrProps} />;
}
