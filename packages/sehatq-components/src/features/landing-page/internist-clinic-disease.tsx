import React, { useState } from "react";

import { useAssets } from "@sehatq/utils";
import { InternistClinicDiseaseDesktop } from "./internist-clinic-disease-desktop";
import { InternistClinicDiseaseMobile } from "./internist-clinic-disease-mobile";

export type InternistClinicDiseaseProps = { isMobile: boolean };
export type InternistClinicDiseaseSkeletonProps = { isMobile: boolean };

export function InternistClinicDisease(props: InternistClinicDiseaseProps) {
  const { isMobile } = props;
  const [stateTab, setStateTab] = useState(1);
  const ASSETS = useAssets([
    "ILLUSTRATION_HIPERTENSI",
    "ILLUSTRATION_BRONKITIS",
    "ILLUSTRATION_DIABETES",
    "ILLUSTRATION_GERD",
  ]);

  const tabs = [
    {
      id: 1,
      label: "Diabetes",
      title: "Diabetes",
      description: `Diabetes adalah penyakit metabolik yang menyebabkan kadar gula
      darah tinggi. Penyakit gula ini berkaitan dengan hormon insulin
      yang berperan memindahkan gula dari dalam tubuh ke dalam sel
      untuk disimpan menjadi energi.`,
      image: ASSETS.ILLUSTRATION_DIABETES,
      deaseNavigation: {
        name: "DISEASE",
        query: { slugs: "diabetes" },
      },
    },
    {
      id: 2,
      label: "Bronkitis",
      title: "Bronkitis",
      description: `Bronkitis adalah infeksi pada cabang saluran pernapasan (brokus)
      yang bisa terjadi pada anak-anak maupun orang dewasa. Faktor
      risiko pemicunya antara lain merokok, imunitas rendah,
      kontaminasi kuman, serta sakit maag. Pelajari selengkapnya
      tentang bronkitis.`,
      image: ASSETS.ILLUSTRATION_BRONKITIS,
      deaseNavigation: {
        name: "DISEASE",
        query: { slugs: "bronkitis" },
      },
    },
    {
      id: 3,
      label: "GERD",
      title: "GERD",
      description: `GERD atau Gastroesophageal reflux disease adalah naiknya asam
        lambung ke kerongkongan akibat otot katup bagian bawah kerongkongan
        (otot LES) menjadi lemah. Otot yang lemah ini menyebabkan asam
        lambung naik ke kerongkongan, sehingga memicu peradangan.`,
      image: ASSETS.ILLUSTRATION_GERD,
      deaseNavigation: {
        name: "DISEASE",
        query: { slugs: "gerd" },
      },
    },
    {
      id: 4,
      label: "Hipertensi",
      title: "Hipertensi",
      description: `Hipertensi adalah kondisi ketika tekanan darah terukur 130/80
      mmHg atau lebih tinggi. Tekanan darah ditentukan berapa banyak
      volume darah yang dipompa oleh jantung. Tekanan darah yang
      tinggi bisa saja mengindikasikan masalah kesehatan yang serius.`,
      image: ASSETS.ILLUSTRATION_HIPERTENSI,
      deaseNavigation: {
        name: "DISEASE",
        query: { slugs: "hipertensi" },
      },
    },
  ];

  const newProps = {
    tabs,
    stateTab,
    setStateTab,
  };
  if (isMobile) {
    return <InternistClinicDiseaseMobile {...newProps} />;
  }
  return <InternistClinicDiseaseDesktop {...newProps} />;
}
