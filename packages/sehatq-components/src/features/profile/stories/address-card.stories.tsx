import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { AddressCardProps, AddressCard } from "..";
import { Box } from "../../../user-interfaces";
export default {
  title: "Features / Profile / Address Card",
  component: AddressCard,
} as Meta;

const defaultArgs = {
  id: "1",
  receiverName: "David Haruto",
  label: "Kantor",
  address: "PT Sehat Bugar Jalan M.H.Thamrin No. 20, lantai 18",
  phone: "081212349876",
  note: "Rumah paling pojok, pager hitam",
  isDefault: true,
  googlePlaceId: "ChIJ2_Mztk2LcC4R1iIHG0wjDHU",
  isSelected: true,
  onSelect: (value: string) => console.log(value),
  onEditAddress: (value: string) => console.log(value),
};

type AddressCardStory = StoryObj<AddressCardProps>;
export const Desktop: AddressCardStory = {
  render: (args) => (
    <Box width="760px">
      <AddressCard {...args} />
    </Box>
  ),
  args: { ...defaultArgs },
};

export const Mobile: AddressCardStory = {
  render: (args) => (
    <Box width="328px">
      <AddressCard {...args} isMobile />
    </Box>
  ),
  args: { ...defaultArgs },
};
