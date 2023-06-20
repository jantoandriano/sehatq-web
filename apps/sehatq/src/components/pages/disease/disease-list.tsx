import React from "react";
import { useRouter } from "next/router";
import { DiseaseListMobile } from "./disease-list-mobile";
import { DiseaseListDesktop } from "./disease-list-desktop";

export type DiseaseListPageProps = {
  isMobile: boolean;
};

export function DiseaseListPage(props: DiseaseListPageProps) {
  const { isMobile } = props;
  const router = useRouter();
  const { slugs = [] } = router.query;
  const categorySlug = slugs?.[0]?.length > 1 ? slugs[0] : "";
  const firstCharSlug = slugs?.[0]?.length === 1 ? slugs[0] : slugs[1] ?? "";

  const newProps = {
    categorySlug,
    firstCharSlug,
  };

  if (isMobile) {
    return <DiseaseListMobile {...newProps} />;
  }
  return <DiseaseListDesktop {...newProps} />;
}
