import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Box } from "../../../user-interfaces";
import {
  TelemedicineLandingCampaign,
  TelemedicineLandingCampaignProps,
} from "..";
export default {
  title: "Features / Telemedicine / Telemedicine Landing Campaign",
  component: TelemedicineLandingCampaign,
} as Meta;

type TelemedicineLandingCampaignStory =
  StoryObj<TelemedicineLandingCampaignProps>;

export const Desktop: TelemedicineLandingCampaignStory = {
  render: (args) => (
    <Box width="1060px">
      <TelemedicineLandingCampaign {...args} isMobile={false} />
    </Box>
  ),
  args: {
    landingCampaignType: "landing-1",
  },
};

export const Mobile: TelemedicineLandingCampaignStory = {
  render: (args) => (
    <Box width="328px">
      <TelemedicineLandingCampaign {...args} isMobile />
    </Box>
  ),
  args: {
    landingCampaignType: "landing-1",
  },
};
