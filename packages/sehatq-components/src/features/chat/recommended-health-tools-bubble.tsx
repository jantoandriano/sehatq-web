import React from "react";
import {
  RecommendedHealthToolsBubbleDesktop,
  RecommendedHealthToolsBubbleDesktopProps,
} from "./recommended-health-tools-bubble-desktop";
import {
  RecommendedHealthToolsBubbleMobile,
  RecommendedHealthToolsBubbleMobileProps,
} from "./recommended-health-tools-bubble-mobile";

export type RecommendedHealthToolsBubbleProps =
  | ({ isMobile: true } & RecommendedHealthToolsBubbleMobileProps)
  | ({ isMobile: false } & RecommendedHealthToolsBubbleDesktopProps);

export function RecommendedHealthToolsBubble(
  props: RecommendedHealthToolsBubbleProps
) {
  const { isMobile, ...otherProps } = props;

  if (isMobile) {
    return <RecommendedHealthToolsBubbleMobile {...otherProps} />;
  }
  return <RecommendedHealthToolsBubbleDesktop {...otherProps} />;
}
