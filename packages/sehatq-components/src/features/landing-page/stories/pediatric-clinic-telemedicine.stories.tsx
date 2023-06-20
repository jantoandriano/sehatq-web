import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import {
  PediatricClinicTelemedicine,
  PediatricClinicTelemedicineProps,
} from "../pediatric-clinic-telemedicine";

export default {
  title: "Features / Landing Page / Pediatric Clinic Telemedicine",
  component: PediatricClinicTelemedicine,
} as Meta;

type PediatricClinicTelemedicineStory =
  StoryObj<PediatricClinicTelemedicineProps>;
export const Desktop: PediatricClinicTelemedicineStory = {
  render: (args) => (
    <Box width="1160px">
      <PediatricClinicTelemedicine {...args} />
    </Box>
  ),
  args: {
    isMobile: false,
  },
};

export const Mobile: PediatricClinicTelemedicineStory = {
  render: (args) => (
    <Box width="328px">
      <PediatricClinicTelemedicine {...args} />
    </Box>
  ),
  args: {
    isMobile: true,
  },
};
