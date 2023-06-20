import React from "react";
import {
  ConsultationProductsInfoDesktop,
  ConsultationProductsInfoDesktopSkeleton,
} from "./consultation-products-info-desktop";
import {
  ConsultationProductsInfoMobile,
  ConsultationProductsInfoMobileSkeleton,
} from "./consultation-products-info-mobile";
import {
  ConsultationProductsInfoCache,
  useGetConsultationProductsInfo,
} from "./consultation-products-info-queries";

export type ConsultationProductsInfoProps = {
  isMobile?: boolean;
  consultationId: string;
};

function selectProductsInfo(cache: ConsultationProductsInfoCache) {
  return cache.data.map((item) => item.name);
}

export function ConsultationProductsInfo(props: ConsultationProductsInfoProps) {
  const { data, isLoading } = useGetConsultationProductsInfo(
    { consultationId: props.consultationId },
    { select: selectProductsInfo }
  );

  if (isLoading) {
    return <ConsultationProductsInfoSkeleton isMobile={props.isMobile} />;
  }

  if (!data || !data.length) {
    return null;
  }

  if (props.isMobile)
    return <ConsultationProductsInfoMobile prescriptions={data} />;
  return <ConsultationProductsInfoDesktop prescriptions={data} />;
}

export type ConsultationProductsInfoSkeletonProps = {
  isMobile?: boolean;
};

export function ConsultationProductsInfoSkeleton(
  props: ConsultationProductsInfoSkeletonProps
) {
  if (props.isMobile) return <ConsultationProductsInfoMobileSkeleton />;
  return <ConsultationProductsInfoDesktopSkeleton />;
}
