import React from "react";

import {
  useGetMedicalProcedures,
  MedicalProceduresCache,
} from "../medical-procedure";
import {
  MedicalProceduresSectionDesktop,
  MedicalProcedureSectionDesktopSkeleton,
} from "./medical-procedures-section-desktop";
import {
  MedicalProceduresSectionMobile,
  MedicalProcedureSectionMobileSkeleton,
} from "./medical-procedures-section-mobile";

function selectData(MedicalProcedureList: MedicalProceduresCache) {
  return MedicalProcedureList.data.slice(0, 4).map((medicalProcedure) => {
    return {
      id: medicalProcedure.id,
      slug: medicalProcedure.slug,
      imageUrl: medicalProcedure.imageUrl,
      imageAlt: medicalProcedure.imageAlt,
      title: medicalProcedure.title,
      meta: medicalProcedure.meta,
      category: medicalProcedure.category,
      author: medicalProcedure.author,
      date: medicalProcedure.date,
      rating: medicalProcedure.rating,
    };
  });
}

export type MedicalProceduresSectionSkeletonProps = {
  isMobile?: boolean;
};

export type MedicalProceduresSectionProps = {
  isMobile?: boolean;
  tagSlug: string;
};

export function MedicalProceduresSection(props: MedicalProceduresSectionProps) {
  const { isMobile, tagSlug } = props;

  const query = {
    page: "1",
    perPage: "4",
    tagSlug,
  };

  const {
    data: medicalProcedures,
    isLoading,
    error,
  } = useGetMedicalProcedures(query, {
    select: selectData,
  });

  const otherProps = {
    medicalProcedures: error
      ? []
      : medicalProcedures && medicalProcedures.length > 0
      ? medicalProcedures.length > 1
        ? medicalProcedures?.slice(1)
        : medicalProcedures
      : [],
    featured:
      medicalProcedures && medicalProcedures.length > 0
        ? medicalProcedures.length > 1
          ? medicalProcedures[0]
          : null
        : null,
    tagSlug,
  };

  if (isLoading) {
    return <MedicalProceduresSectionSkeleton isMobile={isMobile} />;
  }

  if (medicalProcedures?.length === 0) {
    return null;
  }

  if (isMobile) {
    return <MedicalProceduresSectionMobile {...otherProps} />;
  }
  return <MedicalProceduresSectionDesktop {...otherProps} />;
}

export function MedicalProceduresSectionSkeleton(
  props: MedicalProceduresSectionSkeletonProps
) {
  const { isMobile } = props;
  if (isMobile) return <MedicalProcedureSectionMobileSkeleton />;

  return <MedicalProcedureSectionDesktopSkeleton />;
}
