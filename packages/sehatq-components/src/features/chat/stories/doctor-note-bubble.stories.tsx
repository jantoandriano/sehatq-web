import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import {
  DoctorNoteBubble,
  DoctorNoteBubbleProps,
  BubbleContainer,
  BubbleContainerProps,
} from "..";

export default {
  title: "Features / Chat / Doctor Note Bubble",
  component: DoctorNoteBubble,
} as Meta;

type DoctorNoteBubbleStory = StoryObj<
  DoctorNoteBubbleProps & BubbleContainerProps
>;

export const DesktopSender: DoctorNoteBubbleStory = {
  render: (args) => (
    <BubbleContainer {...args}>
      <DoctorNoteBubble {...args} />
    </BubbleContainer>
  ),
  args: {
    type: "sender",
    messageTime: "1:15 PM",
    consultationId: "15247",
  },
};

export const MobileSender: DoctorNoteBubbleStory = {
  ...DesktopSender,
  args: {
    ...DesktopSender.args,
    isMobile: true,
  },
};
