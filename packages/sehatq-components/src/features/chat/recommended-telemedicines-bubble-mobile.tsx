import React from "react";
import { Text, VStack } from "../../user-interfaces";
import { TelemedicineBubble } from "./telemedicine-bubble";

type TelemedicineBubbleMobileProps = {
  doctorImgSrc: string;
  doctorName: string;
  doctorSlug: string;
  specialityName: string;
  hospitalName: string;
  ratingAverage: number;
  ratingTotal: number;
  experience: string;
  doctorRecommendationId: string;
};

export type RecommendedTelemedicinesBubbleMobileProps = {
  recommendTelemedicines: TelemedicineBubbleMobileProps[];
};

export function RecommendedTelemedicinesBubbleMobile(
  props: RecommendedTelemedicinesBubbleMobileProps
) {
  const { recommendTelemedicines } = props;

  return (
    <>
      <Text fontSize="sm" fontFamily="poppins" fontWeight="semibold">
        Rekomendasi Chat Dokter
      </Text>
      <VStack spacing="2" align="normal" mt={2}>
        {recommendTelemedicines?.map((telemedicine) => (
          <TelemedicineBubble
            key={telemedicine.doctorSlug}
            {...telemedicine}
            isMobile
          />
        ))}
      </VStack>
    </>
  );
}
