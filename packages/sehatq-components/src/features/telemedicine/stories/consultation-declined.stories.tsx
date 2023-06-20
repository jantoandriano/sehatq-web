import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import { ConsultationDeclined, ConsultationDeclinedProps } from "..";

export default {
  title: "Features / Telemedicine / Consultation Declined",
  component: ConsultationDeclined,
} as Meta;

type ConsultationDeclinedStory = StoryObj<ConsultationDeclinedProps>;

export const Desktop: ConsultationDeclinedStory = {
  render: (args) => (
    <Box width="777px">
      <ConsultationDeclined {...args} />
    </Box>
  ),
  args: {
    consultationId: "13230",
  },
};

export const Mobile: ConsultationDeclinedStory = {
  render: (args) => (
    <Box width="328px" height="616px">
      <ConsultationDeclined {...args} />
    </Box>
  ),
  args: {
    ...Desktop.args,
    isMobile: true,
  },
};
