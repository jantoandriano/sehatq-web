import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import {
  TelemedicineHCPProfileContent,
  TelemedicineHCPProfileContentProps,
} from "..";

export default {
  title: "Features / Telemedicine / Telemedicine HCP Profile Content",
  component: TelemedicineHCPProfileContent,
} as Meta;

type TelemedicineHCPProfileContentStory =
  StoryObj<TelemedicineHCPProfileContentProps>;

export const Desktop: TelemedicineHCPProfileContentStory = {
  render: (args) => (
    <Box width="694px">
      <TelemedicineHCPProfileContent {...args} />
    </Box>
  ),
  args: {
    doctorSlug: "uci-pitra-ariesta-shinta-dewi",
  },
};

export const Mobile: TelemedicineHCPProfileContentStory = {
  render: (args) => (
    <Box width="360px">
      <TelemedicineHCPProfileContent {...args} />
    </Box>
  ),
  args: {
    doctorSlug: "uci-pitra-ariesta-shinta-dewi",
    isMobile: true,
  },
};
