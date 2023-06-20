import React from "react";

import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";

import { ConsultationDurationInfo, ConsultationDurationInfoProps } from "..";

export default {
  title: "Features / General / Consultation Duration Info",

  component: ConsultationDurationInfo,
} as Meta;

type ConsultationDurationInfoStory = StoryObj<ConsultationDurationInfoProps>;

export const Mobile: ConsultationDurationInfoStory = {
  render: (args) => (
    <Box width="328px">
      <ConsultationDurationInfo {...args} isMobile />
    </Box>
  ),

  args: {
    duration: 30,
  },
};

export const Desktop: ConsultationDurationInfoStory = {
  render: (args) => (
    <Box width="300px">
      <ConsultationDurationInfo {...args} />
    </Box>
  ),

  args: {
    ...Mobile.args,
  },
};
