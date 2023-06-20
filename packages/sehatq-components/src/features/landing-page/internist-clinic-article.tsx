import React from "react";

import { InternistClinicArticleDesktop } from "./internist-clinic-article-desktop";
import { InternistClinicArticleMobile } from "./internist-clinic-article-mobile";

export type InternistClinicArticleProps = {
  isMobile: boolean;
};

export function InternistClinicArticle(props: InternistClinicArticleProps) {
  const { isMobile } = props;

  if (isMobile) {
    return <InternistClinicArticleMobile />;
  }
  return <InternistClinicArticleDesktop />;
}
