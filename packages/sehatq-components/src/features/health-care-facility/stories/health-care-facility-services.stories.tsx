import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import {
  HealthCareFacilityServices,
  HealthCareFacilityServicesProps,
} from "..";

export default {
  title: "Features / Health Care Facility / Health Care Facility Services",
  component: HealthCareFacilityServices,
} as Meta;

type HealthCareFacilityServicesStory =
  StoryObj<HealthCareFacilityServicesProps>;

const defaultArgs = {
  slug: "rumah-sakit-harapan-sehati",
};

export const Desktop: HealthCareFacilityServicesStory = {
  render: (args) => (
    <Box width="760px">
      <HealthCareFacilityServices {...args} />
    </Box>
  ),
  args: {
    ...defaultArgs,
  },
};

export const Mobile: HealthCareFacilityServicesStory = {
  render: (args) => (
    <Box width="360px">
      <HealthCareFacilityServices {...args} isMobile />
    </Box>
  ),
  args: {
    ...defaultArgs,
  },
};
