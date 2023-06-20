import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import {
  HealthCareProfessionalCard,
  HealthCareProfessionalCardProps,
} from "..";

export default {
  title: "Features / Health Care Professional / Health Care Professional Card",
  component: HealthCareProfessionalCard,
} as Meta;

type HealthCareProfessionalCardStory =
  StoryObj<HealthCareProfessionalCardProps>;

const defaultArgs = {
  doctorName: "dr. Adriandi, Sp.M",
  doctorSlug: "dr-adriandi-spm",
  speciality: "Psikolog",
  hcfName: "RS Jiwa Dharmawangsa",
  hcfAddress: "Kebayoran Baru, Jakarta Selatan",
  imageUrl:
    "https://cms.sehatq.com/cdn-cgi/image/f=auto,width=96,fit=pad,background=white,quality=100/public/img/doctor_img/dr-rani-indira-sari-sp-m.jpg",
};
export const Mobile: HealthCareProfessionalCardStory = {
  render: (args) => (
    <Box width="328px">
      <HealthCareProfessionalCard {...args} isMobile />
    </Box>
  ),
  args: {
    ...defaultArgs,
  },
};

export const Desktop: HealthCareProfessionalCardStory = {
  render: (args) => (
    <Box width="760px">
      <HealthCareProfessionalCard {...args} />
    </Box>
  ),
  args: {
    ...defaultArgs,
  },
};
