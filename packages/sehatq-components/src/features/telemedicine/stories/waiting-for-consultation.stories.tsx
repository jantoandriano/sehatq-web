import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import { WaitingForConsultation, WaitingForConsultationProps } from "..";

export default {
  title: "Features / Telemedicine / Waiting for Consultation",
  component: WaitingForConsultation,
} as Meta;

type WaitingForConsultationStory = StoryObj<WaitingForConsultationProps>;

export const Desktop: WaitingForConsultationStory = {
  render: (args) => (
    <Box width="777px">
      <WaitingForConsultation {...args} />
    </Box>
  ),
  args: {
    consultationId: "12950",
  },
};

export const Mobile: WaitingForConsultationStory = {
  render: (args) => (
    <Box width="328px" height="616px">
      <WaitingForConsultation {...args} />
    </Box>
  ),
  args: {
    ...Desktop.args,
    isMobile: true,
  },
};
