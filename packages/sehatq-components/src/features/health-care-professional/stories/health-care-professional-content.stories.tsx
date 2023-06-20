import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import {
  HCPContentProps,
  HCPContent,
} from "../health-care-professional-content";
import { Box } from "../../../user-interfaces";

export default {
  title:
    "Features / Health Care Professional / Health Care Professional Content",
  component: HCPContent,
} as Meta;

type HCPContentStory = StoryObj<HCPContentProps>;

export const Desktop: HCPContentStory = {
  render: (args) => (
    <Box width="720px">
      <HCPContent {...args} />
    </Box>
  ),
  args: {
    specialitySlug: undefined,
  },
};

export const Mobile: HCPContentStory = {
  render: (args) => (
    <Box width="360px">
      <HCPContent {...args} />
    </Box>
  ),
  args: {
    ...Desktop.args,
    isMobile: true,
  },
};
