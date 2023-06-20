import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import {
  PediatricClinicHealthService,
  PediatricClinicHealthServiceProps,
} from "../pediatric-clinic-health-service";

export default {
  title: "Features / Landing Page / Pediatric Clinic Health Service",
  component: PediatricClinicHealthService,
} as Meta;

type PediatricClinicHealthServiceStory =
  StoryObj<PediatricClinicHealthServiceProps>;
export const Desktop: PediatricClinicHealthServiceStory = {
  render: (args) => (
    <Box width="1106px">
      <PediatricClinicHealthService {...args} />
    </Box>
  ),
  args: {
    isMobile: false,
  },
};

export const Mobile: PediatricClinicHealthServiceStory = {
  render: (args) => (
    <Box width="360px">
      <PediatricClinicHealthService {...args} />
    </Box>
  ),
  args: {
    isMobile: true,
  },
};
