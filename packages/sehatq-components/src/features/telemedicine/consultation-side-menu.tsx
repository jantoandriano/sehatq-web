import React from "react";

import { SehatqUserIcon, useImage } from "../../user-interfaces";
import {
  ConsultationSideMenuDesktop,
  ConsultationSideMenuSkeletonDesktop,
} from "./consultation-side-menu-desktop";
import {
  TelemedicineDoctorCache,
  useGetTelemedicineDoctor,
} from "./doctor-queries";

export type ConsultationSideMenuProps = {
  doctorId: string;
};

function selectTelemedicineDoctor(doctor: TelemedicineDoctorCache) {
  const { hospital, rating, ...data } = doctor.data;
  return {
    ...data,
    hospitalName: hospital.name ?? "",
    ratingAverage: rating?.average ?? 0,
    ratingTotal: rating?.count ?? 0,
  };
}

export function ConsultationSideMenu(props: ConsultationSideMenuProps) {
  const { doctorId, ...otherProps } = props;
  const Image = useImage();

  const { data: doctor, isLoading } = useGetTelemedicineDoctor(
    { doctorId },
    { select: selectTelemedicineDoctor }
  );

  const doctorImage = doctor?.photoUrl ? (
    <Image
      alt={doctor.name}
      src={doctor.photoUrl}
      layout="fill"
      objectFit="contain"
      wrapperProps={{
        margin: "0 auto",
        width: "90px",
        height: "90px",
        borderRadius: "45px",
        overflow: "hidden",
      }}
    />
  ) : (
    <SehatqUserIcon boxSize="90px" />
  );

  const newProps = {
    ...otherProps,
    doctor,
    doctorImage,
  };

  if (isLoading) {
    return <ConsultationSideMenuSkeletonDesktop />;
  }

  return <ConsultationSideMenuDesktop {...newProps} />;
}
