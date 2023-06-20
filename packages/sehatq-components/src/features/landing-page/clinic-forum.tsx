import React from "react";

import { NavigationValue } from "@sehatq/utils";
import {
  ClinicForumDesktop,
  ClinicForumSkeletonDesktop,
} from "./clinic-forum-desktop";
import {
  ClinicForumMobile,
  ClinicForumSkeletonMobile,
} from "./clinic-forum-mobile";

export type ClinicForumProps = {
  isMobile: boolean;
  title: string;
  description: string;
  link: {
    label: string;
    value: NavigationValue;
  };
};
export type ClinicForumSkeletonProps = { isMobile: boolean };

export function ClinicForum(props: ClinicForumProps) {
  const { isMobile, ...otherProps } = props;

  if (isMobile) {
    return <ClinicForumMobile {...otherProps} />;
  }
  return <ClinicForumDesktop {...otherProps} />;
}

export function ClinicForumSkeleton(props: ClinicForumSkeletonProps) {
  const { isMobile } = props;

  if (isMobile) {
    return <ClinicForumSkeletonMobile />;
  }
  return <ClinicForumSkeletonDesktop />;
}
