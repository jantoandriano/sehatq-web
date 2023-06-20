import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import {
  PrescriptionBubble,
  PrescriptionBubbleProps,
  BubbleContainer,
  BubbleContainerProps,
} from "..";

export default {
  title: "Features / Chat / Prescription Bubble",
  component: PrescriptionBubble,
} as Meta;

type PrescriptionBubbleStory = StoryObj<
  PrescriptionBubbleProps & BubbleContainerProps
>;

export const DesktopPrescriptionBubbleSender: PrescriptionBubbleStory = {
  render: (args) => (
    <BubbleContainer {...args}>
      <PrescriptionBubble {...args} />
    </BubbleContainer>
  ),
  args: {
    isMobile: false,
    type: "sender",
    messageTime: "1:15 PM",
    prescriptions: [
      {
        name: "Biogesic Syrup (200ml)",
        slug: "biogesic-syrup",
        priceFrom: 34000,
      },
      {
        name: "OBH Tablet (1 Strip @10 Tablet)",
        slug: "obh-tablet",
        priceFrom: 14000,
      },
      {
        name: "Enervon C Muti Vitamin Tablet & Syrup (1 Botol 60 Butir)",
        slug: "enervon-c-muti-vitamin",
        priceFrom: 304000,
      },
    ],
  },
};

export const MobilePrescriptionBubbleSender: PrescriptionBubbleStory = {
  ...DesktopPrescriptionBubbleSender,
  args: {
    ...DesktopPrescriptionBubbleSender.args,
    isMobile: true,
  },
};
