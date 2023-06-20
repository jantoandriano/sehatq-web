import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import {
  TelemedicineHCPCurrentSchedule,
  TelemedicineHCPCurrentScheduleProps,
} from "..";

export default {
  title: "Features / Telemedicine / Telemedicine Hcp Current Schedule",
  component: TelemedicineHCPCurrentSchedule,
} as Meta;

type TelemedicineHCPCurrentScheduleStory =
  StoryObj<TelemedicineHCPCurrentScheduleProps>;

export const Desktop: TelemedicineHCPCurrentScheduleStory = {
  render: (args) => (
    <Box width="376px">
      <TelemedicineHCPCurrentSchedule {...args} />
    </Box>
  ),
  args: {
    doctorId: "1732",
  },
};

export const Mobile: TelemedicineHCPCurrentScheduleStory = {
  render: (args) => (
    <Box width="360px">
      <TelemedicineHCPCurrentSchedule {...args} />
    </Box>
  ),
  args: {
    doctorId: "1732",
    isMobile: true,
  },
};
