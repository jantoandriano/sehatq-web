import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import {
  SelectedHCPFiltersResultSummary,
  SelectedHCPFiltersResultSummaryProps,
} from "..";

export default {
  title:
    "Features / Health Care Professional / Selected Health Care Professional Filter Result Summary",
  component: SelectedHCPFiltersResultSummary,
} as Meta;

type SelectedHCPFiltersResultSummaryStory =
  StoryObj<SelectedHCPFiltersResultSummaryProps>;

const defaultArgs = {
  page: "1",
  perPage: "9",
};
export const Mobile: SelectedHCPFiltersResultSummaryStory = {
  render: (args) => (
    <Box width="328px">
      <SelectedHCPFiltersResultSummary {...args} isMobile />
    </Box>
  ),
  args: {
    ...defaultArgs,
  },
};

export const Desktop: SelectedHCPFiltersResultSummaryStory = {
  render: (args) => (
    <Box width="760px">
      <SelectedHCPFiltersResultSummary {...args} />
    </Box>
  ),
  args: {
    ...defaultArgs,
  },
};
