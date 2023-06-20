import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import {
  ConsultationScheduleInfoProps,
  ConsultationScheduleInfo,
} from "../consultation-schedule-info";
import { Box } from "../../../user-interfaces";

export default {
  title: "Features / General / Consultation Schedule Info",
  component: ConsultationScheduleInfo,
} as Meta;

type ConsultationScheduleInfoStory = StoryObj<ConsultationScheduleInfoProps>;

export const Desktop: ConsultationScheduleInfoStory = {
  render: (args) => (
    <Box width="300px">
      <ConsultationScheduleInfo {...args} />
    </Box>
  ),
  args: {
    doctorId: "1732",
    scheduleDay: "Sabtu, 30 Nov 2022",
    scheduleTime: "15:00 PM",
  },
};

export const Mobile: ConsultationScheduleInfoStory = {
  ...Desktop,
  args: {
    ...Desktop.args,
    isMobile: true,
  },
};
