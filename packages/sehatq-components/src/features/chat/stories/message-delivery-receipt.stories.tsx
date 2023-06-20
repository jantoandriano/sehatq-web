import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { MessageDeliveryReceipt, MessageDeliveryReceiptProps } from "..";
import { Box } from "../../../user-interfaces";

export default {
  title: "Features / Chat / Message Delivery Receipt Icon",
  component: MessageDeliveryReceipt,
} as Meta;

type MessageDeliveryReceiptStory = StoryObj<MessageDeliveryReceiptProps>;

export const DesktopDelivered: MessageDeliveryReceiptStory = {
  render: (args) => (
    <Box background="sea.500" p={3}>
      <MessageDeliveryReceipt {...args} />
    </Box>
  ),
  args: {
    readStatus: "unread",
  },
};

export const MobileDelivered: MessageDeliveryReceiptStory = {
  ...DesktopDelivered,
  args: {
    ...DesktopDelivered.args,
    isMobile: true,
  },
};

export const DesktopRead: MessageDeliveryReceiptStory = {
  ...DesktopDelivered,
  args: {
    readStatus: "read",
  },
};

export const MobileRead: MessageDeliveryReceiptStory = {
  ...DesktopDelivered,
  args: {
    ...DesktopRead.args,
    isMobile: true,
  },
};
