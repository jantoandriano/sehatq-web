import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { BubbleContainer, BubbleContainerProps } from "..";
import { Box, Text } from "../../../user-interfaces";

export default {
  title: "Features / Chat / Bubble Container",
  component: BubbleContainer,
} as Meta;

type BubbleContainerStory = StoryObj<BubbleContainerProps>;

export const DesktopTextBubbleSender: BubbleContainerStory = {
  render: (args) => (
    <Box maxW="445px">
      <BubbleContainer {...args} />
    </Box>
  ),
  args: {
    isMobile: false,
    children: (
      <Text
        fontStyle="italic"
        color="brownGrey.500"
        fontSize="md"
        lineHeight="6"
      >
        Pesan telah dihapus
      </Text>
    ),
    type: "sender",
    readStatus: "unread",
    messageTime: "1:15 PM",
    messageType: "deleted",
  },
};

export const MobileTextBubbleSender: BubbleContainerStory = {
  render: (args) => (
    <Box maxW="273px">
      <BubbleContainer {...args} />
    </Box>
  ),
  args: {
    ...DesktopTextBubbleSender.args,
    children: (
      <Text
        fontStyle="italic"
        color="brownGrey.500"
        fontSize="sm"
        lineHeight="4"
      >
        Pesan telah dihapus
      </Text>
    ),
    isMobile: true,
  },
};

export const DesktopTextBubbleReceiver: BubbleContainerStory = {
  ...DesktopTextBubbleSender,
  args: {
    isMobile: false,
    children: (
      <Text fontStyle="italic" color="sea.300" fontSize="md" lineHeight="6">
        Pesan telah dihapus
      </Text>
    ),
    type: "receiver",
    readStatus: "read",
    messageTime: "1:15 PM",
    messageType: "deleted",
  },
};

export const MobileTextBubbleReceiver: BubbleContainerStory = {
  ...MobileTextBubbleSender,
  args: {
    ...DesktopTextBubbleReceiver.args,
    children: (
      <Text fontStyle="italic" color="sea.300" fontSize="sm" lineHeight="4">
        Pesan telah dihapus
      </Text>
    ),
    isMobile: true,
  },
};
