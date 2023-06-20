import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import { RegularTelemedicineBanner, RegularTelemedicineBannerProps } from "..";

export default {
  title: "Features / Telemedicine / Regular Telemedicine Banner",
  component: RegularTelemedicineBanner,
} as Meta;

type RegularTelemedicineBannerStory = StoryObj<RegularTelemedicineBannerProps>;

export const Desktop: RegularTelemedicineBannerStory = {
  render: (args) => (
    <Box width="499px">
      <RegularTelemedicineBanner {...args} isMobile={false} />
    </Box>
  ),
  args: {},
};

export const Mobile: RegularTelemedicineBannerStory = {
  render: (args) => (
    <Box width="328px">
      <RegularTelemedicineBanner {...args} isMobile />
    </Box>
  ),
  args: {},
};
