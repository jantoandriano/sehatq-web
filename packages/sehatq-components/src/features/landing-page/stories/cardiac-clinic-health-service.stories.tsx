import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import {
  CardiacClinicHealthService,
  CardiacClinicHealthServiceProps,
} from "../cardiac-clinic-health-service";

export default {
  title: "Features / Landing Page / Cardiac Clinic Health Service",
  component: CardiacClinicHealthService,
} as Meta;

type CardiacClinicHealthServiceStory =
  StoryObj<CardiacClinicHealthServiceProps>;
export const Desktop: CardiacClinicHealthServiceStory = {
  render: (args) => (
    <Box width="1160px">
      <CardiacClinicHealthService {...args} />
    </Box>
  ),
  args: {
    isMobile: false,
  },
};

export const Mobile: CardiacClinicHealthServiceStory = {
  render: (args) => (
    <Box width="360px">
      <CardiacClinicHealthService {...args} />
    </Box>
  ),
  args: {
    isMobile: true,
  },
};
