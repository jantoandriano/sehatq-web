import React from "react";
import { NavigationValue } from "@sehatq/utils";
import { ClinicForum } from "./clinic-forum";

type InternistClinicForumMobileProps = {
  title: string;
  description: string;
  link: {
    label: string;
    value: NavigationValue;
  };
};

export function InternistClinicForumMobile(
  props: InternistClinicForumMobileProps
) {
  return <ClinicForum isMobile {...props} />;
}
