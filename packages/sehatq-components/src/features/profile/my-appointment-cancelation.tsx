import { FocusableElement } from "@chakra-ui/utils";
import React, { useCallback, useRef, useState } from "react";
import { UseMutateFunction } from "react-query";
import { Text, useDisclosure, useToast } from "../../user-interfaces";
import { CancelMyDoctorAppointmentVariables } from "../my-doctor-appointment/my-doctor-appointments-queries";
import { MyAppointmentCancelationDesktop } from "./my-appointment-cancelation-desktop";
import { MyAppointmentCancelationMobile } from "./my-appointment-cancelation-mobile";
import {
  useGetMyAppointmentCancelationOptions,
  MyAppointmentCancelationOptionsCache,
} from "./my-appointment-cancelation-queries";

export type MyAppointmentCancelationProps = {
  children?: React.ReactNode;
  isMobile?: boolean;
  bookingId: string;
  isButtonFullWidth?: boolean;
  mutateCancelationReason: UseMutateFunction<
    {
      message: string;
    },
    {
      url: string | undefined;
      message: string;
      status: number | null;
      clientId: string;
    },
    CancelMyDoctorAppointmentVariables,
    unknown
  >;
  onSuccessCancelationReason: () => void;
};

export function MyAppointmentCancelation(props: MyAppointmentCancelationProps) {
  const {
    isMobile,
    bookingId,
    mutateCancelationReason,
    onSuccessCancelationReason,
    ...otherProps
  } = props;
  const {
    isOpen: isOpenReasonOptions,
    onOpen: onOpenReasonOptions,
    onClose: onCloseReasonOptions,
  } = useDisclosure();
  const {
    isOpen: isOpenAlertCancelation,
    onOpen: onOpenAlertCancelation,
    onClose: onCloseAlertCancelation,
  } = useDisclosure();
  const [selectedOptionReason, setSelectedOptionReason] = useState("");
  const alertCancelationRef = useRef<FocusableElement>();
  const [selectedReason, setSelectedReason] = useState("");
  const [isLoadingAlertCancelation, setIsLoadingAlertCancelation] =
    useState(false);

  const toast = useToast();

  const selectCancelationReasons = useCallback(
    (response: MyAppointmentCancelationOptionsCache) => {
      const otherOption = {
        name: "Lainnya",
      };

      return [...response, otherOption].map((item) => {
        return {
          element: (
            <Text
              {...(selectedOptionReason === item.name && { color: "sea.500" })}
              {...(isMobile && { fontSize: "sm" })}
            >
              {item.name}
            </Text>
          ),
          value: item.name,
        };
      });
    },
    [selectedOptionReason, isMobile]
  );
  const { data: cancelationReasonsOptions = [] } =
    useGetMyAppointmentCancelationOptions(selectCancelationReasons);

  function onChangeOptionReason(option: string) {
    setSelectedOptionReason(option);
    setSelectedReason(option === "Lainnya" ? "" : option);
  }

  function onChangeOtherOption(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setSelectedReason(e.target.value);
  }

  function onSubmitOptionReason(e: React.FormEvent) {
    e.preventDefault();
    if (validationSubmitCancelationReason()) {
      onOpenAlertCancelation();
      onCloseReasonOptions();
    }
  }

  function validationSubmitCancelationReason() {
    if (!selectedReason) {
      toast({
        message: "Alasan belum diisi",
        status: "error",
      });
      return false;
    }

    return true;
  }

  function onClearCancelationReason(isSuccess = true) {
    if (isSuccess) {
      onCloseReasonOptions();
    }
    onCloseAlertCancelation();
    setIsLoadingAlertCancelation(false);
  }

  function onConfirmAlertCancelation() {
    setIsLoadingAlertCancelation(true);
    mutateCancelationReason(
      {
        bookingId,
        reasonCancel: selectedReason,
      },
      {
        onError: () => {
          onClearCancelationReason(false);
        },
        onSuccess: () => {
          onClearCancelationReason();
          onSuccessCancelationReason();
        },
      }
    );
  }

  function onAbortAlertCancelation() {
    if (!isLoadingAlertCancelation) {
      onCloseAlertCancelation();
      onOpenReasonOptions();
    }
  }

  const cancelationReasonProps = {
    ...otherProps,
    setSelectedReason,
    selectedReason,
    selectedOptionReason,
    onChangeOptionReason,
    cancelationReasonsOptions,
    onSubmitOptionReason,
    isOpenReasonOptions,
    onOpenReasonOptions,
    onCloseReasonOptions,
    alertCancelationRef,
    isOpenAlertCancelation,
    onConfirmAlertCancelation,
    onChangeOtherOption,
    isLoadingAlertCancelation,
    onAbortAlertCancelation,
  };

  if (isMobile) {
    return <MyAppointmentCancelationMobile {...cancelationReasonProps} />;
  }
  return <MyAppointmentCancelationDesktop {...cancelationReasonProps} />;
}
