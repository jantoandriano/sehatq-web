import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Box } from "../../../user-interfaces";
import { HCPBookingButton, HCPBookingButtonProps } from "..";

export default {
  title:
    "Features / Health Care Professional / Health Care Professional Booking Button",
  component: HCPBookingButton,
} as Meta;

type HCPBookingButtonStory = StoryObj<HCPBookingButtonProps>;

export const Mobile: HCPBookingButtonStory = {
  render: (args) => (
    <Box width="328px">
      <HCPBookingButton {...args} isMobile />
    </Box>
  ),
  args: {},
};

export const Desktop: HCPBookingButtonStory = {
  render: (args) => (
    <Box width="760px">
      <HCPBookingButton {...args} />
    </Box>
  ),
  args: {},
};
