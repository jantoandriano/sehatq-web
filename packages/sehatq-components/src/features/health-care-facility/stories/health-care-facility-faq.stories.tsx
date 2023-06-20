import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import { HealthCareFacilityFaq, HealthCareFacilityFaqProps } from "..";

export default {
  title: "Features / Health Care Facility / Health Care Facility Faq",
  component: HealthCareFacilityFaq,
} as Meta;

type HealthCareFacilityFaqStory = StoryObj<HealthCareFacilityFaqProps>;

const defaultArgs = {
  page: "1",
  perPage: "16",
};

export const Desktop: HealthCareFacilityFaqStory = {
  render: (args) => (
    <Box width="760px">
      <HealthCareFacilityFaq {...args} />
    </Box>
  ),
  args: {
    ...defaultArgs,
  },
};

export const Mobile: HealthCareFacilityFaqStory = {
  render: (args) => (
    <Box width="360px">
      <HealthCareFacilityFaq {...args} isMobile />
    </Box>
  ),
  args: {
    ...defaultArgs,
  },
};
