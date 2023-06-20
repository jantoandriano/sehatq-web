import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import {
  InternistClinicHealthTool,
  InternistClinicHealthToolProps,
} from "../internist-clinic-health-tool";

export default {
  title: "Features / Landing Page / Internist ClinicHealth Tool",
  component: InternistClinicHealthTool,
} as Meta;

type InternistClinicHealthToolStory = StoryObj<InternistClinicHealthToolProps>;
export const Desktop: InternistClinicHealthToolStory = {
  render: (args) => (
    <Box width="1106px">
      <InternistClinicHealthTool {...args} />
    </Box>
  ),
  args: {
    isMobile: false,
  },
};

export const Mobile: InternistClinicHealthToolStory = {
  render: (args) => (
    <Box width="360px">
      <InternistClinicHealthTool {...args} />
    </Box>
  ),
  args: {
    isMobile: true,
  },
};
