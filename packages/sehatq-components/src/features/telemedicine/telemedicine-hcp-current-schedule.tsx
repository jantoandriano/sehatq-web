import React, { useState } from "react";
import {
  formatDate,
  translateDay,
  parseToDate,
  useNavigation,
} from "@sehatq/utils";

import { useToast } from "../../user-interfaces";
import { useRegisterFCMToken } from "../profile/profile-queries";
import {
  TelemedicineHCPCurrentScheduleMobile,
  TelemedicineHCPCurrentScheduleMobileSkeleton,
} from "./telemedicine-hcp-current-schedule-mobile";
import {
  TelemedicineHCPCurrentScheduleDesktop,
  TelemedicineHCPCurrentScheduleDesktopSkeleton,
} from "./telemedicine-hcp-current-schedule-desktop";
import {
  TelemedicineDoctorCache,
  useGetTelemedicineDoctor,
} from "./doctor-queries";
import {
  TelemedicineHCPNextScheduleCache,
  useGetTelemedicineHCPNextSchedule,
  useAddTelemedicineReminder,
  useDeleteTelemedicineReminder,
} from "./telemedicine-hcp-next-schedule-queries";

export type TelemedicineHCPCurrentScheduleProps = {
  isMobile?: boolean;
  getNotificationToken?: () => Promise<
    | {
        data: string | null;
        error: string | null;
      }
    | undefined
  >;
  doctorSlug: string;
};

function selectTelemedicineDoctor(cache: TelemedicineDoctorCache) {
  return {
    id: cache.data.id,
    indicator: cache.data.indicator,
    experience: cache.data.experience,
    ratingAverage: cache.data.rating?.average ?? 0,
    ratingTotal: cache.data.rating?.count ?? 0,
    isPrivateChannel: cache.data.isPrivateChannel,
    isBookingChannel: cache.data.isBookingChannel,
    doctorSlug: cache.data.slug,
    hasReminder: cache.data.hasReminder,
  };
}

function selectTelemedicineHCPNextSchedule(
  doctorNextSchedule: TelemedicineHCPNextScheduleCache
) {
  const { day, date, ...data } = doctorNextSchedule;
  const dateParse = formatDate(parseToDate(date, "yyyy-MM-dd"), "dd MMM yyyy");
  return {
    ...data,
    day: `${translateDay(day).toLocaleLowerCase()}`,
    date: `${dateParse}`,
  };
}

export function TelemedicineHCPCurrentSchedule(
  props: TelemedicineHCPCurrentScheduleProps
) {
  const { isMobile, doctorSlug, getNotificationToken } = props;
  const [isInitializing, setIsInitializing] = useState(false);
  const toast = useToast();
  const { navigate } = useNavigation();

  const { data: doctor, refetch } = useGetTelemedicineDoctor(
    { doctorId: doctorSlug },
    { select: selectTelemedicineDoctor }
  );
  const { mutate: registerFCMToken } = useRegisterFCMToken();
  const { mutate: addTelemedicineReminder, isLoading: isAdding } =
    useAddTelemedicineReminder();
  const { mutate: deleteTelemedicineReminder, isLoading: isDeleting } =
    useDeleteTelemedicineReminder();
  const { data: doctorNextSchedule, isLoading: isRegistering } =
    useGetTelemedicineHCPNextSchedule(
      { doctorId: `${doctor?.id}` },
      {
        select: selectTelemedicineHCPNextSchedule,
        enabled: Boolean(doctor?.id),
      }
    );

  if (!doctorNextSchedule || !doctor) {
    return <TelemedicineHCPCurrentScheduleSkeleton isMobile={isMobile} />;
  }

  async function remindMe() {
    if (doctor?.id) {
      if ("Notification" in window && Notification.permission === "granted") {
        addTelemedicineReminder(
          { doctorId: doctor.id },
          { onSuccess: () => refetch() }
        );
      } else if (getNotificationToken) {
        setIsInitializing(true);
        const result = await getNotificationToken();
        setIsInitializing(false);
        if (result?.data) {
          registerFCMToken(
            { registrationToken: result.data },
            {
              onSuccess: () =>
                addTelemedicineReminder(
                  { doctorId: doctor.id },
                  { onSuccess: () => refetch() }
                ),
            }
          );
        } else if (result?.error) {
          toast({
            id: "remind-me",
            status: "error",
            message: result.error,
          });
        }
      } else {
        toast({
          id: "remind-me",
          status: "error",
          message: "Browser tidak mendukung pengingat.",
        });
      }
    } else {
      navigate("EXTERNAL_LOGIN");
    }
  }

  function unRemindMe() {
    if (doctor?.id) {
      deleteTelemedicineReminder(
        { doctorId: doctor.id },
        { onSuccess: () => refetch() }
      );
    }
  }

  const dataNextSchedule = {
    title:
      doctor?.indicator === "green"
        ? "Jadwal Chat Saat Ini"
        : doctor?.indicator === "grey"
        ? "Jadwal Chat Berikutnya"
        : "",
    data: doctorNextSchedule,
  };
  const newProps = {
    remindMe,
    unRemindMe,
    dataNextSchedule,
    isLoading: isInitializing || isAdding || isDeleting || isRegistering,
    hasReminder: doctor.hasReminder,
    showRemindMeButton: doctor.indicator === "grey",
  };

  if (isMobile) {
    return <TelemedicineHCPCurrentScheduleMobile {...newProps} />;
  }
  return <TelemedicineHCPCurrentScheduleDesktop {...newProps} />;
}

export function TelemedicineHCPCurrentScheduleSkeleton(props: {
  isMobile?: boolean;
}) {
  const { isMobile } = props;

  if (isMobile) {
    return <TelemedicineHCPCurrentScheduleMobileSkeleton />;
  }
  return <TelemedicineHCPCurrentScheduleDesktopSkeleton />;
}
