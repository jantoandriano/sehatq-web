import React from "react";

import { CardiacClinicArticleDesktop } from "./cardiac-clinic-article-desktop";
import { CardiacClinicArticleMobile } from "./cardiac-clinic-article-mobile";

export type CardiacClinicArticleProps = {
  isMobile: boolean;
};

export function CardiacClinicArticle(props: CardiacClinicArticleProps) {
  const { isMobile } = props;

  if (isMobile) {
    return <CardiacClinicArticleMobile />;
  }
  return <CardiacClinicArticleDesktop />;
}
