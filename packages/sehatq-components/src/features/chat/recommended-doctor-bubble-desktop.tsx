import React from "react";
import { Text, VStack } from "../../user-interfaces";
import { DoctorBubble } from "./doctor-bubble";

type DoctorBubbleDesktopProps = {
  doctorImgSrc: string;
  doctorId: number;
  doctorName: string;
  specialityName: string;
  hospitalName: string;
  scheduleDay: string;
  scheduleTime: string;
  experience: string;
};

export type RecommendedDoctorBubbleDesktopProps = {
  recommendDoctors: DoctorBubbleDesktopProps[];
};

export function RecommendedDoctorBubbleDesktop(
  props: RecommendedDoctorBubbleDesktopProps
) {
  const { recommendDoctors } = props;

  return (
    <>
      <Text fontSize="md" fontFamily="poppins" fontWeight="semibold">
        Rekomendasi Janji Temu Dokter
      </Text>
      <VStack spacing={2} mt={2} align="flex-start">
        {recommendDoctors?.length &&
          recommendDoctors.map((doctor) => (
            <DoctorBubble key={doctor.doctorId} {...doctor} isMobile={false} />
          ))}
      </VStack>
    </>
  );
}
