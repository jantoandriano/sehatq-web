import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import { MentalHealthToolSection, MentalHealthToolSectionProps } from "..";

export default {
  title: "Features / Health Tool / Mental Health Tool Section",
  component: MentalHealthToolSection,
} as Meta;

type MentalHealthToolSectionStory = StoryObj<MentalHealthToolSectionProps>;

export const Desktop: MentalHealthToolSectionStory = {
  render: (args) => (
    <Box width="700px">
      <MentalHealthToolSection {...args} />
    </Box>
  ),
  args: { isMobile: false },
};

export const Mobile: MentalHealthToolSectionStory = {
  render: (args) => (
    <Box width="360px" backgroundColor="white">
      <MentalHealthToolSection {...args} />
    </Box>
  ),
  args: {
    ...Desktop.args,
    isMobile: true,
  },
};
