import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { ShippingAddressFormProps, ShippingAddressForm } from "..";
import { Box } from "../../../user-interfaces";
export default {
  title: "Features / Profile / Shipping Address Form",
  component: ShippingAddressForm,
} as Meta;

type ShippingAddressFormStory = StoryObj<ShippingAddressFormProps>;
const defaultArgs = {
  onSuccess: (addressId: string) => console.log(addressId),
};
export const Desktop: ShippingAddressFormStory = {
  render: (args) => (
    <Box width="760px">
      <ShippingAddressForm {...args} />
    </Box>
  ),
  args: { ...defaultArgs },
};

export const Mobile: ShippingAddressFormStory = {
  render: (args) => (
    <Box width="360px">
      <ShippingAddressForm {...args} isMobile />
    </Box>
  ),
  args: { ...defaultArgs },
};
