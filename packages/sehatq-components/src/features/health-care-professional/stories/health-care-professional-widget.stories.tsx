import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import {
  HealthCareProfessionalWidget,
  HealthCareProfessionalWidgetProps,
} from "../";

export default {
  title:
    "Features / Health Care Professional / Health Care Professional Widget",
  component: HealthCareProfessionalWidget,
} as Meta;

type HealthCareProfessionalWidgetStory =
  StoryObj<HealthCareProfessionalWidgetProps>;

const defaultArgs = {
  specialitySlug: "mata",
};
export const Mobile: HealthCareProfessionalWidgetStory = {
  render: (args) => (
    <Box width="328px">
      <HealthCareProfessionalWidget {...args} />
    </Box>
  ),
  args: {
    ...defaultArgs,
  },
};

export const Desktop: HealthCareProfessionalWidgetStory = {
  render: (args) => (
    <Box width="760px">
      <HealthCareProfessionalWidget {...args} />
    </Box>
  ),
  args: {
    ...defaultArgs,
  },
};
