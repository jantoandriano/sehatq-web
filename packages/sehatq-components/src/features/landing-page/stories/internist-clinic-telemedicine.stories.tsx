import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import {
  InternistClinicTelemedicine,
  InternistClinicTelemedicineProps,
} from "../internist-clinic-telemedicine";

export default {
  title: "Features / Landing Page / Internist Clinic Telemedicine",
  component: InternistClinicTelemedicine,
} as Meta;

type InternistClinicTelemedicineStory =
  StoryObj<InternistClinicTelemedicineProps>;
export const Desktop: InternistClinicTelemedicineStory = {
  render: (args) => (
    <Box width="1160px">
      <InternistClinicTelemedicine {...args} />
    </Box>
  ),
  args: {
    isMobile: false,
  },
};

export const Mobile: InternistClinicTelemedicineStory = {
  render: (args) => (
    <Box width="360px">
      <InternistClinicTelemedicine {...args} />
    </Box>
  ),
  args: {
    isMobile: true,
  },
};
