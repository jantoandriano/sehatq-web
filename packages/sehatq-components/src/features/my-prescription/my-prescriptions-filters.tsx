import React from "react";

import { PrescriptionStatusFlag } from "../prescription";
import { MyPrescriptionsFiltersMobile } from "./my-prescriptions-filters-mobile";
import { MyPrescriptionsFiltersDesktop } from "./my-prescriptions-filters-desktop";
import {
  MyPrescriptionsCache,
  useGetMyPrescriptions,
} from "./my-prescription-queries";

export type MyPrescriptionsFiltersProps = {
  isMobile?: boolean;
  statusFlag: PrescriptionStatusFlag | "";
};

function selectMyPrescriptionsFilters(myTelemedicines: MyPrescriptionsCache) {
  return myTelemedicines.meta.statusFlags;
}

export function MyPrescriptionsFilters(props: MyPrescriptionsFiltersProps) {
  const { statusFlag = "", isMobile } = props;
  const myPrescriptionsQuery = {
    statusFlag,
    patientName: "",
  };
  const { data: myPrescriptionsFiltersByStatus = [], error } =
    useGetMyPrescriptions(myPrescriptionsQuery, {
      select: selectMyPrescriptionsFilters,
    });

  const otherProps = {
    statusFlag,
    myPrescriptionsFiltersByStatus: error
      ? []
      : myPrescriptionsFiltersByStatus ?? [],
  };
  if (isMobile) {
    return <MyPrescriptionsFiltersMobile {...otherProps} />;
  }
  return <MyPrescriptionsFiltersDesktop {...otherProps} />;
}
