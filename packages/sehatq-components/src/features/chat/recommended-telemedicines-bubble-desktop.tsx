import React from "react";
import { Text, VStack } from "../../user-interfaces";
import { TelemedicineBubble } from "./telemedicine-bubble";

type TelemedicineBubbleDesktopProps = {
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

export type RecommendedTelemedicinesBubbleDesktopProps = {
  recommendTelemedicines: TelemedicineBubbleDesktopProps[];
};

export function RecommendedTelemedicinesBubbleDesktop(
  props: RecommendedTelemedicinesBubbleDesktopProps
) {
  const { recommendTelemedicines } = props;

  return (
    <>
      <Text fontSize="md" fontFamily="poppins" fontWeight="semibold">
        Rekomendasi Chat Dokter
      </Text>
      <VStack spacing="2" align="normal" mt={2}>
        {recommendTelemedicines?.map((telemedicine) => (
          <TelemedicineBubble
            key={telemedicine.doctorSlug}
            {...telemedicine}
            isMobile={false}
          />
        ))}
      </VStack>
    </>
  );
}
