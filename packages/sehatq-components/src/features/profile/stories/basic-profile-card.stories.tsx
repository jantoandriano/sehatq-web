import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { BasicProfileCardProps, BasicProfileCard } from "../basic-profile-card";
import { BasicProfileCardSkeletonDesktop } from "../basic-profile-card-desktop";
import { Box } from "../../../user-interfaces";

export default {
  title: "Features / Profile / Basic Profile Card",
  component: BasicProfileCard,
} as Meta;

type BasicProfileCardStory = StoryObj<BasicProfileCardProps>;

export const Desktop: BasicProfileCardStory = {
  render: (args) => (
    <Box width="330px">
      <BasicProfileCard {...args} />
    </Box>
  ),
};

export const Mobile: BasicProfileCardStory = {
  ...Desktop,
  args: {
    ...Desktop.args,
    isMobile: true,
  },
};

export const Skeleton: BasicProfileCardStory = {
  render: () => (
    <Box width="330px">
      <BasicProfileCardSkeletonDesktop />
    </Box>
  ),
};
