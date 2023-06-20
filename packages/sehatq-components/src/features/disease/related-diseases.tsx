import React from "react";
import { RelatedDiseasesDesktop } from "./related-diseases-desktop";
import { RelatedDiseasesMobile } from "./related-diseases-mobile";
import {
  useGetRelatedDiseases,
  RelatedDiseasesCache,
} from "./related-diseases-queries";

function selectRelatedDiseases(relatedDiseases: RelatedDiseasesCache) {
  return relatedDiseases;
}

export type RelatedDiseasesProps = {
  isMobile?: boolean;
  tagId: string;
};

export function RelatedDiseases(props: RelatedDiseasesProps) {
  const { tagId, isMobile } = props;

  const {
    data: diseases = [],
    isLoading,
    error,
  } = useGetRelatedDiseases({ tagId }, { select: selectRelatedDiseases });

  const basicProps = {
    diseases,
    isLoading: isLoading && !error,
    error,
  };

  if (isMobile) {
    return <RelatedDiseasesMobile {...basicProps} />;
  }
  return <RelatedDiseasesDesktop {...basicProps} />;
}
