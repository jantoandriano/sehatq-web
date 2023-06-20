import React from "react";
import {
  useGetProfile,
  ProfileCache,
  useGetEmployeeInfo,
} from "@sehatq/components";
import { TelemedicineLandingDesktop } from "./telemedicine-landing-desktop";
import { TelemedicineLandingMobile } from "./telemedicine-landing-mobile";

export type TelemedicineLandingProps = {
  isMobile: boolean;
};

function selectUserId(cache: ProfileCache) {
  return cache.id;
}

export function TelemedicineLanding(props: TelemedicineLandingProps) {
  const { isMobile } = props;
  const { data: userId } = useGetProfile({ select: selectUserId });

  // get employee info
  const { data: employeeInfo } = useGetEmployeeInfo();
  const allowFreeChat = !!employeeInfo?.allowFreeChat;
  const isCorporate = !!employeeInfo?.employeeNumber;

  const isLogin = Boolean(userId);

  const otherProps = {
    isLogin,
    allowFreeChat,
    isCorporate,
  };

  if (isMobile) {
    return <TelemedicineLandingMobile {...otherProps} />;
  }
  return <TelemedicineLandingDesktop {...otherProps} />;
}
