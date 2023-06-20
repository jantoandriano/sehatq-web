import React from "react";
import { mappingSpecialityName, priceFormat } from "@sehatq/utils";

import {
  TelemedicineHcpProfileCardMobile,
  TelemedicineHcpProfileCardSkeletonMobile,
} from "./telemedicine-hcp-profile-card-mobile";
import {
  TelemedicineHcpProfileCardDesktop,
  TelemedicineHcpProfileCardSkeletonDesktop,
} from "./telemedicine-hcp-profile-card-desktop";
import {
  TelemedicineDoctorCache,
  useGetTelemedicineDoctor,
} from "./doctor-queries";

export type TelemedicineHcpProfileCardProps = {
  isMobile?: boolean;
  doctorSlug: string;
};

function selectTelemedicineDoctor(doctor: TelemedicineDoctorCache) {
  const { specialityName, consultationFee, displayPrice, ...data } =
    doctor.data;
  return {
    ...data,
    specialityName: mappingSpecialityName(specialityName),
    consultationFee: priceFormat(consultationFee),
    displayPrice: displayPrice ? priceFormat(displayPrice) : "",
  };
}

export function TelemedicineHcpProfileCard(
  props: TelemedicineHcpProfileCardProps
) {
  const { isMobile, doctorSlug, ...otherProps } = props;

  const { data: doctor, isLoading } = useGetTelemedicineDoctor(
    { doctorId: doctorSlug },
    { select: selectTelemedicineDoctor }
  );

  let messageHCPSchedule = null;
  if (doctor?.isPrivateChannel && doctor?.isBookingChannel) {
    messageHCPSchedule =
      "Dokter belum bisa melayani konsultasi. Aktifkan pengingat jadwal berikutnya atau buat jadwal chat.";
  } else if (doctor?.isBookingChannel) {
    messageHCPSchedule =
      "Dokter belum bisa melayani konsultasi. Silakan pilih jadwal lain untuk chat dengan dokter.";
  } else if (doctor?.isPrivateChannel) {
    messageHCPSchedule =
      "Dokter belum bisa melayani konsultasi. Aktifkan pengingat saat dokter kembali online.";
  }

  const newProps = {
    ...otherProps,
    doctor,
    messageHCPSchedule,
  };

  if (isLoading)
    return <TelemedicineHcpProfileCardSkeleton isMobile={isMobile} />;

  if (isMobile) {
    return <TelemedicineHcpProfileCardMobile {...newProps} />;
  }
  return <TelemedicineHcpProfileCardDesktop {...newProps} />;
}

export type TelemedicineHcpProfileCardSkeletonProps = {
  isMobile?: boolean;
};

export function TelemedicineHcpProfileCardSkeleton(
  props: TelemedicineHcpProfileCardSkeletonProps
) {
  if (props.isMobile) return <TelemedicineHcpProfileCardSkeletonMobile />;
  return <TelemedicineHcpProfileCardSkeletonDesktop />;
}
