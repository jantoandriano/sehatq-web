import React from "react";
import { useRouter } from "next/router";
import { ConsultationCache, useGetConsultation } from "@sehatq/components";
import { formatDate, parseToDate } from "@sehatq/utils";
import { ConsultationFormPageMobile } from "./consultation-form-mobile";
import { ConsultationFormPageDesktop } from "./consultation-form-desktop";

export type ConsultationFormPageProps = {
  isMobile: boolean;
};

function selectConsultation(cache: ConsultationCache) {
  return cache.data;
}

export function ConsultationFormPage(props: ConsultationFormPageProps) {
  const { isMobile } = props;
  const router = useRouter();
  const { consultationId } = router.query;

  const { data } = useGetConsultation(
    {
      consultationId: consultationId as string,
    },
    {
      select: selectConsultation,
    }
  );

  const bookingDate = data?.booking?.bookingStartAt
    ? parseToDate(data.booking.bookingStartAt, "yyyy-MM-dd HH:mm:ss")
    : undefined;

  const newProps = {
    consultationId: consultationId as string,
    isShowNikAndAddress: [8, 11, 12, 17, 18].includes(
      data?.doctor?.hospital?.id ?? 0
    ),
    type: data?.booking ? ("booking" as const) : ("walk-in" as const),
    doctorId: data?.doctor?.id ? `${data?.doctor?.id}` : "",
    scheduleDay: bookingDate
      ? formatDate(bookingDate, "EEEE, dd MMM yyyy")
      : "",
    scheduleTime: bookingDate ? formatDate(bookingDate, "HH:mm a") : "",
    duration: data?.duration,
  };

  if (isMobile) {
    return <ConsultationFormPageMobile {...newProps} />;
  }
  return <ConsultationFormPageDesktop {...newProps} />;
}
