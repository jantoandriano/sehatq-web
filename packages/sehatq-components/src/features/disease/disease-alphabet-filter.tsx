import React from "react";
import {
  DiseaseAlphabetFilterDesktop,
  DiseaseAlphabetFilterSkeletonDesktop,
} from "./disease-alphabet-filter-desktop";
import {
  DiseaseAlphabetFilterMobile,
  DiseaseAlphabetFilterSkeletonMobile,
} from "./disease-alphabet-filter-mobile";

export type DiseaseAlphabetFilterProps = {
  isMobile: boolean;
  alphabetSlug: string;
  diseaseCategorySlug: string;
};

export function generateAlphabet(firstChart = "A", total = 26) {
  return [...Array(total)].map((_, i) =>
    String.fromCharCode(firstChart.charCodeAt(0) + i)
  );
}

export function DiseaseAlphabetFilter(props: DiseaseAlphabetFilterProps) {
  const { isMobile, diseaseCategorySlug, alphabetSlug } = props;

  const newProps = {
    alphabetSlug: alphabetSlug ? alphabetSlug.toUpperCase() : "",
    listAlphabet: generateAlphabet().map((item) => ({
      id: item,
      label: item,
      slugs: diseaseCategorySlug
        ? [diseaseCategorySlug, item.toLowerCase()]
        : [item.toLowerCase()],
    })),
  };

  if (isMobile) {
    return <DiseaseAlphabetFilterMobile {...newProps} />;
  }
  return <DiseaseAlphabetFilterDesktop {...newProps} />;
}

export function DiseaseAlphabetFilterSkeleton(props: { isMobile: boolean }) {
  const { isMobile } = props;

  if (isMobile) {
    return <DiseaseAlphabetFilterSkeletonMobile />;
  }
  return <DiseaseAlphabetFilterSkeletonDesktop />;
}
