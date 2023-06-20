import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import {
  ClinicSocialMedia,
  ClinicSocialMediaProps,
} from "../clinic-social-media";

export default {
  title: "Features / Landing Page / Clinic Social Media",
  component: ClinicSocialMedia,
} as Meta;

type ClinicSocialMediaStory = StoryObj<ClinicSocialMediaProps>;
export const Desktop: ClinicSocialMediaStory = {
  render: (args) => (
    <Box width="1366px">
      <ClinicSocialMedia {...args} />
    </Box>
  ),
  args: {
    isMobile: false,
  },
};

export const Mobile: ClinicSocialMediaStory = {
  render: (args) => (
    <Box width="360px">
      <ClinicSocialMedia {...args} />
    </Box>
  ),
  args: {
    isMobile: true,
  },
};
