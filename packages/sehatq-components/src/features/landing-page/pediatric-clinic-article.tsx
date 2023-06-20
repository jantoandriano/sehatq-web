import React from "react";

import { PediatricClinicArticleDesktop } from "./pediatric-clinic-article-desktop";
import { PediatricClinicArticleMobile } from "./pediatric-clinic-article-mobile";

export type PediatricClinicArticleProps = {
  isMobile: boolean;
};

export function PediatricClinicArticle(props: PediatricClinicArticleProps) {
  const { isMobile } = props;

  if (isMobile) {
    return <PediatricClinicArticleMobile />;
  }
  return <PediatricClinicArticleDesktop />;
}
