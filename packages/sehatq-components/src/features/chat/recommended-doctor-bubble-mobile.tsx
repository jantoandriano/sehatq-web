import React from "react";
import { Text, VStack, Box } from "../../user-interfaces";
import { DoctorBubble } from "./doctor-bubble";

type DoctorBubbleMobileProps = {
  doctorImgSrc: string;
  doctorId: number;
  doctorName: string;
  specialityName: string;
  hospitalName: string;
  scheduleDay: string;
  scheduleTime: string;
  experience: string;
};

export type RecommendedDoctorBubbleMobileProps = {
  recommendDoctors: DoctorBubbleMobileProps[];
};

export function RecommendedDoctorBubbleMobile(
  props: RecommendedDoctorBubbleMobileProps
) {
  const { recommendDoctors } = props;

  return (
    <>
      <Text fontSize="sm" fontFamily="poppins" fontWeight="semibold">
        Rekomendasi Janji Temu Dokter
      </Text>
      <VStack spacing={2} mt={2} align="normal">
        {recommendDoctors?.map((doctor) => (
          <Box key={doctor.doctorId}>
            <DoctorBubble {...doctor} isMobile />
          </Box>
        ))}
      </VStack>
    </>
  );
}
