import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import { HCPProfileContent, HCPProfileContentProps } from "..";

export default {
  title:
    "Features / Health Care Professional / Health Care Professional Profile Content",
  component: HCPProfileContent,
} as Meta;

type HCPProfileContentStory = StoryObj<HCPProfileContentProps>;

const defaultArgs = {
  hcpSlug: "dr-rio-andreas-spb",
};
export const Mobile: HCPProfileContentStory = {
  render: (args) => (
    <Box width="328px">
      <HCPProfileContent {...args} isMobile />
    </Box>
  ),
  args: { ...defaultArgs },
};

export const Desktop: HCPProfileContentStory = {
  render: (args) => (
    <Box width="760px">
      <HCPProfileContent {...args} />
    </Box>
  ),
  args: { ...defaultArgs },
};
