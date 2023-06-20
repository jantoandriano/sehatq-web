import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { ShippingAddressInputProps, ShippingAddressInput } from "..";
import { Box } from "../../../user-interfaces";
export default {
  title: "Features / Profile / Shipping Address Input",
  component: ShippingAddressInput,
} as Meta;

const defaultArgs = {
  onChange: (value: string) => console.log("addressId:", value),
};

type ShippingAddressInputStory = StoryObj<ShippingAddressInputProps>;

export const Desktop: ShippingAddressInputStory = {
  render: (args) => (
    <Box width="760px">
      <ShippingAddressInput {...args} />
    </Box>
  ),
  args: { ...defaultArgs },
};

export const Mobile: ShippingAddressInputStory = {
  render: (args) => (
    <Box width="328px">
      <ShippingAddressInput {...args} isMobile />
    </Box>
  ),
  args: { ...defaultArgs },
};
