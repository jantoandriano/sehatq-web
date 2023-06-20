import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import {
  CardiacClinicHeadline,
  CardiacClinicHeadlineProps,
} from "../cardiac-clinic-headline";

export default {
  title: "Features / Landing Page / Cardiac Clinic Headline",
  component: CardiacClinicHeadline,
} as Meta;

type CardiacClinicHeadlineStory = StoryObj<CardiacClinicHeadlineProps>;
export const Desktop: CardiacClinicHeadlineStory = {
  render: (args) => (
    <Box width="1440px">
      <CardiacClinicHeadline {...args} />
    </Box>
  ),
  args: {
    isMobile: false,
  },
};

export const mobile: CardiacClinicHeadlineStory = {
  render: (args) => (
    <Box width="360px">
      <CardiacClinicHeadline {...args} />
    </Box>
  ),
  args: {
    isMobile: true,
  },
};
