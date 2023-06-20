import React from "react";
import { NavigationValue } from "@sehatq/utils";
import { ClinicForum } from "./clinic-forum";

type CardiacClinicForumDesktopProps = {
  title: string;
  description: string;
  link: {
    label: string;
    value: NavigationValue;
  };
};

export function CardiacClinicForumDesktop(
  props: CardiacClinicForumDesktopProps
) {
  return <ClinicForum isMobile={false} {...props} />;
}
