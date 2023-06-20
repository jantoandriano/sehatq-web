import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Box } from "../../../user-interfaces";
import { TelemedicineHCPCard, TelemedicineHCPCardProps } from "..";
export default {
  title: "Features / Telemedicine / Telemedicine HCP Card",
  component: TelemedicineHCPCard,
} as Meta;

type TelemedicineHCPCardStory = StoryObj<TelemedicineHCPCardProps>;

const defaultArgs = {
  doctorId: 1,
  doctorSlug: "devi-resnia-vistani-spog",
  doctorName: "dr. Devi Resnia Vistani Sp.OG",
  hcfName: "SehatQ",
  photoUrl: "https://static.sehatq.com/telemed/profile/20210310071623",
  speciality: "Kandungan",
  consultationFee: "Rp. 15.000.000",
  consultationStrikeFee: "Rp. 250.000",
  ratingAvg: 4.9,
  totalReview: 251,
  experience: "4 Tahun",
  indicator: "green",
  isRecomended: false,
};

export const Desktop: TelemedicineHCPCardStory = {
  render: (args) => (
    <Box width="760px">
      <TelemedicineHCPCard {...args} />
    </Box>
  ),
  args: { ...defaultArgs },
};

export const Mobile: TelemedicineHCPCardStory = {
  render: (args) => (
    <Box width="328px">
      <TelemedicineHCPCard {...args} isMobile />
    </Box>
  ),
  args: { ...defaultArgs },
};
