import React from "react";
import { useAssets } from "@sehatq/utils";
import {
  PediatricClinicHealthServiceSkeletonDesktop,
  PediatricClinicHealthServiceDesktop,
} from "./pediatric-clinic-health-service-desktop";
import {
  PediatricClinicHealthServiceSkeletonMobile,
  PediatricClinicHealthServiceMobile,
} from "./pediatric-clinic-health-service-mobile";

export type PediatricClinicHealthServiceProps = { isMobile: boolean };
export type PediatricClinicHealthServiceSkeletonProps = { isMobile: boolean };

export function PediatricClinicHealthService(
  props: PediatricClinicHealthServiceProps
) {
  const { isMobile } = props;
  const ASSETS = useAssets(["ICON_CUT", "ICON_INJECT", "ICON_BOTTLE"]);

  const contents = [
    {
      id: 1,
      image: ASSETS.ICON_CUT,
      title: "Sunat",
      description:
        "Temukan prosedur sunat higienis di faskes terdekat Ayah & Bunda.",
      navigationValue: {
        name: "EXTERNAL_CATEGORY",
        query: {
          slugUrl: "ibu-dan-anak",
          q: "sunat",
        },
      },
    },
    {
      id: 2,
      image: ASSETS.ICON_INJECT,
      title: "Imunisasi Anak",
      description: "Cegah penyakit, bentuk antibodi Si Kecil lewat imunisasi.",
      navigationValue: {
        name: "EXTERNAL_CATEGORY",
        query: {
          slugUrl: "vaksin",
          q: "vaksin anak",
        },
      },
    },
    {
      id: 3,
      image: ASSETS.ICON_BOTTLE,
      title: "Paket Isoman Anak",
      description: "Tumbuh yang merupakan perubahan fisik yang dapat diukur.",
      navigationValue: {
        name: "SEARCH",
        query: {
          q: "isoman anak",
        },
      },
    },
  ];

  const newProps = { contents };
  if (isMobile) {
    return <PediatricClinicHealthServiceMobile {...newProps} />;
  }
  return <PediatricClinicHealthServiceDesktop {...newProps} />;
}

export function PediatricClinicHealthServiceSkeleton(
  props: PediatricClinicHealthServiceSkeletonProps
) {
  const { isMobile } = props;

  if (isMobile) {
    return <PediatricClinicHealthServiceSkeletonMobile />;
  }
  return <PediatricClinicHealthServiceSkeletonDesktop />;
}
