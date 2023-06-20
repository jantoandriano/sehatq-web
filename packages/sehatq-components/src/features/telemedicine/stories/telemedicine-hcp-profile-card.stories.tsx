import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import {
  TelemedicineHcpProfileCard,
  TelemedicineHcpProfileCardProps,
} from "..";

export default {
  title: "Features / Telemedicine / Telemedicine Hcp Profile Card",
  component: TelemedicineHcpProfileCard,
} as Meta;

type TelemedicineHcpProfileCardStory =
  StoryObj<TelemedicineHcpProfileCardProps>;

export const Desktop: TelemedicineHcpProfileCardStory = {
  render: (args) => (
    <Box width="694px">
      <TelemedicineHcpProfileCard {...args} />
    </Box>
  ),
  args: {
    doctorSlug: "uci-pitra-ariesta-shinta-dewi",
  },
};

export const Mobile: TelemedicineHcpProfileCardStory = {
  render: (args) => (
    <Box width="360px">
      <TelemedicineHcpProfileCard {...args} />
    </Box>
  ),
  args: {
    doctorSlug: "uci-pitra-ariesta-shinta-dewi",
    isMobile: true,
  },
};
