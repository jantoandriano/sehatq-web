import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Box } from "../../../user-interfaces";
import {
  ConsultationTermAndCondition,
  ConsultationTermAndConditionProps,
} from "..";
export default {
  title: "Features / Telemedicine / Consultation Term And Condition",
  component: ConsultationTermAndCondition,
} as Meta;

type ConsultationTermAndConditionStory =
  StoryObj<ConsultationTermAndConditionProps>;

export const Desktop: ConsultationTermAndConditionStory = {
  render: (args) => (
    <Box width="760px">
      <ConsultationTermAndCondition {...args} />
    </Box>
  ),
  args: {},
};

export const Mobile: ConsultationTermAndConditionStory = {
  render: (args) => (
    <Box width="328px">
      <ConsultationTermAndCondition {...args} isMobile />
    </Box>
  ),
  args: {},
};
