import React from "react";
import {
  DiseaseTagsDesktop,
  DiseaseTagsSkeletonDesktop,
} from "./disease-tags-desktop";
import {
  DiseaseTagsMobile,
  DiseaseTagsSkeletonMobile,
} from "./disease-tags-mobile";
import {
  useGetDiseaseDetail,
  DiseaseDetailCache,
} from "./disease-list-queries";

export type DiseaseTagsProps = {
  isMobile: boolean;
  slug: string;
};

export type DiseaseTagsSkeletonProps = {
  isMobile: boolean;
};

function selectArticle(disease: DiseaseDetailCache) {
  return disease.data;
}

export function DiseaseTags(props: DiseaseTagsProps) {
  const { isMobile, slug } = props;
  const { data: disease, isLoading } = useGetDiseaseDetail(
    {
      diseaseSlug: slug,
    },
    { select: selectArticle }
  );

  const newProps = {
    tags: disease?.tags ?? [],
  };

  if (isLoading) {
    return <DiseaseTagsSkeleton isMobile={isMobile} />;
  }

  if (isMobile) {
    return <DiseaseTagsMobile {...newProps} />;
  }
  return <DiseaseTagsDesktop {...newProps} />;
}

export function DiseaseTagsSkeleton(props: DiseaseTagsSkeletonProps) {
  const { isMobile } = props;

  if (isMobile) {
    return <DiseaseTagsSkeletonMobile />;
  }
  return <DiseaseTagsSkeletonDesktop />;
}
