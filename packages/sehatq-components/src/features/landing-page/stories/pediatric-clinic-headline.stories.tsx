import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import {
  PediatricClinicHeadline,
  PediatricClinicHeadlineProps,
} from "../pediatric-clinic-headline";

export default {
  title: "Features / Landing Page / Pediatric Clinic Headline",
  component: PediatricClinicHeadline,
} as Meta;

type PediatricClinicHeadlineStory = StoryObj<PediatricClinicHeadlineProps>;
export const Desktop: PediatricClinicHeadlineStory = {
  render: (args) => (
    <Box width="1440px">
      <PediatricClinicHeadline {...args} />
    </Box>
  ),
  args: {
    isMobile: false,
  },
};

export const Mobile: PediatricClinicHeadlineStory = {
  render: (args) => (
    <Box width="360px">
      <PediatricClinicHeadline {...args} />
    </Box>
  ),
  args: {
    isMobile: true,
  },
};
