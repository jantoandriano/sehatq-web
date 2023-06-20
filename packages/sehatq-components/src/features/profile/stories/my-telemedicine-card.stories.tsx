import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { MyTelemedicineCardProps, MyTelemedicineCard } from "..";
import { Box } from "../../../user-interfaces";

export default {
  title: "Features / Profile / My Telemedicine Card",
  component: MyTelemedicineCard,
} as Meta;

type MyTelemedicineCardStory = StoryObj<MyTelemedicineCardProps>;

export const Desktop: MyTelemedicineCardStory = {
  render: (args) => (
    <Box width="720px">
      <MyTelemedicineCard {...args} />
    </Box>
  ),
  args: {
    chatDate: "12 Mei, 13.15",
    doctorImageSrc: "https://bit.ly/dan-abramov",
    doctorName: "dr. Priyandini Wulandari, Sp.JP",
    doctorSpeciality: "Dokter Spesialis Jantung",
    doctorHospital: "Eka Hospital BSD",
    doctorRating: 4,
    doctorRatingTotal: 521,
    hasDoctorNote: true,
    consultationFee: "Rp.225.000",
    chatDuration: 20,
    iconWidth: 2.5,
    iconHeight: 2.5,
    chatNavigation: {
      name: "TELEMED_HISTORY",
      query: { consultationId: "11581" },
    },
  },
};

export const Mobile: MyTelemedicineCardStory = {
  ...Desktop,
  args: {
    ...Desktop.args,
    isMobile: true,
  },
};
