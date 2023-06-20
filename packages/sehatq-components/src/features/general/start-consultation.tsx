import React, { useState } from "react";
import { useNavigation } from "@sehatq/utils";
import { ButtonProps, useDisclosure } from "../../user-interfaces";

import { useGetProfile } from "../profile";
import { useSubmitConsultationCheckout } from "../telemedicine/consultation-queries";
import { StartConsultationMobile } from "./start-consultation-mobile";
import { StartConsultationDesktop } from "./start-consultation-desktop";

export type StartConsultationProps = {
  isMobile?: boolean;
  doctorId: number;
  doctorSlug: string;
  indicator: string;
  isPrivateChannel?: boolean;
  isBookingChannel?: boolean;
  buttonProps?: ButtonProps;
};

export function StartConsultation(props: StartConsultationProps) {
  const { navigate } = useNavigation();
  const {
    isMobile,
    doctorId,
    doctorSlug,
    isPrivateChannel,
    isBookingChannel,
    indicator,
    buttonProps,
  } = props;
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [stateCheckedValue, setStateCheckedValue] = useState("");
  const submitConsultationRatingMutation = useSubmitConsultationCheckout();
  const { isSuccess } = useGetProfile();

  function onStartConsultation() {
    if (isPrivateChannel && indicator === "green") {
      onOpen();
    } else if (isBookingChannel) {
      navigate("TELEMED_HCP_SCHEDULES", {
        slug: doctorSlug,
      });
    } else {
      navigate("TELEMED_HCP_PROFILE", {
        slug: doctorSlug,
      });
    }
  }

  function onSubmitConsultationCheckout() {
    if (isSuccess) {
      if (isMobile || stateCheckedValue === "walkin") {
        const body = {
          doctorId,
        };
        submitConsultationRatingMutation.mutate(body, {
          onSuccess: (data) => {
            const { paymentPageUrl } = data.data;
            onStartConsultation();
            navigate(paymentPageUrl);
          },
        });
      }
    } else {
      navigate("EXTERNAL_LOGIN");
    }
    if (!isMobile && stateCheckedValue === "booking") {
      onStartConsultation();
      navigate("TELEMED_HCP_SCHEDULES", {
        slug: doctorSlug,
      });
    }
  }

  function onChooseConsultation(option: string) {
    setStateCheckedValue(option);
  }

  const newProps = {
    isOpen,
    onClose,
    doctorSlug,
    stateCheckedValue,
    onChooseConsultation,
    onStartConsultation,
    onSubmitConsultationCheckout,
    isLoading: submitConsultationRatingMutation.isLoading,
    canBook: isBookingChannel ?? false,
    buttonProps: {
      ...buttonProps,
      ...(isPrivateChannel && indicator === "green"
        ? ({
            variant: "solid",
            colorScheme: "main",
          } as const)
        : ({
            variant: "outline" as const,
            color: "sea.500",
            borderColor: "main.500",
            background: "white",
          } as const)),
      children:
        isPrivateChannel && indicator === "green"
          ? "Mulai Chat"
          : isBookingChannel
          ? "Buat Jadwal"
          : "Lihat Profil",
    },
  };

  if (isMobile) {
    return <StartConsultationMobile {...newProps} />;
  }
  return <StartConsultationDesktop {...newProps} />;
}
