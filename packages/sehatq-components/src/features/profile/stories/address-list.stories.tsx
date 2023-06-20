import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { AddressListProps, AddressList } from "..";
import { Box } from "../../../user-interfaces";
export default {
  title: "Features / Profile / Address List",
  component: AddressList,
} as Meta;

const defaultArgs = {
  onClickAddress: (value: string) => console.log("click:", value),
  onEditAddress: (value: string) => console.log("edit:", value),
};

type AddressListStory = StoryObj<AddressListProps>;
export const Desktop: AddressListStory = {
  render: (args) => (
    <Box width="760px">
      <AddressList {...args} />
    </Box>
  ),
  args: { ...defaultArgs },
};

export const Mobile: AddressListStory = {
  render: (args) => (
    <Box width="328px">
      <AddressList {...args} isMobile />
    </Box>
  ),
  args: { ...defaultArgs },
};
