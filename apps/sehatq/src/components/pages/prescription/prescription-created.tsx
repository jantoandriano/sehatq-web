import React from "react";
import { useRouter } from "next/router";
import { PrescriptionCreatedDesktop } from "./prescription-created-desktop";
import { PrescriptionCreatedMobile } from "./prescription-created-mobile";

export type ArticleListPageProps = {
  isMobile: boolean | null;
};

export function PrescriptionCreated(props: ArticleListPageProps) {
  const { isMobile } = props;
  const router = useRouter();
  const { prescriptionNo } = router.query;

  if (isMobile) {
    return (
      <PrescriptionCreatedMobile prescriptionNo={prescriptionNo as string} />
    );
  }
  return (
    <PrescriptionCreatedDesktop prescriptionNo={prescriptionNo as string} />
  );
}
