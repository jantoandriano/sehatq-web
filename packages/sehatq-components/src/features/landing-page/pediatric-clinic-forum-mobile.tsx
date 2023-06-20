import React from "react";
import { NavigationValue } from "@sehatq/utils";
import { ClinicForum } from "./clinic-forum";

type PediatricClinicForumMobileProps = {
  title: string;
  description: string;
  link: {
    label: string;
    value: NavigationValue;
  };
};

export function PediatricClinicForumMobile(
  props: PediatricClinicForumMobileProps
) {
  return <ClinicForum isMobile {...props} />;
}
