import React from "react";

import { VStack } from "../../user-interfaces";
import {
  MyPrescriptionCard,
  MyPrescriptionCardSkeleton,
} from "./my-prescription-card";
import { MyPrescriptionCardMobileProps } from "./my-prescription-card-mobile";
import { EmptyMyPrescriptions } from "./empty-my-prescriptions";

export type MyPrescriptionsMobileProps = {
  myPrescriptions: MyPrescriptionCardMobileProps[];
};

export function MyPrescriptionsMobile(props: MyPrescriptionsMobileProps) {
  const { myPrescriptions } = props;
  return myPrescriptions.length ? (
    <VStack spacing="4">
      {myPrescriptions.map((myPrescription) => {
        return (
          <MyPrescriptionCard
            isMobile
            {...myPrescription}
            key={myPrescription.number}
          />
        );
      })}
    </VStack>
  ) : (
    <EmptyMyPrescriptions isMobile />
  );
}

export function MyPrescriptionsSkeletonMobile() {
  return (
    <VStack spacing="4">
      {Array.from(Array(5).keys()).map((index) => {
        return <MyPrescriptionCardSkeleton isMobile key={index} />;
      })}
    </VStack>
  );
}
