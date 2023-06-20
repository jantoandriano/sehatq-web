import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import { BasicHCPProfileCard, BasicHCPProfileCardProps } from "..";

export default {
  title:
    "Features / Health Care Professional / Basic Health Care Professional Profile Card",
  component: BasicHCPProfileCard,
} as Meta;

type BasicHCPProfileCardStory = StoryObj<BasicHCPProfileCardProps>;

const defaultArgs = {
  hcpSlug: "dr-rio-andreas-spb",
};
export const Desktop: BasicHCPProfileCardStory = {
  render: (args) => (
    <Box width="760px">
      <BasicHCPProfileCard {...args} isMobile={false} />
    </Box>
  ),
  args: { ...defaultArgs },
};

export const Mobile: BasicHCPProfileCardStory = {
  render: (args) => (
    <Box width="328px">
      <BasicHCPProfileCard {...args} isMobile />
    </Box>
  ),
  args: { ...defaultArgs },
};
