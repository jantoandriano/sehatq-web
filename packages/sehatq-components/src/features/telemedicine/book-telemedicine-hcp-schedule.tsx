import React from "react";
import { useNavigation } from "@sehatq/utils";
import { useGetProfile } from "../profile";
import { HStack, Text, useToast, WarningIcon } from "../../user-interfaces";
import { useSubmitBookTelemedicineHCPSchedule } from "./doctor-queries";
import { BookTelemedicineHCPScheduleDesktop } from "./book-telemedicine-hcp-schedule-desktop";
import { BookTelemedicineHCPScheduleMobile } from "./book-telemedicine-hcp-schedule-mobile";

export type BookTelemedicineHCPScheduleProps = {
  isMobile?: boolean;
  doctorId: number;
  doctorScheduleId?: string | number;
  bookingDate?: string;
  doctorRecommendationId?: string;
};

export function BookTelemedicineHCPSchedule(
  props: BookTelemedicineHCPScheduleProps
) {
  const { navigate } = useNavigation();
  const {
    isMobile,
    doctorId,
    doctorScheduleId,
    bookingDate,
    doctorRecommendationId,
  } = props;
  const mutateBookTelemedHCPSchedule = useSubmitBookTelemedicineHCPSchedule();
  const { isSuccess } = useGetProfile();
  const toast = useToast();

  function onClickBook() {
    if (!bookingDate || !doctorScheduleId) {
      toast({
        message: (
          <HStack>
            <WarningIcon color="white" />
            <Text fontSize={isMobile ? "sm" : "md"} color="white">
              Silahkan pilih jadwal terlebih dahulu
            </Text>
          </HStack>
        ),
        status: "error",
        position: "top",
        wrapperProps: {
          mt: "130px",
          background: "#D63B3B",
          borderRadius: "lg",
        },
        isHideCloseButton: true,
      });
      return;
    }
    if (!isSuccess) {
      navigate("EXTERNAL_LOGIN");
      return;
    }

    if (doctorId && bookingDate && doctorScheduleId) {
      mutateBookTelemedHCPSchedule.mutate(
        {
          doctorId: doctorId,
          doctorScheduleId: Number(doctorScheduleId),
          bookingDate,
          doctorRecommendationId,
        },
        {
          onSuccess: (res: { data: { paymentPageUrl: string } }) => {
            navigate(res.data.paymentPageUrl);
          },
        }
      );
    }
    return false;
  }

  const otherProps = {
    isLoading: mutateBookTelemedHCPSchedule.isLoading,
    onClickBook,
    isLogin: isSuccess,
  };

  if (isMobile) return <BookTelemedicineHCPScheduleMobile {...otherProps} />;

  return <BookTelemedicineHCPScheduleDesktop {...otherProps} />;
}
