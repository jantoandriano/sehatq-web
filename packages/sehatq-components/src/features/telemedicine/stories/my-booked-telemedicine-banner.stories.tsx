import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Box } from "../../../user-interfaces";
import {
  MyBookedTelemedicineBanner,
  MyBookedTelemedicineBannerProps,
} from "..";
export default {
  title: "Features / Telemedicine / My Booked Telemedicine Banner",
  component: MyBookedTelemedicineBanner,
} as Meta;

type MyBookedTelemedicineBannerStory =
  StoryObj<MyBookedTelemedicineBannerProps>;

export const Desktop: MyBookedTelemedicineBannerStory = {
  render: (args) => (
    <Box width="1086px">
      <MyBookedTelemedicineBanner {...args} isMobile={false} />
    </Box>
  ),
  args: {},
};

export const Mobile: MyBookedTelemedicineBannerStory = {
  render: (args) => (
    <Box width="330px">
      <MyBookedTelemedicineBanner {...args} isMobile />
    </Box>
  ),
  args: {},
};
