import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Box } from "../../../user-interfaces";
import { SimpleTelemedicineHCPCard, SimpleTelemedicineHCPCardProps } from "..";
export default {
  title: "Features / Telemedicine / Simple Telemedicine HCP Card",
  component: SimpleTelemedicineHCPCard,
} as Meta;

type SimpleTelemedicineHCPCardStory = StoryObj<SimpleTelemedicineHCPCardProps>;

const defaultArgs = {
  doctorId: 1,
  doctorSlug: "devi-resnia-vistani-spog",
  doctorName: "dr. Devi Resnia Vistani Sp.OG",
  photoUrl: "https://static.sehatq.com/telemed/profile/20210310071623",
  speciality: "Kandungan",
  consultationFee: 150000,
  ratingAvg: 4.9,
  ratingTotal: 251,
  experience: "4 Tahun",
  indicator: "green",
};
export const Desktop: SimpleTelemedicineHCPCardStory = {
  render: (args) => (
    <Box width="760px">
      <SimpleTelemedicineHCPCard {...args} isMobile={false} />
    </Box>
  ),
  args: { ...defaultArgs },
};

export const Mobile: SimpleTelemedicineHCPCardStory = {
  render: (args) => (
    <Box width="328px">
      <SimpleTelemedicineHCPCard {...args} isMobile />
    </Box>
  ),
  args: { ...defaultArgs },
};
