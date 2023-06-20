import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import {
  CardiacClinicProduct,
  CardiacClinicProductProps,
} from "../cardiac-clinic-product";

export default {
  title: "Features / Landing Page / Cardiac Clinic Product",
  component: CardiacClinicProduct,
} as Meta;

type CardiacClinicProductStory = StoryObj<CardiacClinicProductProps>;
export const Desktop: CardiacClinicProductStory = {
  render: (args) => (
    <Box width="1160px">
      <CardiacClinicProduct {...args} />
    </Box>
  ),
  args: {
    isMobile: false,
  },
};

export const Mobile: CardiacClinicProductStory = {
  render: (args) => (
    <Box width="360px">
      <CardiacClinicProduct {...args} />
    </Box>
  ),
  args: {
    isMobile: true,
  },
};
