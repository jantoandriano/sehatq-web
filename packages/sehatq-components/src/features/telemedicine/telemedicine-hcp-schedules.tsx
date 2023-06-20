import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import {
  useGetTelemedicineHCPScheduleDays,
  TelemedicineHCPScheduleDaysCache,
} from "./telemedicine-hcp-schedule-days-queries";
import {
  TelemedicineHCPSchedulesDesktop,
  TelemedicineHCPSchedulesSkeletonDesktop,
} from "./telemedicine-hcp-schedules-desktop";
import {
  TelemedicineHCPSchedulesMobile,
  TelemedicineHCPSchedulesSkeletonMobile,
} from "./telemedicine-hcp-schedules-mobile";
import { TelemedicineHCPSchedulesItem } from "./doctor-model";

export type TelemedicineHCPSchedulesProps = {
  isMobile?: boolean;
  doctorId: number;
  setDoctorScheduleId: Dispatch<SetStateAction<number | undefined>>;
  setBookingDate: Dispatch<SetStateAction<string | undefined>>;
};

function modelTelemedicineSchedulesTimeCategory(
  data: TelemedicineHCPSchedulesItem["schedules"]
) {
  return [
    // 00:00 - 10:30
    {
      title: "Pagi",
      items: data.filter((item) => replaceTimeToInt(item.startAt) <= 10.3),
    },
    // 11:00 - 14:30
    {
      title: "Siang",
      items: data.filter(
        (item) =>
          replaceTimeToInt(item.startAt) >= 11 &&
          replaceTimeToInt(item.startAt) <= 14.3
      ),
    },
    // 15:00 - 18:30
    {
      title: "Sore",
      items: data.filter(
        (item) =>
          replaceTimeToInt(item.startAt) >= 15 &&
          replaceTimeToInt(item.startAt) <= 18.3
      ),
    },
    // 19:00 - 23:30
    {
      title: "Malam",
      items: data.filter((item) => replaceTimeToInt(item.startAt) >= 19),
    },
  ];
}

function replaceTimeToInt(data: string) {
  return parseFloat(data.replace(":", "."));
}

function selectTelemedicineHCPScheduleDays(
  doctor: TelemedicineHCPScheduleDaysCache
) {
  return doctor.map((items) => ({
    ...items,
    timeCategory: modelTelemedicineSchedulesTimeCategory(items.schedules),
  }));
}

export function TelemedicineHCPSchedules(props: TelemedicineHCPSchedulesProps) {
  const { doctorId, setDoctorScheduleId, setBookingDate, isMobile } = props;

  const {
    data: telemedicineSchedules,
    isError,
    isLoading,
  } = useGetTelemedicineHCPScheduleDays(
    {
      doctorId: `${doctorId}`,
      startDate: "",
      range: 6,
    },
    { select: selectTelemedicineHCPScheduleDays }
  );

  const [selectedSchedule, setSelectedSchedule] = useState<string>(
    telemedicineSchedules?.[0]?.date ?? ""
  );
  const [selectedScheduleId, setSelectedScheduleId] = useState<number>();

  useEffect(() => {
    if (!isError && telemedicineSchedules?.length) {
      setSelectedSchedule(telemedicineSchedules[0].date);
    }
  }, [telemedicineSchedules, isError]);

  if (isLoading)
    return <TelemedicineHCPSchedulesSkeleton isMobile={isMobile} />;

  if (!telemedicineSchedules?.length || isError) return null;

  function onClickDate(date: string) {
    setSelectedScheduleId(undefined);
    setDoctorScheduleId(undefined);
    setSelectedSchedule(date);
  }

  function onClickTime(id: number) {
    setSelectedScheduleId(id);
    setBookingDate(selectedSchedule);
    setDoctorScheduleId(id);
  }

  const otherProps = {
    onClickDate,
    onClickTime,
    selectedSchedule,
    selectedScheduleId,
    telemedicineSchedules,
  };

  if (isMobile) return <TelemedicineHCPSchedulesMobile {...otherProps} />;

  return <TelemedicineHCPSchedulesDesktop {...otherProps} />;
}

export function TelemedicineHCPSchedulesSkeleton(props: {
  isMobile?: boolean;
}) {
  if (props.isMobile) return <TelemedicineHCPSchedulesSkeletonMobile />;
  return <TelemedicineHCPSchedulesSkeletonDesktop />;
}
