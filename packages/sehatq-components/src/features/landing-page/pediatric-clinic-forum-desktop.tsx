import React from "react";
import { NavigationValue } from "@sehatq/utils";
import { ClinicForum } from "./clinic-forum";

type PediatricClinicForumDesktopProps = {
  title: string;
  description: string;
  link: {
    label: string;
    value: NavigationValue;
  };
};

export function PediatricClinicForumDesktop(
  props: PediatricClinicForumDesktopProps
) {
  return <ClinicForum isMobile={false} {...props} />;
}
