import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Box } from "../../../user-interfaces";
import { MyTelemedicineHistoryCard, MyTelemedicineHistoryCardProps } from "..";
export default {
  title: "Features / Telemedicine / My Telemedicine History Card",
  component: MyTelemedicineHistoryCard,
} as Meta;

type MyTelemedicineHistoryCardStory = StoryObj<MyTelemedicineHistoryCardProps>;

const defaultArgs = {
  patientName: "Ahmad Fahmy",
  createdAt: "11 Mei 2022",
  doctorName: "Woro Kurnianingrum, M.Psi",
  speciality: "Kulit & Kelamin",
  doctorImageUrl: "https://static.sehatq.com/telemed/profile/20210310071623",
  ratingAvg: 5,
  totalReview: 100,
  hasDoctorNote: true,
  fileName: "Catatan Dokter.pdf",
  consultationFee: "Rp. 150.000",
  consultationId: "15354",
  doctorNoteId: "795",
};

export const Desktop: MyTelemedicineHistoryCardStory = {
  render: (args) => (
    <Box width="760px">
      <MyTelemedicineHistoryCard {...args} />
    </Box>
  ),
  args: {
    ...defaultArgs,
  },
};

export const Mobile: MyTelemedicineHistoryCardStory = {
  render: (args) => (
    <Box width="328px">
      <MyTelemedicineHistoryCard {...args} isMobile />
    </Box>
  ),
  args: {
    ...defaultArgs,
  },
};
