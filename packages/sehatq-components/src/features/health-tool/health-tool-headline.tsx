import React, { ReactElement } from "react";
import { useGetHealthToolDetail } from "@sehatq/components";
import { HealthToolDetailCache } from "../health-tool/health-tool-queries";
import {
  HealthToolHeadlineDesktop,
  HealthToolHeadlineScheletonDesktop,
} from "./health-tool-headline-desktop";
import {
  HealthToolHeadlineMobile,
  HealthToolHeadlineScheletonMobile,
} from "./health-tool-headline-mobile";

export type HealthToolHeadlineProps = {
  isMobile: boolean;
  slug: string;
  children?: ReactElement;
};

function selectHeadline(data: HealthToolDetailCache) {
  return {
    title: data.data.title,
    description: data.data.description,
    backgroundImageMobile: data.data.typeform?.backgroundImageMobile,
    leftImage: data.data.typeform?.leftImage,
    leftImageUrl: data.data.typeform?.leftImageUrl,
    rightImage: data.data.typeform?.rightImage,
    rightImageUrl: data.data.typeform?.rightImageUrl,
    backgroundImage: data.data.typeform?.backgroundImage,
  };
}

export function HealthToolHeadline(props: HealthToolHeadlineProps) {
  const { isMobile, slug, children } = props;
  const { data: healthTool, isLoading } = useGetHealthToolDetail(
    {
      idOrSlugOrFormcode: slug,
    },
    { select: selectHeadline }
  );

  const newProps = {
    title: healthTool?.title ?? "",
    description: healthTool?.description ?? "",
    backgroundImageMobile: healthTool?.backgroundImageMobile ?? "",
    leftImage: healthTool?.leftImage ?? "",
    leftImageUrl: healthTool?.leftImageUrl ?? "",
    rightImage: healthTool?.rightImage ?? "",
    rightImageUrl: healthTool?.rightImageUrl ?? "",
    backgroundImage: healthTool?.backgroundImage ?? "",
    children,
  };

  if (isLoading) {
    <HealthToolHeadlineSkeleton isMobile={isMobile} />;
  }

  if (isMobile) {
    return <HealthToolHeadlineMobile {...newProps} />;
  }
  return <HealthToolHeadlineDesktop {...newProps} />;
}

export function HealthToolHeadlineSkeleton(props: { isMobile: boolean }) {
  const { isMobile } = props;
  if (isMobile) {
    return <HealthToolHeadlineScheletonMobile />;
  }
  return <HealthToolHeadlineScheletonDesktop />;
}
