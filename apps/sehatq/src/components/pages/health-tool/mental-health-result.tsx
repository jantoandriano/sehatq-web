import React from "react";
import { useRouter } from "next/router";

import { useGetProfile, ProfileCache } from "@sehatq/components";
import { MentalHealthResultMobile } from "./mental-health-result-mobile";
import { MentalHealthResultDesktop } from "./mental-health-result-desktop";

export type MentalHealthResultPageProps = {
  isMobile: boolean;
};

function selectUserId(user: ProfileCache) {
  return user.id;
}

export function MentalHealthResultPage(props: MentalHealthResultPageProps) {
  const { query: currentQuery } = useRouter();
  const { data: userId = undefined } = useGetProfile({ select: selectUserId });
  const { isMobile } = props;

  const newProps = {
    isMobile,
    isLogin: !!userId,
    userId,
    specialitySlug: currentQuery?.specialitySlug,
    specialityId: currentQuery?.specialityId,
  };

  if (isMobile) {
    return <MentalHealthResultMobile {...newProps} />;
  }
  return <MentalHealthResultDesktop {...newProps} />;
}
