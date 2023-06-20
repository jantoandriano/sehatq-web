import React, { useState } from "react";

import { useAssets } from "@sehatq/utils";
import {
  PediatricClinicInfoDesktop,
  PediatricClinicInfoSkeletonDesktop,
} from "./pediatric-clinic-info-desktop";
import {
  PediatricClinicInfoMobile,
  PediatricClinicInfoSkeletonMobile,
} from "./pediatric-clinic-info-mobile";

export type PediatricClinicInfoProps = { isMobile: boolean };
export type PediatricClinicInfoSkeletonProps = { isMobile: boolean };

export function PediatricClinicInfo(props: PediatricClinicInfoProps) {
  const { isMobile } = props;
  const [stateTab, setStateTab] = useState(1);
  const ASSETS = useAssets([
    "ILLUSTRATION_BABY",
    "ILLUSTRATION_BATITA",
    "ILLUSTRATION_TODDLER",
    "ILLUSTRATION_CHILD",
  ]);

  const tabs = [
    {
      id: 1,
      label: "Bayi",
      title: "Tahukah Ayah Bunda? Bayi Bisa Tidur Hingga 20 Jam Sehari",
      subTitle:
        "Saat Si Kecil baru lahir, ia bisa tidur hingga 20 jam sehari. Seiring bertambahnya usia, durasi tidurnya akan berkurang.",
      image: ASSETS.ILLUSTRATION_BABY,
    },
    {
      id: 2,
      label: "Batita",
      title: "Anak Batita Mudah Sekali Meniru",
      subTitle:
        "Pada perkembangan kognitif anak di usia ini anak mudah sekali meniru apa yang dilihat dan didengar, seperti meniru apa yang Ayah Bunda lakukan dan ucapkan.",
      image: ASSETS.ILLUSTRATION_BATITA,
    },
    {
      id: 3,
      label: "Balita",
      title: "Tidur Siang pada Balita itu Penting, Loh",
      subTitle:
        "Pasalnya, tidur siang pada balita akan membantu perkembangan otak yang mengatur emosi serta membantu mereka lebih tenang dan stabil secara psikologis.",
      image: ASSETS.ILLUSTRATION_TODDLER,
    },
    {
      id: 4,
      label: "Anak",
      title: "Ayah Bunda, Tahukah bahwa Tahap Tumbuh Kembang Anak Terbagi Dua?",
      subTitle:
        "Tumbuh yang merupakan perubahan fisik yang dapat diukur; Kembang yang merupakan pertambahan kemampuan struktur dan fungsi tubuh yang lebih kompleks.",
      image: ASSETS.ILLUSTRATION_CHILD,
    },
  ];

  const newProps = {
    tabs,
    stateTab,
    setStateTab,
  };
  if (isMobile) {
    return <PediatricClinicInfoMobile {...newProps} />;
  }
  return <PediatricClinicInfoDesktop {...newProps} />;
}

export function PediatricClinicInfoSkeleton(
  props: PediatricClinicInfoSkeletonProps
) {
  const { isMobile } = props;

  if (isMobile) {
    return <PediatricClinicInfoSkeletonMobile />;
  }
  return <PediatricClinicInfoSkeletonDesktop />;
}
