import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import {
  RecommendedHealthCareProfessionals,
  RecommendedHealthCareProfessionalsProps,
} from "..";

export default {
  title:
    "Features / Health Care Professional / Recommended Health Care Professionals",
  component: RecommendedHealthCareProfessionals,
} as Meta;

type RecommendedHealthCareProfessionalsStory =
  StoryObj<RecommendedHealthCareProfessionalsProps>;

const defaultArgs = {};
export const Mobile: RecommendedHealthCareProfessionalsStory = {
  render: (args) => (
    <Box width="328px">
      <RecommendedHealthCareProfessionals {...args} isMobile />
    </Box>
  ),
  args: {
    ...defaultArgs,
  },
};

export const Desktop: RecommendedHealthCareProfessionalsStory = {
  render: (args) => (
    <Box width="760px">
      <RecommendedHealthCareProfessionals {...args} />
    </Box>
  ),
  args: {
    ...defaultArgs,
  },
};
