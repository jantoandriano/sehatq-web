import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import { HCFFiltersResultSummary, HCFFiltersResultSummaryProps } from "..";

export default {
  title:
    "Features / Health Care Facility / Health Care Facility Filters Result Summary",
  component: HCFFiltersResultSummary,
} as Meta;

type HCFFiltersResultSummaryStory = StoryObj<HCFFiltersResultSummaryProps>;

const defaultArgs = {
  page: "1",
  perPage: "16",
};

export const Desktop: HCFFiltersResultSummaryStory = {
  render: (args) => (
    <Box width="760px">
      <HCFFiltersResultSummary {...args} />
    </Box>
  ),
  args: {
    ...defaultArgs,
    hcfTypeSlug: "rumah-sakit",
    citySlug: "jakarta-selatan",
    districtSlug: "cilandak",
  },
};

export const Mobile: HCFFiltersResultSummaryStory = {
  render: (args) => (
    <Box width="360px">
      <HCFFiltersResultSummary {...args} isMobile />
    </Box>
  ),
  args: {
    ...defaultArgs,
  },
};
