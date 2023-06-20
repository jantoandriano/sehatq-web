import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import {
  InternistClinicHealthService,
  InternistClinicHealthServiceProps,
} from "../internist-clinic-health-service";

export default {
  title: "Features / Landing Page / Internist Clinic Health Service",
  component: InternistClinicHealthService,
} as Meta;

type InternistClinicHealthServiceStory =
  StoryObj<InternistClinicHealthServiceProps>;
export const Desktop: InternistClinicHealthServiceStory = {
  render: (args) => (
    <Box width="1160px">
      <InternistClinicHealthService {...args} />
    </Box>
  ),
  args: {
    isMobile: false,
  },
};

export const Mobile: InternistClinicHealthServiceStory = {
  render: (args) => (
    <Box width="360px">
      <InternistClinicHealthService {...args} />
    </Box>
  ),
  args: {
    isMobile: true,
  },
};
