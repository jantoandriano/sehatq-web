import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import { TelemedicineNavigation, TelemedicineNavigationProps } from "..";

export default {
  title: "Features / Telemedicine / Telemedicine Navigation",
  component: TelemedicineNavigation,
} as Meta;

type TelemedicineNavigationStory = StoryObj<TelemedicineNavigationProps>;

export const Desktop: TelemedicineNavigationStory = {
  render: () => (
    <Box width="1086px">
      <TelemedicineNavigation />
    </Box>
  ),
  args: {},
};

export const Mobile: TelemedicineNavigationStory = {
  render: (args) => (
    <Box width="360px">
      <TelemedicineNavigation {...args} isMobile />
    </Box>
  ),
  args: {
    activeNavigation: "explore",
  },
};
