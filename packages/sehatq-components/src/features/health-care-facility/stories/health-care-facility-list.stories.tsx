import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import { HealthCareFacilityList, HealthCareFacilityListProps } from "..";

export default {
  title: "Features / Health Care Facility / Health Care Facility List",
  component: HealthCareFacilityList,
} as Meta;

type HealthCareFacilityListStory = StoryObj<HealthCareFacilityListProps>;

const defaultArgs = {
  page: "1",
  perPage: "16",
};

export const Desktop: HealthCareFacilityListStory = {
  render: (args) => (
    <Box width="760px">
      <HealthCareFacilityList {...args} />
    </Box>
  ),
  args: {
    ...defaultArgs,
  },
};

export const Mobile: HealthCareFacilityListStory = {
  render: (args) => (
    <Box width="328px">
      <HealthCareFacilityList {...args} isMobile />
    </Box>
  ),
  args: {
    ...defaultArgs,
  },
};
