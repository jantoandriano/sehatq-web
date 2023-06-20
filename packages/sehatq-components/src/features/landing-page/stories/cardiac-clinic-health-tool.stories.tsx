import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import {
  CardiacClinicHealthTool,
  CardiacClinicHealthToolProps,
} from "../cardiac-clinic-health-tool";

export default {
  title: "Features / Landing Page / Cardiac Clinic Health Tool",
  component: CardiacClinicHealthTool,
} as Meta;

type CardiacClinicHealthToolStory = StoryObj<CardiacClinicHealthToolProps>;
export const Desktop: CardiacClinicHealthToolStory = {
  render: (args) => (
    <Box width="1106px">
      <CardiacClinicHealthTool {...args} />
    </Box>
  ),
  args: {
    isMobile: false,
  },
};

export const Moblie: CardiacClinicHealthToolStory = {
  render: (args) => (
    <Box width="360px">
      <CardiacClinicHealthTool {...args} />
    </Box>
  ),
  args: {
    isMobile: true,
  },
};
