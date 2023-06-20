import React from "react";
import { AdSlot } from "../google-publisher-tag";
import {
  DiseaseContentDesktop,
  DiseaseContentSkeletonDesktop,
} from "./disease-content-desktop";
import {
  DiseaseContentMobile,
  DiseaseContentSkeletonMobile,
} from "./disease-content-mobile";
import { useGetDiseaseDetail } from "./disease-list-queries";

export type DiseaseContentProps = {
  isMobile: boolean;
  slug: string;
  adsTop?: ReturnType<typeof AdSlot>;
  adsMiddle?: ReturnType<typeof AdSlot>;
  adsBottom?: ReturnType<typeof AdSlot>;
};

export type DiseaseContentSkeletonProps = {
  isMobile: boolean;
};

type generateContentTabelParam = {
  doctorExpertises: { name: string }[];
  symptomSummary: string;
  risk: string;
  diagnosisSummary: string;
  treatmentSummary: string;
  drug: string;
  complication: string;
  visitDoctor: string;
};

type generateContentListParam = {
  introductionSubtitle: string;
  introduction: string;
  symptomSubtitle: string;
  symptom: string;
  causeSubtitle: string;
  cause: string;
  diagnosisSubtitle: string;
  diagnosis: string;
  treatmentSubtitle: string;
  treatment: string;
  preventionSubtitle: string;
  prevention: string;
  when: string;
  preparation: string;
  doctorAction: string;
};

interface KeyObjectTable {
  symptomSummary: string;
  risk: string;
  diagnosisSummary: string;
  treatmentSummary: string;
  drug: string;
  complication: string;
  visitDoctor: string;
}

type KeyObjectList = generateContentListParam;

const TABLE_CONTENT = [
  { key: "doctorExpertises", label: "Dokter spesialis" },
  { key: "symptomSummary", label: "Gejala" },
  { key: "risk", label: "Faktor risiko" },
  { key: "diagnosisSummary", label: "Metode diagnosis" },
  { key: "treatmentSummary", label: "Pengobatan" },
  { key: "drug", label: "Obat" },
  { key: "complication", label: "Komplikasi" },
  { key: "visitDoctor", label: "Kapan harus ke dokter?" },
];

const LLIST_CONTENT = [
  { keyLabel: "introductionSubtitle", key: "introduction", flag: "" },
  { keyLabel: "", key: "", flag: "table" },
  { keyLabel: "", key: "", flag: "adsTopMobile" },
  { keyLabel: "symptomSubtitle", key: "symptom", flag: "" },
  { keyLabel: "", key: "", flag: "adsMiddleMobile" },
  { keyLabel: "causeSubtitle", key: "cause", flag: "" },
  { keyLabel: "diagnosisSubtitle", key: "diagnosis", flag: "" },
  { keyLabel: "", key: "", flag: "adsMiddleDesktop" },
  { keyLabel: "", key: "", flag: "adsBottomMobile" },
  { keyLabel: "treatmentSubtitle", key: "treatment", flag: "" },
  { keyLabel: "preventionSubtitle", key: "prevention", flag: "" },
  {
    keyLabel: "Kapan Harus Berkonsultasi dengan Dokter",
    key: "when",
    flag: "",
  },
  {
    keyLabel: "Apa yang Perlu Dipersiapkan Sebelum Berkonsultasi dengan Dokter",
    key: "preparation",
    flag: "",
  },
  {
    keyLabel: "Apa yang Akan Dilakukan Dokter pada Saat Konsultasi",
    key: "doctorAction",
    flag: "",
  },
];

function generateContentTabel(data: generateContentTabelParam | undefined) {
  const temp: { id: number; label: string; content: string }[] = [];
  if (data) {
    TABLE_CONTENT.forEach((item, id) => {
      if (
        data[item.key as keyof KeyObjectTable] &&
        !!data[item.key as keyof KeyObjectTable].length
      ) {
        temp.push({
          id,
          label: item.label,
          content:
            item.key === "doctorExpertises"
              ? data?.doctorExpertises
                  .map((item) => item.name)
                  .toString()
                  .replace(new RegExp(",", "g"), ", ")
              : data[item.key as keyof KeyObjectTable],
        });
      }
    });
  }
  return temp;
}

function generateContentList(data: generateContentListParam | undefined) {
  const temp: { id: number; label: string; content: string; flag: string }[] =
    [];
  if (data) {
    LLIST_CONTENT.forEach((item, id) => {
      if (data[item.key as keyof KeyObjectList]) {
        temp.push({
          id,
          label: data[item.keyLabel as keyof KeyObjectList]
            ? data[item.keyLabel as keyof KeyObjectList]
            : item.keyLabel,
          content: data[item.key as keyof KeyObjectList],
          flag: item.flag,
        });
      } else if (item.flag) {
        temp.push({
          id,
          label: "",
          content: "",
          flag: item.flag,
        });
      }
    });
  }
  return temp;
}

export function DiseaseContent(props: DiseaseContentProps) {
  const { isMobile, adsTop, adsMiddle, adsBottom, slug } = props;
  const { data: dataDetail, isLoading } = useGetDiseaseDetail({
    diseaseSlug: slug,
  });

  const newProps = {
    title: dataDetail?.data.title ?? "",
    table: generateContentTabel(dataDetail?.data),
    list: generateContentList(dataDetail?.data),
  };

  if (isLoading) {
    return <DiseaseContentSkeleton isMobile={isMobile} />;
  }

  if (isMobile) {
    const newPropsMobile = {
      ...newProps,
      adsTop,
      adsMiddle,
      adsBottom,
    };
    return <DiseaseContentMobile {...newPropsMobile} />;
  }
  const newPropsDesktop = {
    ...newProps,
    adsMiddle,
  };
  return <DiseaseContentDesktop {...newPropsDesktop} />;
}

export function DiseaseContentSkeleton(props: DiseaseContentSkeletonProps) {
  const { isMobile } = props;

  if (isMobile) {
    return <DiseaseContentSkeletonMobile />;
  }
  return <DiseaseContentSkeletonDesktop />;
}
