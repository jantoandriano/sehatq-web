import React from "react";
import {
  BubbleContainerDesktop,
  BubbleContainerDesktopSkeleton,
  BubbleContainerDesktopProps,
} from "./bubble-container-desktop";
import {
  BubbleContainerMobile,
  BubbleContainerMobileSkeleton,
  BubbleContainerMobileProps,
} from "./bubble-container-mobile";

export type BubbleContainerProps =
  | ({ isMobile: true } & BubbleContainerMobileProps)
  | ({ isMobile: false } & BubbleContainerDesktopProps);

export function BubbleContainer(props: BubbleContainerProps) {
  const { isMobile, ...otherProps } = props;

  if (isMobile) {
    return <BubbleContainerMobile {...otherProps} />;
  }
  return <BubbleContainerDesktop {...otherProps} />;
}

export type BubbleContainerSkeletonProps = {
  isMobile?: boolean;
};

export function BubbleContainerSkeleton(props: BubbleContainerSkeletonProps) {
  const { isMobile } = props;
  if (isMobile) return <BubbleContainerMobileSkeleton />;

  return <BubbleContainerDesktopSkeleton />;
}
