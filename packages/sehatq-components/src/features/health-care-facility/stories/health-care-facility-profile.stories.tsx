import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import { HealthCareFacilityProfile, HealthCareFacilityProfileProps } from "..";

export default {
  title: "Features / Health Care Facility / Health Care Facility Profile",
  component: HealthCareFacilityProfile,
} as Meta;

type HealthCareFacilityProfileStory = StoryObj<HealthCareFacilityProfileProps>;

const defaultArgs = {
  slug: "rumah-sakit-harapan-sehati",
  userLat: "1.352083",
  userLong: "103.819836",
};

export const Desktop: HealthCareFacilityProfileStory = {
  render: (args) => (
    <Box width="760px">
      <HealthCareFacilityProfile {...args} />
    </Box>
  ),
  args: {
    ...defaultArgs,
  },
};

export const Mobile: HealthCareFacilityProfileStory = {
  render: (args) => (
    <Box width="328px">
      <HealthCareFacilityProfile {...args} isMobile />
    </Box>
  ),
  args: {
    ...defaultArgs,
  },
};
