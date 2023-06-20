import React from "react";
import { useMutateGetHCPDetail } from "@sehatq/components";
import { useNavigation } from "@sehatq/utils";
import {
  DoctorBubbleDesktop,
  DoctorBubbleDesktopProps,
} from "./doctor-bubble-desktop";
import {
  DoctorBubbleMobile,
  DoctorBubbleMobileProps,
} from "./doctor-bubble-mobile";

export type DoctorBubbleProps =
  | ({ isMobile: true } & DoctorBubbleMobileProps)
  | ({ isMobile: false } & DoctorBubbleDesktopProps);

export function DoctorBubble(props: DoctorBubbleProps) {
  const { isMobile, ...otherProps } = props;
  const { navigate } = useNavigation();

  const { mutate } = useMutateGetHCPDetail();

  function onNavigate(value: number) {
    mutate(
      {
        hcpSlug: value.toString(),
        userLat: "",
        userLong: "",
      },
      {
        onSuccess: ({ data }) => {
          if (data.shareUrl) {
            const getSlug = data.shareUrl.split("/");
            navigate("HEALTH_CARE_PROFESIONAL", {
              slugs: [getSlug[getSlug.length - 1]],
            });
          }
        },
      }
    );
  }

  if (isMobile) {
    return <DoctorBubbleMobile {...otherProps} onNavigate={onNavigate} />;
  }
  return <DoctorBubbleDesktop {...otherProps} onNavigate={onNavigate} />;
}
