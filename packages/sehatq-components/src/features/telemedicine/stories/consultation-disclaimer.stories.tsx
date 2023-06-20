import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Box } from "../../../user-interfaces";
import { ConsultationDisclaimer, ConsultationDisclaimerProps } from "..";
export default {
  title: "Features / Telemedicine / Consultation Form Disclaimer",
  component: ConsultationDisclaimer,
} as Meta;

type ConsultationDisclaimerStory = StoryObj<ConsultationDisclaimerProps>;

export const Desktop: ConsultationDisclaimerStory = {
  render: (args) => (
    <Box width="760px">
      <ConsultationDisclaimer {...args} />
    </Box>
  ),
  args: { isFullWidth: true },
};

export const Mobile: ConsultationDisclaimerStory = {
  render: (args) => (
    <Box width="328px">
      <ConsultationDisclaimer {...args} isMobile />
    </Box>
  ),
  args: { isFullWidth: false },
};
