import React from "react";
import {
  VStack,
  Box,
  Flex,
  PrescriptionStatusCard as _PrescriptionStatusCard,
  PrescriptionInfoCard as _PrescriptionInfoCard,
  PrescriptionPatientCard as _PrescriptionPatientCard,
  PrescriptionDoctorCard as _PrescriptionDoctorCard,
  PrescriptionOrderCard as _PrescriptionOrderCard,
  PrescriptionAddressCard as _PrescriptionAddressCard,
  PrescriptionActions as _PrescriptionActions,
  CancelPrescription as _CancelPrescription,
  PrescriptionStatusCode,
} from "@sehatq/components";
import { MyPrescriptionParams } from "@get-props";
import { withQuery } from "@utils";
import { SehatQHeader } from "@components/ui/sehatq-header";
import { MyPrescriptionHead } from "@components/head";

export interface MyPrescriptionMobileProps {
  status?: PrescriptionStatusCode;
}

const PrescriptionStatusCard = withQuery(
  _PrescriptionStatusCard,
  (query: MyPrescriptionParams) => ({
    prescriptionNo: query.prescriptionNo,
  })
);

const PrescriptionInfoCard = withQuery(
  _PrescriptionInfoCard,
  (query: MyPrescriptionParams) => ({
    prescriptionNo: query.prescriptionNo,
  })
);

const PrescriptionPatientCard = withQuery(
  _PrescriptionPatientCard,
  (query: MyPrescriptionParams) => ({
    prescriptionNo: query.prescriptionNo,
  })
);

const PrescriptionDoctorCard = withQuery(
  _PrescriptionDoctorCard,
  (query: MyPrescriptionParams) => ({
    prescriptionNo: query.prescriptionNo,
  })
);

const PrescriptionOrderCard = withQuery(
  _PrescriptionOrderCard,
  (query: MyPrescriptionParams) => ({
    prescriptionNo: query.prescriptionNo,
  })
);

const PrescriptionAddressCard = withQuery(
  _PrescriptionAddressCard,
  (query: MyPrescriptionParams) => ({
    prescriptionNo: query.prescriptionNo,
  })
);

const PrescriptionActions = withQuery(
  _PrescriptionActions,
  (query: MyPrescriptionParams) => ({
    prescriptionNo: query.prescriptionNo,
  })
);

const CancelPrescription = withQuery(
  _CancelPrescription,
  (query: MyPrescriptionParams) => ({
    prescriptionNo: query.prescriptionNo,
  })
);

export function MyPrescriptionMobile(props: MyPrescriptionMobileProps) {
  const { status } = props;
  return (
    <>
      <MyPrescriptionHead />
      <SehatQHeader
        backNavigate={{ name: "PROFILE_PRESCRIPTIONS" }}
        variant="text"
        text="Detail Resep"
      />
      <Box background="iceBlue.500" minHeight="calc(100vh - 86px)" p={4}>
        <VStack spacing={3}>
          <PrescriptionStatusCard isMobile />
          <PrescriptionInfoCard isMobile />
          {status === "purchased" && <PrescriptionOrderCard isMobile />}
          <PrescriptionPatientCard isMobile />
          <PrescriptionDoctorCard isMobile />
          {(status === "requested" || status === "approved") && (
            <PrescriptionAddressCard isMobile />
          )}
        </VStack>
        {status === "created" ? (
          <Flex justify="center" marginTop={5} marginBottom={3}>
            <CancelPrescription />
          </Flex>
        ) : null}
      </Box>
      <PrescriptionActions isMobile />
    </>
  );
}
