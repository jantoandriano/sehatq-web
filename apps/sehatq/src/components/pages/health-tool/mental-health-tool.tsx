import React from "react";

import { useGetProfile, ProfileCache } from "@sehatq/components";
import { MentalHealthToolMobile } from "./mental-health-tool-mobile";
import { MentalHealthToolDesktop } from "./mental-health-tool-desktop";

export type MentalHealthPageProps = {
  isMobile: boolean;
};

function selectUserId(user: ProfileCache) {
  return user.id;
}

export function MentalHealthPage(props: MentalHealthPageProps) {
  const { data: userId = null } = useGetProfile({ select: selectUserId });
  const { isMobile } = props;

  const newProps = {
    isMobile,
    isLogin: !!userId,
  };

  if (isMobile) {
    return <MentalHealthToolMobile {...newProps} />;
  }
  return <MentalHealthToolDesktop {...newProps} />;
}
