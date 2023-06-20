import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import {
  HealthCareFacilityDetailCard,
  HealthCareFacilityDetailCardProps,
} from "..";

export default {
  title: "Features / Health Care Facility / Health Care Facility Detail Card",
  component: HealthCareFacilityDetailCard,
} as Meta;

type HealthCareFacilityDetailCardStory =
  StoryObj<HealthCareFacilityDetailCardProps>;

const defaultArgs = {
  slug: "rumah-sakit-harapan-sehati",
  userLat: "1.352083",
  userLong: "103.819836",
};

export const Desktop: HealthCareFacilityDetailCardStory = {
  render: (args) => (
    <Box width="760px">
      <HealthCareFacilityDetailCard {...args} />
    </Box>
  ),
  args: {
    ...defaultArgs,
  },
};

export const Mobile: HealthCareFacilityDetailCardStory = {
  render: (args) => (
    <Box width="328px">
      <HealthCareFacilityDetailCard {...args} isMobile />
    </Box>
  ),
  args: {
    ...defaultArgs,
  },
};
