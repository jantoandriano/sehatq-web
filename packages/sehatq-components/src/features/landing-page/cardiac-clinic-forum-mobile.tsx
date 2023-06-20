import React from "react";
import { NavigationValue } from "@sehatq/utils";
import { ClinicForum } from "./clinic-forum";

type CardiacClinicForumMobileProps = {
  title: string;
  description: string;
  link: {
    label: string;
    value: NavigationValue;
  };
};

export function CardiacClinicForumMobile(props: CardiacClinicForumMobileProps) {
  return <ClinicForum isMobile {...props} />;
}
