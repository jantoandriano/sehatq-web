import React from "react";
import { useRouter } from "next/router";
import { PrescriptionCache, useGetPrescription } from "@sehatq/components";
import { MyPrescriptionDesktop } from "./my-prescription-desktop";
import { MyPrescriptionMobile } from "./my-prescription-mobile";

export type MyPrescriptionProps = { isMobile: boolean };

function selectPrescriptionStatus(cache: PrescriptionCache) {
  const { status } = cache.data;
  return status.id;
}

export function MyPrescription(props: MyPrescriptionProps) {
  const { isMobile } = props;
  const router = useRouter();
  const { prescriptionNo } = router.query;

  const query = {
    prescriptionNo: `${prescriptionNo}` ?? "",
  };

  const { data: prescriptionStatus } = useGetPrescription(query, {
    select: selectPrescriptionStatus,
  });

  if (isMobile) {
    return <MyPrescriptionMobile status={prescriptionStatus} />;
  }
  return <MyPrescriptionDesktop status={prescriptionStatus} />;
}
