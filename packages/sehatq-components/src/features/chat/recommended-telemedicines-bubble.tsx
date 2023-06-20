import React from "react";
import {
  RecommendedTelemedicinesBubbleDesktop,
  RecommendedTelemedicinesBubbleDesktopProps,
} from "./recommended-telemedicines-bubble-desktop";
import {
  RecommendedTelemedicinesBubbleMobile,
  RecommendedTelemedicinesBubbleMobileProps,
} from "./recommended-telemedicines-bubble-mobile";

export type RecommendedTelemedicinesBubbleProps =
  | ({ isMobile: true } & RecommendedTelemedicinesBubbleMobileProps)
  | ({ isMobile: false } & RecommendedTelemedicinesBubbleDesktopProps);

export function RecommendedTelemedicinesBubble(
  props: RecommendedTelemedicinesBubbleProps
) {
  const { isMobile, ...otherProps } = props;

  if (isMobile) {
    return <RecommendedTelemedicinesBubbleMobile {...otherProps} />;
  }
  return <RecommendedTelemedicinesBubbleDesktop {...otherProps} />;
}
