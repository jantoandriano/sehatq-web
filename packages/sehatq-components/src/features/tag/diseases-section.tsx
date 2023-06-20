import React from "react";

import { useGetDiseases, DiseasesCache } from "../disease";
import {
  DiseasesSectionDesktop,
  DiseasesSectionDesktopSkeleton,
} from "./diseases-section-desktop";
import {
  DiseasesSectionMobile,
  DiseasesSectionMobileSkeleton,
} from "./diseases-section-mobile";

function selectData(DiseaseList: DiseasesCache) {
  return DiseaseList.data.slice(0, 3).map((disease) => {
    return {
      id: disease.id,
      slug: disease.slug,
      imageUrl: disease.imageUrl,
      title: disease.title,
      desc: disease.imageAlt,
    };
  });
}

export type DiseasesSectionSkeletonProps = {
  isMobile?: boolean;
};

export type DiseasesSectionProps = {
  isMobile?: boolean;
  tagSlug: string;
};

export function DiseasesSection(props: DiseasesSectionProps) {
  const { isMobile, tagSlug } = props;

  const query = {
    page: "1",
    perPage: "3",
    categoryId: "",
    tagSlug,
  };

  const {
    data: diseases,
    isLoading,
    error,
  } = useGetDiseases(query, {
    select: selectData,
  });

  const otherProps = {
    diseases: error ? [] : diseases ?? [],
    tagSlug,
  };

  if (isLoading) {
    return <DiseasesSectionSkeleton isMobile={isMobile} />;
  }

  if (diseases?.length === 0) {
    return null;
  }

  if (isMobile) {
    return <DiseasesSectionMobile {...otherProps} />;
  }
  return <DiseasesSectionDesktop {...otherProps} />;
}

export function DiseasesSectionSkeleton(props: DiseasesSectionSkeletonProps) {
  const { isMobile } = props;
  if (isMobile) return <DiseasesSectionMobileSkeleton />;

  return <DiseasesSectionDesktopSkeleton />;
}
