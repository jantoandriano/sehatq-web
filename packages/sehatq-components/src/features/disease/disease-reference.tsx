import React from "react";
import {
  DiseaseDetailCache,
  useGetDiseaseDetail,
} from "./disease-list-queries";
import {
  DiseaseReferenceDesktop,
  DiseaseReferenceDesktopSkeleton,
} from "./disease-reference-desktop";
import {
  DiseaseReferenceMobile,
  DiseaseReferenceMobileSkeleton,
} from "./disease-reference-mobile";

export type DiseaseReferenceProps = {
  isMobile: boolean;
  slug: string;
};

export type ArticleReferenceSkeletonProps = {
  isMobile: boolean;
};

function selectDisease(article: DiseaseDetailCache) {
  return article.data;
}

export function DiseaseReference(props: DiseaseReferenceProps) {
  const { isMobile, slug } = props;
  const { data: disease, isLoading } = useGetDiseaseDetail(
    { diseaseSlug: slug },
    { select: selectDisease }
  );

  const newProps = {
    references: disease?.reference ?? "",
  };

  if (isLoading) {
    return <DiseaseReferenceSkeleton isMobile={isMobile} />;
  }

  if (isMobile) {
    return <DiseaseReferenceMobile {...newProps} />;
  }
  return <DiseaseReferenceDesktop {...newProps} />;
}

export function DiseaseReferenceSkeleton(props: ArticleReferenceSkeletonProps) {
  const { isMobile } = props;
  if (isMobile) return <DiseaseReferenceMobileSkeleton />;
  return <DiseaseReferenceDesktopSkeleton />;
}
