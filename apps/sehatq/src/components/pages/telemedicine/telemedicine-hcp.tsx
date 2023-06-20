import React from "react";
import { useRouter } from "next/router";
import {
  TelemedicineDoctorCache,
  useGetTelemedicineDoctor,
  useGetTelemedicineHCPNextSchedule,
  TelemedicineHCPNextScheduleCache,
} from "@sehatq/components";
import { getFCMToken } from "@libs/firebase-cloud-messaging";
import { TelemedicineHCPMobile } from "./telemedicine-hcp-mobile";
import { TelemedicineHCPDesktop } from "./telemedicine-hcp-desktop";

export type TelemedicineHCPProps = {
  isMobile: boolean;
};

function selectDoctorId(cache: TelemedicineDoctorCache) {
  return {
    id: cache.data.id,
    isPrivateChannel: cache.data.isPrivateChannel,
    isBookingChannel: cache.data.isBookingChannel,
    indicator: cache.data.indicator,
  };
}

function selectHasNextSchedule(
  doctorNextSchedule: TelemedicineHCPNextScheduleCache
) {
  return (
    doctorNextSchedule &&
    doctorNextSchedule.schedules &&
    doctorNextSchedule.schedules.length > 0
  );
}

export function TelemedicineHCP(props: TelemedicineHCPProps) {
  const { isMobile } = props;
  const router = useRouter();
  const { slug, doctorRecommendationId } = router.query;

  const query = {
    doctorId: `${slug}` ?? "",
  };

  const { data: doctor = null } = useGetTelemedicineDoctor(query, {
    select: selectDoctorId,
  });

  const queryNextSchedule = {
    doctorId: `${doctor?.id}`,
  };
  const { data: hasDoctorNextSchedule } = useGetTelemedicineHCPNextSchedule(
    queryNextSchedule,
    {
      select: selectHasNextSchedule,
    }
  );

  async function getNotificationToken() {
    return getFCMToken(true);
  }

  const otherProps = {
    isMobile,
    doctorSlug: `${slug}`,
    isPrivateChannel: doctor?.isPrivateChannel,
    isBookingChannel: doctor?.isBookingChannel,
    hasDoctorNextSchedule,
    getNotificationToken,
    indicator: doctor?.indicator,
    doctorRecommendationId: `${doctorRecommendationId}`,
  };

  if (isMobile) return <TelemedicineHCPMobile {...otherProps} />;

  return <TelemedicineHCPDesktop {...otherProps} />;
}
