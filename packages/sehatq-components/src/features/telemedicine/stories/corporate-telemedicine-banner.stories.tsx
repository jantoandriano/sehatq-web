import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Box } from "../../../user-interfaces";
import {
  CorporateTelemedicineBanner,
  CorporateTelemedicineBannerProps,
} from "..";
export default {
  title: "Features / Telemedicine / Corporate Telemedicine Banner",
  component: CorporateTelemedicineBanner,
} as Meta;

type CorporateTelemedicineBannerStory =
  StoryObj<CorporateTelemedicineBannerProps>;

export const Desktop: CorporateTelemedicineBannerStory = {
  render: (args) => (
    <Box width="1086px">
      <CorporateTelemedicineBanner {...args} isMobile={false} />
    </Box>
  ),
  args: {},
};

export const Mobile: CorporateTelemedicineBannerStory = {
  render: (args) => (
    <Box width="360px">
      <CorporateTelemedicineBanner {...args} isMobile />
    </Box>
  ),
  args: {},
};
