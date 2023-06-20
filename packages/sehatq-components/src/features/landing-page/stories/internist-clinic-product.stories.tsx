import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import {
  InternistClinicProduct,
  InternistClinicProductProps,
} from "../internist-clinic-product";

export default {
  title: "Features / Landing Page / Internist Clinic Product",
  component: InternistClinicProduct,
} as Meta;

type InternistClinicProductStory = StoryObj<InternistClinicProductProps>;
export const Desktop: InternistClinicProductStory = {
  render: (args) => (
    <Box width="1160px">
      <InternistClinicProduct {...args} />
    </Box>
  ),
  args: {
    isMobile: false,
  },
};

export const Mobile: InternistClinicProductStory = {
  render: (args) => (
    <Box width="360px">
      <InternistClinicProduct {...args} />
    </Box>
  ),
  args: {
    isMobile: true,
  },
};
