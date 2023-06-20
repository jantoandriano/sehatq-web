import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import {
  EmptyHealthCareFacilityList,
  EmptyHealthCareFacilityListProps,
} from "..";

export default {
  title: "Features / Health Care Facility / Empty Health Care Facility List",
  component: EmptyHealthCareFacilityList,
} as Meta;

type EmptyHealthCareFacilityListStory =
  StoryObj<EmptyHealthCareFacilityListProps>;

export const Desktop: EmptyHealthCareFacilityListStory = {
  render: (args) => (
    <Box width="760px">
      <EmptyHealthCareFacilityList {...args} />
    </Box>
  ),
  args: {},
};

export const Mobile: EmptyHealthCareFacilityListStory = {
  render: (args) => (
    <Box width="360px">
      <EmptyHealthCareFacilityList {...args} isMobile />
    </Box>
  ),
  args: {},
};
