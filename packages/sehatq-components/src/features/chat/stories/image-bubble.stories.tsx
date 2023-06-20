import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import {
  ImageBubble,
  ImageBubbleProps,
  BubbleContainer,
  BubbleContainerProps,
} from "..";

export default {
  title: "Features / Chat / Image Bubble",
  component: ImageBubble,
} as Meta;

type ImageBubbleStory = StoryObj<ImageBubbleProps & BubbleContainerProps>;

export const DesktopSender: ImageBubbleStory = {
  render: (args) => (
    <BubbleContainer {...args}>
      <ImageBubble {...args} />
    </BubbleContainer>
  ),
  args: {
    imageUrl:
      "https://t4.ftcdn.net/jpg/02/94/36/53/240_F_294365323_MVh3pJ1rkpxD9H0V1VyViRFgKHJreWyr.jpg",
    readStatus: "unread",
    messageTime: "1:15 PM",
    type: "sender",
    messageType: "image",
  },
};

export const MobileSender: ImageBubbleStory = {
  ...DesktopSender,
  args: {
    ...DesktopSender.args,
    isMobile: true,
  },
};

export const DesktopReceiverStatusRead: ImageBubbleStory = {
  ...DesktopSender,
  args: {
    width: 365,
    height: 165,
    imageUrl:
      "https://www.psdstack.com/wp-content/uploads/2016/10/gratisography-6.jpg",
    readStatus: "read",
    messageTime: "1:15 PM",
    type: "receiver",
    messageType: "image",
  },
};

export const MobileReceiverStatusUnread: ImageBubbleStory = {
  ...DesktopReceiverStatusRead,
  args: {
    ...DesktopReceiverStatusRead.args,
    width: 170,
    height: 100,
    readStatus: "unread",
    isMobile: true,
  },
};
