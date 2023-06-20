import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Box } from "../../../user-interfaces";
import {
  TelemedicineLandingHCPCard,
  TelemedicineLandingHCPCardProps,
} from "..";
export default {
  title:
    "Features / Telemedicine / Telemedicine Landing Health Care Professional Card",
  component: TelemedicineLandingHCPCard,
} as Meta;

type TelemedicineLandingHCPCardStory =
  StoryObj<TelemedicineLandingHCPCardProps>;

const defaultArgs = {
  doctorSlug: "devi-resnia-vistani-spog",
  doctorName:
    "Prof. Dr. dr. Bambang Budi Siswanto Sp.JP(K), FISHR, FAsCC, FAPSC, FACC",
  hcfName: "Royal Taruma",
  photoUrl: "https://static-dev.sehatq.com/telemed-dev/profile/202109021405904",
  speciality: "Kandungan",
  consultationFee: 150000,
  consultationStrikeFee: 200000,
  ratingAvg: 4.9,
  ratingTotal: 251,
  experience: "4 Tahun",
  indicator: "green",
};
export const Desktop: TelemedicineLandingHCPCardStory = {
  render: (args) => (
    <Box width="760px">
      <TelemedicineLandingHCPCard {...args} isMobile={false} />
    </Box>
  ),
  args: { ...defaultArgs },
};

export const Mobile: TelemedicineLandingHCPCardStory = {
  render: (args) => (
    <Box width="328px">
      <TelemedicineLandingHCPCard {...args} isMobile />
    </Box>
  ),
  args: {
    ...defaultArgs,
    photoUrl: "https://static.sehatq.com/telemed/profile/20210310071623",
  },
};
