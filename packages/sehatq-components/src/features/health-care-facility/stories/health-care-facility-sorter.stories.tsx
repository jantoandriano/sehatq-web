import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import { HealthCareFacilitySorter, HealthCareFacilitySorterProps } from "..";

export default {
  title: "Features / Health Care Facility / Health Care Facility Sorter",
  component: HealthCareFacilitySorter,
} as Meta;

type HealthCareFacilitySorterStory = StoryObj<HealthCareFacilitySorterProps>;

const defaultArgs = {
  selectedSorter: "terdekat",
};
export const Mobile: HealthCareFacilitySorterStory = {
  render: (args) => (
    <Box width="328px">
      <HealthCareFacilitySorter {...args} isMobile />
    </Box>
  ),
  args: {
    ...defaultArgs,
  },
};

export const Desktop: HealthCareFacilitySorterStory = {
  render: (args) => (
    <Box width="760px">
      <HealthCareFacilitySorter {...args} />
    </Box>
  ),
  args: {
    ...defaultArgs,
  },
};
