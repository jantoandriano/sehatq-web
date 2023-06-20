import React from "react";
import { MyTelemedicineCardDesktop } from "./my-telemedicine-card-desktop";
import {
  MyTelemedicineCardMobile,
  MyTelemedicineCardMobileProps,
} from "./my-telemedicine-card-mobile";

export type MyTelemedicineCardProps =
  | ({ isMobile: false } & MyTelemedicineCardMobileProps)
  | ({ isMobile: true } & MyTelemedicineCardMobileProps);

export function MyTelemedicineCard(props: MyTelemedicineCardProps) {
  if (props.isMobile) {
    return <MyTelemedicineCardMobile {...props} />;
  }
  return <MyTelemedicineCardDesktop {...props} />;
}
