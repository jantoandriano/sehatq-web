import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import { MessageTimeSkeleton, MessageTimeSkeletonProps } from "..";

export default {
  title: "Features / Chat / Message Time Skeleton",
  component: MessageTimeSkeleton,
} as Meta;

type MessageTimeSkeletonStory = StoryObj<MessageTimeSkeletonProps>;

export const DesktopSender: MessageTimeSkeletonStory = {
  render: (args) => (
    <Box background="white" p={3}>
      <MessageTimeSkeleton {...args} />
    </Box>
  ),
  args: {},
};

export const MobileSender: MessageTimeSkeletonStory = {
  ...DesktopSender,
  args: {
    isMobile: true,
  },
};

export const DesktopReceiver: MessageTimeSkeletonStory = {
  render: (args) => (
    <Box background="sea.500" p={3}>
      <MessageTimeSkeleton {...args} />
    </Box>
  ),
  args: {},
};

export const MobileReceiver: MessageTimeSkeletonStory = {
  ...DesktopReceiver,
  args: {
    isMobile: true,
  },
};
