import React from "react";

import { useAssets } from "@sehatq/utils";
import {
  InternistClinicHealthServiceDesktop,
  InternistClinicHealthServiceSkeletonDesktop,
} from "./internist-clinic-health-service-desktop";
import {
  InternistClinicHealthServiceMobile,
  InternistClinicHealthServiceSkeletonMobile,
} from "./internist-clinic-health-service-mobile";

export type InternistClinicHealthServiceProps = { isMobile: boolean };
export type InternistClinicHealthServiceSkeletonProps = { isMobile: boolean };

export function InternistClinicHealthService(
  props: InternistClinicHealthServiceProps
) {
  const { isMobile } = props;
  const ASSETS = useAssets(["BG_USG", "BG_RONTGEN", "BG_CT_SCAN", "BG_LUNGS"]);

  const contents = [
    {
      id: 1,
      title: "USG",
      image: ASSETS.BG_USG,
      slugs: ["lp-ultrasound-usg"],
    },
    {
      id: 2,
      title: "Rontgen",
      image: ASSETS.BG_RONTGEN,
      slugs: ["lp-rontgen"],
    },
    {
      id: 3,
      title: "CT Scan",
      image: ASSETS.BG_CT_SCAN,
      slugs: ["lp-ct-scan"],
    },
    {
      id: 4,
      title: "Paru",
      image: ASSETS.BG_LUNGS,
      slugs: ["lp-fungsi-paru"],
    },
  ];

  const newProps = {
    contents,
  };
  if (isMobile) {
    return <InternistClinicHealthServiceMobile {...newProps} />;
  }
  return <InternistClinicHealthServiceDesktop {...newProps} />;
}

export function InternistClinicHealthServiceSkeleton(
  props: InternistClinicHealthServiceSkeletonProps
) {
  const { isMobile } = props;

  if (isMobile) {
    return <InternistClinicHealthServiceSkeletonMobile />;
  }
  return <InternistClinicHealthServiceSkeletonDesktop />;
}
