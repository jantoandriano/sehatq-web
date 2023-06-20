import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import {
  HealthCareProfessionalSorter,
  HealthCareProfessionalSorterProps,
} from "..";

export default {
  title:
    "Features / Health Care Professional / Health Care Professional Sorter",
  component: HealthCareProfessionalSorter,
} as Meta;

type HealthCareProfessionalSorterStory =
  StoryObj<HealthCareProfessionalSorterProps>;

const defaultArgs = {
  selectedSorter: "terdekat",
};
export const Mobile: HealthCareProfessionalSorterStory = {
  render: (args) => (
    <Box width="328px">
      <HealthCareProfessionalSorter {...args} isMobile />
    </Box>
  ),
  args: {
    ...defaultArgs,
  },
};

export const Desktop: HealthCareProfessionalSorterStory = {
  render: (args) => (
    <Box width="760px">
      <HealthCareProfessionalSorter {...args} />
    </Box>
  ),
  args: {
    ...defaultArgs,
  },
};
