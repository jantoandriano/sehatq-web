import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import { HealthCareFacilityFilters, HealthCareFacilityFiltersProps } from "..";

export default {
  title: "Features / Health Care Facility / Health Care Facility Filters",
  component: HealthCareFacilityFilters,
} as Meta;

type HealthCareFacilityFiltersStory = StoryObj<HealthCareFacilityFiltersProps>;

const defaultArgs = {
  page: 1,
};
export const Desktop: HealthCareFacilityFiltersStory = {
  render: (args) => (
    <Box width="760px">
      <HealthCareFacilityFilters {...args} />
    </Box>
  ),
  args: {
    ...defaultArgs,
  },
};

export const Mobile: HealthCareFacilityFiltersStory = {
  render: (args) => (
    <Box width="328px">
      <HealthCareFacilityFilters {...args} isMobile />
    </Box>
  ),
  args: {
    ...defaultArgs,
  },
};
