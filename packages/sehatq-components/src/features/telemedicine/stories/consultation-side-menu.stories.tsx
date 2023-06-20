import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import { ConsultationSideMenu, ConsultationSideMenuProps } from "..";

export default {
  title: "Features / Telemedicine / Consultation Side Menu",
  component: ConsultationSideMenu,
} as Meta;

type ConsultationSideMenuStory = StoryObj<ConsultationSideMenuProps>;

export const Desktop: ConsultationSideMenuStory = {
  render: (args) => (
    <Box width="300px">
      <ConsultationSideMenu {...args} />
    </Box>
  ),
  args: {
    doctorId: "1732",
  },
};
