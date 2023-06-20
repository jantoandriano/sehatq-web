import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import {
  HealthCareFacilityFeatures,
  HealthCareFacilityFeaturesProps,
} from "..";

export default {
  title: "Features / Health Care Facility / Health Care Facility Features",
  component: HealthCareFacilityFeatures,
} as Meta;

type HealthCareFacilityFeaturesStory =
  StoryObj<HealthCareFacilityFeaturesProps>;

const defaultArgs = {
  slug: "rumah-sakit-harapan-sehati",
  userLat: "1.352083",
  userLong: "103.819836",
};

export const Desktop: HealthCareFacilityFeaturesStory = {
  render: (args) => (
    <Box width="760px">
      <HealthCareFacilityFeatures {...args} />
    </Box>
  ),
  args: {
    ...defaultArgs,
  },
};

export const Mobile: HealthCareFacilityFeaturesStory = {
  render: (args) => (
    <Box width="328px">
      <HealthCareFacilityFeatures {...args} isMobile />
    </Box>
  ),
  args: {
    ...defaultArgs,
  },
};
