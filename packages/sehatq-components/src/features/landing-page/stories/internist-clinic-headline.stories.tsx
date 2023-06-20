import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import {
  InternistClinicHeadline,
  InternistClinicHeadlineProps,
} from "../internist-clinic-headline";

export default {
  title: "Features / Landing Page / Internist Clinic Headline",
  component: InternistClinicHeadline,
} as Meta;

type InternistClinicHeadlineStory = StoryObj<InternistClinicHeadlineProps>;
export const Desktop: InternistClinicHeadlineStory = {
  render: (args) => (
    <Box width="1440px">
      <InternistClinicHeadline {...args} />
    </Box>
  ),
  args: {
    isMobile: false,
  },
};

export const Mobile: InternistClinicHeadlineStory = {
  render: (args) => (
    <Box width="360px">
      <InternistClinicHeadline {...args} />
    </Box>
  ),
  args: {
    isMobile: true,
  },
};
