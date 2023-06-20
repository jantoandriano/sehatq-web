import React from "react";
import { NavigationValue } from "@sehatq/utils";
import { ClinicForum } from "./clinic-forum";

type InternistClinicForumDesktopProps = {
  title: string;
  description: string;
  link: {
    label: string;
    value: NavigationValue;
  };
};

export function InternistClinicForumDesktop(
  props: InternistClinicForumDesktopProps
) {
  return <ClinicForum isMobile={false} {...props} />;
}
