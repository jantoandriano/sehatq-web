import React from "react";

import { PublicMentalHealthToolFaqMobile } from "./public-mental-health-tool-faq-mobile";
import { PublicMentalHealthToolFaqDesktop } from "./public-mental-health-tool-faq-desktop";

export type PublicMentalHealthToolFaqProps = {
  isMobile: boolean;
};

export function PublicMentalHealthToolFaq(
  props: PublicMentalHealthToolFaqProps
) {
  if (props.isMobile) {
    return <PublicMentalHealthToolFaqMobile />;
  }
  return <PublicMentalHealthToolFaqDesktop />;
}
