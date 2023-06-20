import React from "react";
import { VStack, BadgeProps } from "../../user-interfaces";
import { PatientInfoCard } from "./patient-info-card";
import { MyHealthServiceAppointmentInfoCard } from "./my-health-service-appointment-info-card";
import { MyHealthServiceAppointmentActions } from "./my-health-service-appointment-actions";
import { HealthServiceStatusCode } from "./health-service-appointment-constants";
import { MyAppointmentCancelationProps } from "./my-appointment-cancelation";

export interface MyHealthServiceAppointmentDesktopProps {
  bookingId?: string;
  createdAt?: string;
  status?: {
    id: HealthServiceStatusCode;
    label: string;
    color: BadgeProps["colorScheme"];
  };
  patientName?: string;
  patientDob?: string;
  patientAddress?: string;
  patientPhone?: string;
  packageName?: string;
  procedureName?: string;
  procedureSlug?: string;
  scheduleDate?: string;
  scheduleTime?: string;
  hcfName?: string;
  hcfSlug?: string;
  price?: string;
  id: string;
  mutateCancelationReason?: MyAppointmentCancelationProps["mutateCancelationReason"];
  onSuccessCancelationReason: () => void;
}

export function MyHealthServiceAppointmentDesktop(
  props: MyHealthServiceAppointmentDesktopProps
) {
  const {
    mutateCancelationReason,
    onSuccessCancelationReason,
    id,
    status,
    procedureSlug = "-",
    hcfSlug = "-",
    bookingId = "-",
    createdAt = "-",
    patientName = "-",
    patientDob = "-",
    patientAddress = "-",
    patientPhone = "-",
    packageName = "-",
    procedureName = "-",
    scheduleDate = "-",
    scheduleTime = "-",
    hcfName = "-",
    price = "-",
  } = props;
  return (
    <>
      {status ? (
        <VStack spacing={5}>
          <PatientInfoCard
            status={status}
            isMobile={false}
            bookingId={bookingId}
            createdAt={createdAt}
            patientName={patientName}
            patientDob={patientDob}
            patientAddress={patientAddress}
            patientPhone={patientPhone}
          />
          <MyHealthServiceAppointmentInfoCard
            bookingId={bookingId}
            packageName={packageName}
            procedureName={procedureName}
            createdAt={createdAt}
            scheduleDate={scheduleDate}
            scheduleTime={scheduleTime}
            hcfName={hcfName}
            price={price}
            isMobile={false}
          />
          {mutateCancelationReason ? (
            <MyHealthServiceAppointmentActions
              isMobile={false}
              bookingId={id}
              statusCode={status.id}
              serviceTypeSlug={procedureSlug}
              bookHcfSlug={hcfSlug}
              mutateCancelationReason={mutateCancelationReason}
              onSuccessCancelationReason={onSuccessCancelationReason}
            />
          ) : null}
        </VStack>
      ) : null}
    </>
  );
}
