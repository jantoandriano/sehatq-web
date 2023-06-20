import React from "react";
import { mappingSpecialityName, priceFormat } from "@sehatq/utils";
import { SehatqUserIcon, useImage } from "../../user-interfaces";
import {
  SimpleTelemedicineHCPProfileCardMobile,
  SimpleTelemedicineHCPProfileCardMobileSkeleton,
} from "./simple-telemedicine-hcp-profile-card-mobile";
import {
  SimpleTelemedicineHCPProfileCardDesktop,
  SimpleTelemedicineHCPProfileCardDesktopSkeleton,
} from "./simple-telemedicine-hcp-profile-card-desktop";
import {
  TelemedicineDoctorCache,
  useGetTelemedicineDoctor,
} from "./doctor-queries";

export type SimpleTelemedicineHCPProfileCardProps = {
  isMobile?: boolean;
  doctorSlug: string;
};

function selectTelemedicineDoctor(doctor: TelemedicineDoctorCache) {
  const { rating, specialityName, consultationFee, displayPrice, ...data } =
    doctor.data;
  return {
    ...data,
    ratingAverage: rating?.average ?? 0,
    ratingTotal: rating?.count ?? 0,
    specialityName: mappingSpecialityName(specialityName),
    consultationFee: priceFormat(consultationFee),
    displayPrice: displayPrice ? priceFormat(displayPrice) : "",
  };
}

export function SimpleTelemedicineHCPProfileCard(
  props: SimpleTelemedicineHCPProfileCardProps
) {
  const { doctorSlug, isMobile = false, ...otherProps } = props;
  const {
    data: doctor,
    isError,
    isLoading,
  } = useGetTelemedicineDoctor(
    { doctorId: doctorSlug },
    { select: selectTelemedicineDoctor }
  );
  const Image = useImage();

  if (isError || !doctor) return null;

  if (isLoading)
    return <SimpleTelemedicineHCPProfileCardSkeleton isMobile={isMobile} />;

  const doctorImage = doctor?.photoUrl ? (
    <Image
      alt={doctor.name}
      src={doctor.photoUrl}
      layout="fill"
      objectFit="contain"
      wrapperProps={{
        margin: "0 auto",
        width: "64px",
        height: "64px",
        borderRadius: "45px",
        overflow: "hidden",
      }}
    />
  ) : (
    <SehatqUserIcon boxSize="64px" />
  );

  const newProps = {
    ...otherProps,
    doctor,
    doctorImage,
  };

  if (isMobile) return <SimpleTelemedicineHCPProfileCardMobile {...newProps} />;

  return <SimpleTelemedicineHCPProfileCardDesktop {...newProps} />;
}

export function SimpleTelemedicineHCPProfileCardSkeleton(props: {
  isMobile?: boolean;
}) {
  if (props.isMobile) return <SimpleTelemedicineHCPProfileCardMobileSkeleton />;
  return <SimpleTelemedicineHCPProfileCardDesktopSkeleton />;
}
