import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import {
  InternistClinicFastFact,
  InternistClinicFastFactProps,
} from "../internist-clinic-fast-fact";

export default {
  title: "Features / Landing Page / Internist Clinic Fast Fact",
  component: InternistClinicFastFact,
} as Meta;

type InternistClinicFastFactStory = StoryObj<InternistClinicFastFactProps>;
export const Desktop: InternistClinicFastFactStory = {
  render: (args) => (
    <Box width="1160px">
      <InternistClinicFastFact {...args} />
    </Box>
  ),
  args: {
    isMobile: false,
  },
};

export const Mobile: InternistClinicFastFactStory = {
  render: (args) => (
    <Box width="360px">
      <InternistClinicFastFact {...args} />
    </Box>
  ),
  args: {
    isMobile: true,
  },
};
