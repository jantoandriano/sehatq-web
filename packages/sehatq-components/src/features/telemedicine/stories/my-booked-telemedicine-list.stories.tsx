import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Box } from "../../../user-interfaces";
import { MyBookedTelemedicineList, MyBookedTelemedicineListProps } from "..";

export default {
  title: "Features / Telemedicine / My Booked Telemedicine List",
  component: MyBookedTelemedicineList,
} as Meta;

type MyBookedTelemedicineListStory = StoryObj<MyBookedTelemedicineListProps>;

const defaultArgs = {
  page: "1",
  perPage: "10",
  userId: "",
};

export const Desktop: MyBookedTelemedicineListStory = {
  render: (args) => (
    <Box width="720px">
      <MyBookedTelemedicineList {...args} />
    </Box>
  ),
  args: {
    ...defaultArgs,
  },
};

export const Mobile: MyBookedTelemedicineListStory = {
  render: (args) => (
    <Box width="328px">
      <MyBookedTelemedicineList {...args} isMobile />
    </Box>
  ),
  args: {
    ...defaultArgs,
  },
};
