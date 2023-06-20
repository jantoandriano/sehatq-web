import React from "react";

import { PrescriptionStatusFlag } from "../prescription";
import {
  MyPrescriptionsCache,
  useGetMyPrescriptions,
} from "./my-prescription-queries";
import {
  MyPrescriptionsDesktop,
  MyPrescriptionsSkeletonDesktop,
} from "./my-prescriptions-desktop";
import {
  MyPrescriptionsMobile,
  MyPrescriptionsSkeletonMobile,
} from "./my-prescriptions-mobile";

export type MyPrescriptionsProps = {
  isMobile?: boolean;
  statusFlag: PrescriptionStatusFlag | "";
};

function selectMyPrescriptions(myPrescriptions: MyPrescriptionsCache) {
  return myPrescriptions.data.map((myPrescription) => {
    return {
      number: myPrescription.number,
      source: myPrescription.source,
      updatedAt: myPrescription.updatedAt,
      createdAt: myPrescription.createdAt,
      patientName: myPrescription.patient.name || "-",
      numberOfDrug: myPrescription.products.total,
      status: myPrescription.status.id,
    };
  });
}

export function MyPrescriptions(props: MyPrescriptionsProps) {
  const { isMobile, statusFlag = "" } = props;

  const myPrescriptionsQuery = {
    statusFlag,
    patientName: "",
  };

  const {
    data: myPrescriptions = [],
    isLoading,
    error,
  } = useGetMyPrescriptions(myPrescriptionsQuery, {
    select: selectMyPrescriptions,
  });

  if (isLoading) {
    if (isMobile) return <MyPrescriptionsSkeletonMobile />;
    return <MyPrescriptionsSkeletonDesktop />;
  }

  const otherProps = {
    myPrescriptions: error ? [] : myPrescriptions ?? [],
  };

  if (isMobile) return <MyPrescriptionsMobile {...otherProps} />;

  return <MyPrescriptionsDesktop {...otherProps} />;
}
