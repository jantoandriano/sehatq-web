import React, { useState } from "react";
import { useRouter } from "next/router";
import {
  TelemedicineDoctorCache,
  useGetTelemedicineDoctor,
} from "@sehatq/components";
import { TelemedicineHCPSchedulesDesktop } from "./telemedicine-hcp-schedules-desktop";
import { TelemedicineHCPSchedulesMobile } from "./telemedicine-hcp-schedules-mobile";

export type TelemedicineLandingProps = {
  isMobile?: boolean;
};

function selectTelemedicineDoctorId(doctor: TelemedicineDoctorCache) {
  return `${doctor.data.id}`;
}

export function TelemedicineHCPSchedules(props: TelemedicineLandingProps) {
  const { isMobile } = props;
  const router = useRouter();
  const { slug, doctorRecommendationId } = router.query;
  const [doctorScheduleId, setDoctorScheduleId] = useState<
    number | undefined
  >();
  const [bookingDate, setBookingDate] = useState<string | undefined>();

  const { data: doctorId } = useGetTelemedicineDoctor(
    { doctorId: slug as string },
    { select: selectTelemedicineDoctorId }
  );

  const otherProps = {
    doctorSlug: slug as string,
    doctorId: Number(doctorId),
    doctorScheduleId,
    bookingDate,
    setDoctorScheduleId,
    setBookingDate,
    doctorRecommendationId: `${doctorRecommendationId}`,
  };

  if (isMobile) return <TelemedicineHCPSchedulesMobile {...otherProps} />;

  return <TelemedicineHCPSchedulesDesktop {...otherProps} />;
}
