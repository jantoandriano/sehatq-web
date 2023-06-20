import React from "react";

import {
  TimelineUIDesktop,
  TimelineUIDesktopProps,
  TimelineUIDesktopSkeleton,
} from "./timeline-ui-desktop";

import {
  TimelineUIMobile,
  TimelineUIMobileProps,
  TimelineUIMobileSkeleton,
} from "./timeline-ui-mobile";

export type TimelineUIProps =
  | ({ isMobile: false } & TimelineUIDesktopProps)
  | ({ isMobile: true } & TimelineUIMobileProps);

export type TimelineUISkeletonProps = {
  isMobile?: boolean;
};

export function TimelineUI(props: TimelineUIProps) {
  if (props.isMobile) {
    return <TimelineUIMobile {...props} />;
  }
  return <TimelineUIDesktop {...props} />;
}

export function TimelineUISkeleton(props: TimelineUISkeletonProps) {
  const { isMobile } = props;
  if (isMobile) return <TimelineUIMobileSkeleton />;
  return <TimelineUIDesktopSkeleton />;
}
