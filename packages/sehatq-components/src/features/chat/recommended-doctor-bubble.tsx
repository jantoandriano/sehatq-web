import React from "react";
import {
  RecommendedDoctorBubbleDesktop,
  RecommendedDoctorBubbleDesktopProps,
} from "./recommended-doctor-bubble-desktop";
import {
  RecommendedDoctorBubbleMobile,
  RecommendedDoctorBubbleMobileProps,
} from "./recommended-doctor-bubble-mobile";

export type RecommendedDoctorBubbleProps =
  | ({ isMobile: true } & RecommendedDoctorBubbleMobileProps)
  | ({ isMobile: false } & RecommendedDoctorBubbleDesktopProps);

export function RecommendedDoctorBubble(props: RecommendedDoctorBubbleProps) {
  const { isMobile, ...otherProps } = props;

  if (isMobile) {
    return <RecommendedDoctorBubbleMobile {...otherProps} />;
  }
  return <RecommendedDoctorBubbleDesktop {...otherProps} />;
}
