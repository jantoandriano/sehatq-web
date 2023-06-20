import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Box } from "../../../user-interfaces";
import { OvoFormCharge, OvoFormChargeProps } from "../ovo-form-charge";

export default {
  title: "Features / Waiting Payment / Ovo Form Charge",
  component: OvoFormCharge,
} as Meta;

type OvoFormChargeStory = StoryObj<OvoFormChargeProps>;

const args = {
  total: "210000",
  totalProductPrice: "210000",
};

export const Desktop: OvoFormChargeStory = {
  render: (args) => (
    <Box width="834px">
      <OvoFormCharge {...args} />
    </Box>
  ),
  args,
};

export const Mobile: OvoFormChargeStory = {
  render: (args) => (
    <Box width="328px">
      <OvoFormCharge {...args} isMobile />
    </Box>
  ),
  args,
};
