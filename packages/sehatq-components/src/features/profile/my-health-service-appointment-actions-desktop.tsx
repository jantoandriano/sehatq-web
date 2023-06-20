import React from "react";
import { useNavigation } from "@sehatq/utils";
import { Button, Link, VStack } from "../../user-interfaces";
import {
  MyAppointmentCancelationProps,
  MyAppointmentCancelation,
} from "./my-appointment-cancelation";
import { HealthServiceStatusCode } from "./health-service-appointment-constants";

export type MyHealthServiceAppointmentActionsDesktopProps = {
  bookingId: string;
  statusCode: HealthServiceStatusCode;
  serviceTypeSlug: string;
  bookHcfSlug: string;
  mutateCancelationReason?: MyAppointmentCancelationProps["mutateCancelationReason"];
  onSuccessCancelationReason: () => void;
};

export function MyHealthServiceAppointmentActionsDesktop(
  props: MyHealthServiceAppointmentActionsDesktopProps
) {
  const {
    bookingId,
    statusCode,
    bookHcfSlug,
    serviceTypeSlug,
    mutateCancelationReason,
    onSuccessCancelationReason,
  } = props;
  const { Navigate } = useNavigation();
  return (
    <VStack w="100%">
      {statusCode === "done" || statusCode === "attended" ? (
        <Navigate name="EXTERNAL_REVIEW_HEALTH_SERVICE">
          <Link
            fontSize="md"
            colorScheme="main"
            variant="solid"
            height="40px"
            borderRadius="4px"
            w="100%"
            px={2}
          >
            Beri Nilai
          </Link>
        </Navigate>
      ) : null}
      {statusCode === "not-attended" ||
      statusCode === "transfer" ||
      statusCode === "cancelled" ||
      statusCode === "attended" ||
      statusCode === "done" ||
      statusCode === "cancelled-by-hcf" ? (
        <Navigate
          name="HEALTH_SERVICE"
          query={{ hcfSlug: bookHcfSlug, procedure: serviceTypeSlug }}
        >
          <Link
            background="white"
            fontSize="md"
            colorScheme="sea"
            variant="outline"
            height="40px"
            borderRadius="4px"
            w="100%"
            px={2}
          >
            Booking Lagi
          </Link>
        </Navigate>
      ) : null}
      {mutateCancelationReason &&
      (statusCode === "new" ||
        statusCode === "confirmed" ||
        statusCode === "pending") ? (
        <MyAppointmentCancelation
          bookingId={bookingId}
          mutateCancelationReason={mutateCancelationReason}
          onSuccessCancelationReason={onSuccessCancelationReason}
          isMobile={false}
          isButtonFullWidth={true}
        >
          <Button
            background="white"
            fontSize="md"
            colorScheme="brownGrey"
            variant="outline"
            height="40px"
            borderRadius="4px"
            w="100%"
            px={2}
          >
            Batalkan
          </Button>
        </MyAppointmentCancelation>
      ) : null}
    </VStack>
  );
}
