import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Box } from "../../../user-interfaces";
import { TelemedicineLandingHCPS, TelemedicineLandingHCPSProps } from "..";
export default {
  title:
    "Features / Telemedicine / Telemedicine Landing Health Care Professionals",
  component: TelemedicineLandingHCPS,
} as Meta;

type TelemedicineLandingHCPSStory = StoryObj<TelemedicineLandingHCPSProps>;

export const Desktop: TelemedicineLandingHCPSStory = {
  render: (args) => (
    <Box width="960px">
      <TelemedicineLandingHCPS {...args} isMobile={false} />
    </Box>
  ),
  args: {},
};

export const Mobile: TelemedicineLandingHCPSStory = {
  render: (args) => (
    <Box width="328px">
      <TelemedicineLandingHCPS {...args} isMobile />
    </Box>
  ),
  args: {},
};
