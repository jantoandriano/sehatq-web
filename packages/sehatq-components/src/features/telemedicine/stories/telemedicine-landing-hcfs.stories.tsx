import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Box } from "../../../user-interfaces";
import { TelemedicineLandingHCFS, TelemedicineLandingHCFSProps } from "..";
export default {
  title:
    "Features / Telemedicine / Telemedicine Landing Health Care Facilities",
  component: TelemedicineLandingHCFS,
} as Meta;

type TelemedicineLandingHCFSStory = StoryObj<TelemedicineLandingHCFSProps>;

export const Desktop: TelemedicineLandingHCFSStory = {
  render: (args) => (
    <Box width="1086px">
      <TelemedicineLandingHCFS {...args} isMobile={false} />
    </Box>
  ),
  args: {},
};

export const Mobile: TelemedicineLandingHCFSStory = {
  render: (args) => (
    <Box width="360px">
      <TelemedicineLandingHCFS {...args} isMobile />
    </Box>
  ),
  args: {},
};
