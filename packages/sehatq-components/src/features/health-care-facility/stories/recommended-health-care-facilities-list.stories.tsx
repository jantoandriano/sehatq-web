import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import {
  RecommendedHealthCareFacilities,
  RecommendedHealthCareFacilitiesProps,
} from "..";

export default {
  title: "Features / Health Care Facility / Recommended Health Care Facilities",
  component: RecommendedHealthCareFacilities,
} as Meta;

type RecommendedHealthCareProfessionalsStory =
  StoryObj<RecommendedHealthCareFacilitiesProps>;

const defaultArgs = {};
export const Mobile: RecommendedHealthCareProfessionalsStory = {
  render: (args) => (
    <Box width="328px">
      <RecommendedHealthCareFacilities {...args} isMobile />
    </Box>
  ),
  args: {
    ...defaultArgs,
  },
};

export const Desktop: RecommendedHealthCareProfessionalsStory = {
  render: (args) => (
    <Box width="760px">
      <RecommendedHealthCareFacilities {...args} />
    </Box>
  ),
  args: {
    ...defaultArgs,
  },
};
