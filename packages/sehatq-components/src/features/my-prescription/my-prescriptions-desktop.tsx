import React from "react";
import { Box, VStack } from "../../user-interfaces";
import { EmptyMyPrescriptions } from "./empty-my-prescriptions";
import {
  MyPrescriptionCard,
  MyPrescriptionCardSkeleton,
} from "./my-prescription-card";
import { MyPrescriptionCardDesktopProps } from "./my-prescription-card-desktop";

export type MyPrescriptionsDesktopProps = {
  myPrescriptions: MyPrescriptionCardDesktopProps[];
};

export function MyPrescriptionsDesktop(props: MyPrescriptionsDesktopProps) {
  const { myPrescriptions } = props;
  return myPrescriptions.length ? (
    <VStack spacing="5">
      {myPrescriptions.map((myPrescription) => {
        return (
          <MyPrescriptionCard
            isMobile={false}
            {...myPrescription}
            key={myPrescription.number}
          />
        );
      })}
    </VStack>
  ) : (
    <Box pt="3">
      <EmptyMyPrescriptions />
    </Box>
  );
}

export function MyPrescriptionsSkeletonDesktop() {
  return (
    <VStack spacing="5">
      {Array.from(Array(8).keys()).map((index) => {
        return <MyPrescriptionCardSkeleton key={index} />;
      })}
    </VStack>
  );
}
