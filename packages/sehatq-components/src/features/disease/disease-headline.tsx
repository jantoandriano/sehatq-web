import React from "react";
import {
  DiseaseHeadlineDesktop,
  DiseaseHeadlineSkeletonDesktop,
} from "./disease-headline-desktop";
import {
  DiseaseHeadlineMobile,
  DiseaseHeadlineSkeletonMobile,
} from "./disease-headline-mobile";

import {
  useGetDiseaseDetail,
  DiseaseDetailCache,
} from "./disease-list-queries";

export type DiseaseHeadlineProps = {
  isMobile: boolean;
  slug: string;
};

export type DiseaseHeadlineSkeletonProps = { isMobile: boolean };

export type DiseaseDetailProps = {
  category?: { name: string; slug: string };
  title: string;
  author?: {
    name: string;
    slug: string;
    imageUrl: string;
    biograph: string;
  };
  date: string;
  reviewedBy?: { name: string; slug: string };
  images: { url: string; caption: string; alt: string }[];
  shareUrl: string;
};

function selectDiseaseDetail({ data }: DiseaseDetailCache) {
  return {
    category: data.category,
    title: data.title,
    author: data.author,
    date: data.date,
    reviewedBy: data.reviewedBy,
    images: data.images,
    shareUrl: data.shareUrl,
  };
}

export function DiseaseHeadline(props: DiseaseHeadlineProps) {
  const { isMobile, slug } = props;
  const { data: dataDetail } = useGetDiseaseDetail(
    {
      diseaseSlug: slug,
    },
    {
      select: selectDiseaseDetail,
    }
  );

  const newProps = {
    author: dataDetail?.author,
    title: dataDetail?.title ?? "",
    date: dataDetail?.date ?? "",
    reviewedBy: dataDetail?.reviewedBy,
    category: dataDetail?.category,
    images: dataDetail?.images ?? [],
    shareUrl: dataDetail?.shareUrl ?? "",
  };
  if (isMobile) {
    return <DiseaseHeadlineMobile {...newProps} />;
  }
  return <DiseaseHeadlineDesktop {...newProps} />;
}

export function DiseaseHeadlineSkeleton(props: DiseaseHeadlineSkeletonProps) {
  const { isMobile } = props;

  if (isMobile) {
    return <DiseaseHeadlineSkeletonMobile />;
  }
  return <DiseaseHeadlineSkeletonDesktop />;
}
