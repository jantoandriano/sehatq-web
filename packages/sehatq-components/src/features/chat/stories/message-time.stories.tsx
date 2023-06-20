import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { MessageTime, MessageTimeProps } from "..";
import { Box } from "../../../user-interfaces";

export default {
  title: "Features / Chat / Message Time",
  component: MessageTime,
} as Meta;

type MessageTimeStory = StoryObj<MessageTimeProps>;

export const DesktopSender: MessageTimeStory = {
  render: (args) => (
    <Box background="white" p={3}>
      <MessageTime {...args} />
    </Box>
  ),
  args: {
    type: "sender",
    messageTime: "1:15 PM",
  },
};

export const MobileSender: MessageTimeStory = {
  ...DesktopSender,
  args: {
    ...DesktopSender.args,
    isMobile: true,
  },
};

export const DesktopReceiver: MessageTimeStory = {
  render: (args) => (
    <Box background="sea.500" p={3}>
      <MessageTime {...args} />
    </Box>
  ),
  args: {
    messageTime: "1:15 PM",
    type: "receiver",
  },
};

export const MobileReceiver: MessageTimeStory = {
  ...DesktopReceiver,
  args: {
    ...DesktopReceiver.args,
    isMobile: true,
  },
};
