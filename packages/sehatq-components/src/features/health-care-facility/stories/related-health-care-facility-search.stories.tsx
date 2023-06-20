import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import {
  RelatedHealthCareFacilitySearch,
  RelatedHealthCareFacilitySearchProps,
} from "..";

export default {
  title:
    "Features / Health Care Facility / Related Health Care Facility Search",
  component: RelatedHealthCareFacilitySearch,
} as Meta;

type RelatedHealthCareFacilitySearchStory =
  StoryObj<RelatedHealthCareFacilitySearchProps>;

const defaultArgs = {
  hcfId: "1865",
  hcfSlug: "rumah-sakit-eka-hospital-bsd",
};

export const Desktop: RelatedHealthCareFacilitySearchStory = {
  render: (args) => (
    <Box width="760px">
      <RelatedHealthCareFacilitySearch {...args} />
    </Box>
  ),
  args: {
    ...defaultArgs,
  },
};

export const Mobile: RelatedHealthCareFacilitySearchStory = {
  render: (args) => (
    <Box width="360px">
      <RelatedHealthCareFacilitySearch {...args} isMobile />
    </Box>
  ),
  args: {
    ...defaultArgs,
  },
};
