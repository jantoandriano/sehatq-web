import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import {
  VideoCallBubble,
  VideoCallBubbleProps,
  BubbleContainer,
  BubbleContainerProps,
} from "..";

export default {
  title: "Features / Chat / Video Call Bubble",
  component: VideoCallBubble,
} as Meta;

type VideoCallBubbleStory = StoryObj<
  VideoCallBubbleProps & BubbleContainerProps
>;

export const DesktopSenderStart: VideoCallBubbleStory = {
  render: (args) => (
    <BubbleContainer {...args}>
      <VideoCallBubble {...args} />
    </BubbleContainer>
  ),
  args: {
    type: "sender",
    readStatus: "unread",
    messageTime: "1:15 PM",
  },
};

export const MobileReceiverStart: VideoCallBubbleStory = {
  ...DesktopSenderStart,
  args: {
    ...DesktopSenderStart.args,
    type: "receiver",
    readStatus: "read",
    messageTime: "1:15 PM",
    isMobile: true,
  },
};

export const DesktopSenderEnd: VideoCallBubbleStory = {
  ...DesktopSenderStart,
  args: {
    type: "sender",
    readStatus: "unread",
    messageTime: "1:15 PM",
    status: "end",
  },
};

export const MobileReceiverEnd: VideoCallBubbleStory = {
  ...DesktopSenderStart,
  args: {
    ...DesktopSenderEnd.args,
    type: "receiver",
    readStatus: "read",
    messageTime: "1:15 PM",
    isMobile: true,
  },
};

export const DesktopSenderDeclined: VideoCallBubbleStory = {
  ...DesktopSenderStart,
  args: {
    type: "sender",
    readStatus: "unread",
    messageTime: "1:15 PM",
    status: "declined",
  },
};

export const MobileReceiverDeclined: VideoCallBubbleStory = {
  ...DesktopSenderStart,
  args: {
    ...DesktopSenderDeclined.args,
    type: "receiver",
    readStatus: "read",
    isMobile: true,
  },
};
