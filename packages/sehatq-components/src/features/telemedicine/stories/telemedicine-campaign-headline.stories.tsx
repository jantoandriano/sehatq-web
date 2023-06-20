import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Box } from "../../../user-interfaces";
import {
  TelemedicineCampaignHeadline,
  TelemedicineCampaignHeadlineProps,
} from "..";
export default {
  title: "Features / Telemedicine / Telemedicine Campaign Headline",
  component: TelemedicineCampaignHeadline,
} as Meta;

type TelemedicineCampaignHeadlineStory =
  StoryObj<TelemedicineCampaignHeadlineProps>;

const defaultArgs = {
  campaignSlug: "capaign-azizah-cantik",
};

export const Desktop: TelemedicineCampaignHeadlineStory = {
  render: (args) => (
    <Box width="760px">
      <TelemedicineCampaignHeadline {...args} />
    </Box>
  ),
  args: { ...defaultArgs },
};

export const Mobile: TelemedicineCampaignHeadlineStory = {
  render: (args) => (
    <Box width="328px">
      <TelemedicineCampaignHeadline {...args} isMobile />
    </Box>
  ),
  args: { ...defaultArgs },
};
