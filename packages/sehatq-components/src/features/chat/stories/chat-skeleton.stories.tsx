import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { ChatSkeleton, ChatSkeletonProps } from "..";
import { Box } from "../../../user-interfaces";

export default {
  title: "Features / Chat / Chat Skeleton",
  component: ChatSkeleton,
} as Meta;

type ChatSkeletonStory = StoryObj<ChatSkeletonProps>;

export const Desktop: ChatSkeletonStory = {
  render: (args) => (
    <Box height="780px" width="720px">
      <ChatSkeleton {...args} />
    </Box>
  ),
};

export const Mobile: ChatSkeletonStory = {
  render: (args) => (
    <Box height="565px" width="360px">
      <ChatSkeleton {...args} />
    </Box>
  ),
  args: {
    isMobile: true,
    isHistory: true,
  },
};
