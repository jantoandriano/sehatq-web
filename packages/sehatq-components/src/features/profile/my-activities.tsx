import React from "react";
import { formatDate } from "@sehatq/utils";
import {
  useGetMyLatestTelemedicine,
  MyLatestTelemedicineCache,
} from "./my-telemedicine-queries";
import { MyActivitiesDesktop } from "./my-activities-desktop";
import { MyActivitiesMobile } from "./my-activities-mobile";

export type MyActivitiesProps = {
  isMobile: boolean;
};

function selectTelemedicineItem(cache: MyLatestTelemedicineCache) {
  return {
    id: cache.id,
    statusLabel: cache.status,
    ...(cache.doctor
      ? {
          doctorName: cache.doctor.name,
          doctorImgSrc: cache.doctor.photoUrl,
          doctorSpeciality:
            cache.doctor.speciality.slug === "umum"
              ? `Dokter ${cache.doctor.speciality.name}`
              : `Dokter Spesialis ${cache.doctor.speciality.name}`,
        }
      : {
          doctorName: undefined,
          doctorImgSrc: undefined,
          doctorSpeciality: undefined,
        }),
    startDate: `${formatDate(new Date(cache.startedAt), "dd MMMM yyyy")}`,
    myTelemedicineNavigation: {
      name: cache.payment
        ? ("TELEMED_PAID_CHATS" as const)
        : ("TELEMED_CHATS" as const),
    },
    isActive: cache.status === "booked",
  };
}

export function MyActivities(props: MyActivitiesProps) {
  const { isMobile } = props;
  const { data } = useGetMyLatestTelemedicine({
    select: selectTelemedicineItem,
    staleTime: 0,
    cacheTime: 0,
  });

  if (!data?.doctorName) {
    return null;
  }

  if (isMobile) {
    return (
      <MyActivitiesMobile telemedicineItems={[data]} isMobile={isMobile} />
    );
  }
  return <MyActivitiesDesktop telemedicineItems={[data]} isMobile={isMobile} />;
}
