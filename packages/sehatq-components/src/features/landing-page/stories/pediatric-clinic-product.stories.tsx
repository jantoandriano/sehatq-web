import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import {
  PediatricClinicProduct,
  PediatricClinicProductProps,
} from "../pediatric-clinic-product";

export default {
  title: "Features / Landing Page / Pediatric Clinic Product",
  component: PediatricClinicProduct,
} as Meta;

type PediatricClinicProductStory = StoryObj<PediatricClinicProductProps>;
export const Desktop: PediatricClinicProductStory = {
  render: (args) => (
    <Box width="1160px">
      <PediatricClinicProduct {...args} />
    </Box>
  ),
  args: {
    isMobile: false,
  },
};

export const Mobile: PediatricClinicProductStory = {
  render: (args) => (
    <Box width="360px">
      <PediatricClinicProduct {...args} />
    </Box>
  ),
  args: {
    isMobile: true,
  },
};
