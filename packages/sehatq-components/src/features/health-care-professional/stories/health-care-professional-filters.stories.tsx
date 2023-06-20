import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import {
  HealthCareProfessionalFilters,
  HealthCareProfessionalFiltersProps,
} from "..";

export default {
  title:
    "Features / Health Care Professional / Health Care Professional Filters",
  component: HealthCareProfessionalFilters,
} as Meta;

type HealthCareProfessionalFiltersStory =
  StoryObj<HealthCareProfessionalFiltersProps>;

const defaultArgs = {
  genderDefaultValue: "m",
};
export const Mobile: HealthCareProfessionalFiltersStory = {
  render: (args) => (
    <Box width="328px">
      <HealthCareProfessionalFilters {...args} isMobile />
    </Box>
  ),
  args: {
    ...defaultArgs,
  },
};

export const Desktop: HealthCareProfessionalFiltersStory = {
  render: (args) => (
    <Box width="760px">
      <HealthCareProfessionalFilters {...args} />
    </Box>
  ),
  args: {
    ...defaultArgs,
  },
};
