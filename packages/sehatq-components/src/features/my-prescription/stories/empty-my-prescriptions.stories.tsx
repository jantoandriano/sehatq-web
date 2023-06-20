import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import { EmptyMyPrescriptions, EmptyMyPrescriptionsProps } from "..";

export default {
  title: "Features / My Prescription / Empty My Prescriptions",
  component: EmptyMyPrescriptions,
} as Meta;

type EmptyMyPrescriptionsStory = StoryObj<EmptyMyPrescriptionsProps>;

export const Desktop: EmptyMyPrescriptionsStory = {
  render: (args) => (
    <Box width="720px">
      <EmptyMyPrescriptions {...args} />
    </Box>
  ),
  args: {},
};

export const Mobile: EmptyMyPrescriptionsStory = {
  render: (args) => (
    <Box width="328px">
      <EmptyMyPrescriptions {...args} isMobile />
    </Box>
  ),
  args: {},
};
