import React from "react";

import { useAssets } from "@sehatq/utils";
import { CardiacClinicHealthServiceDesktop } from "./cardiac-clinic-health-service-desktop";
import { CardiacClinicHealthServiceMobile } from "./cardiac-clinic-health-service-mobile";

export type CardiacClinicHealthServiceProps = { isMobile: boolean };
export type CardiacClinicHealthServiceSkeletonProps = { isMobile: boolean };

export function CardiacClinicHealthService(
  props: CardiacClinicHealthServiceProps
) {
  const { isMobile } = props;
  const ASSETS = useAssets([
    "BG_USG",
    "BG_RONTGEN",
    "BG_CT_SCAN",
    "BG_TES_DARAH",
  ]);

  const contents = [
    {
      id: 1,
      title: "Tes Darah",
      image: ASSETS.BG_TES_DARAH,
      slugs: ["lp-tes-darah"],
    },
    {
      id: 2,
      title: "USG",
      image: ASSETS.BG_USG,
      slugs: ["lp-ultrasound-usg"],
    },
    {
      id: 3,
      title: "Rontgen",
      image: ASSETS.BG_RONTGEN,
      slugs: ["lp-rontgen"],
    },
    {
      id: 4,
      title: "CT Scan",
      image: ASSETS.BG_CT_SCAN,
      slugs: ["lp-ct-scan"],
    },
  ];

  const newProps = {
    contents,
  };
  if (isMobile) {
    return <CardiacClinicHealthServiceMobile {...newProps} />;
  }
  return <CardiacClinicHealthServiceDesktop {...newProps} />;
}
