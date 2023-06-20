import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Box } from "../../../user-interfaces";
import { MyEmptyBookedTelemedicineList } from "..";
export default {
  title: "Features / Telemedicine / My Empty Booked Telemedicine List",
  component: MyEmptyBookedTelemedicineList,
} as Meta;

type MyEmptyBookedTelemedicineListStory = StoryObj;

export const Desktop: MyEmptyBookedTelemedicineListStory = {
  render: () => (
    <Box width="720px">
      <MyEmptyBookedTelemedicineList />
    </Box>
  ),
};

export const Mobile: MyEmptyBookedTelemedicineListStory = {
  render: () => (
    <Box width="328px">
      <MyEmptyBookedTelemedicineList isMobile />
    </Box>
  ),
};
