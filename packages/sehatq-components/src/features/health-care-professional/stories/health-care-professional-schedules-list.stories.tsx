import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import { HCPSchedulesList, HCPSchedulesListProps } from "..";

export default {
  title:
    "Features / Health Care Professional / Health Care Professional Schedules List",
  component: HCPSchedulesList,
} as Meta;

type HCPSchedulesListStory = StoryObj<HCPSchedulesListProps>;

const defaultArgs = {
  hcpSlug: "dr-b-r-m-sarsono-spb-spba",
};

export const Desktop: HCPSchedulesListStory = {
  render: (args) => (
    <Box width="760px">
      <HCPSchedulesList {...args} />
    </Box>
  ),
  args: { ...defaultArgs, isMobile: false },
};

export const Mobile: HCPSchedulesListStory = {
  render: (args) => (
    <Box width="328px">
      <HCPSchedulesList {...args} />
    </Box>
  ),
  args: { ...defaultArgs, isMobile: true },
};
