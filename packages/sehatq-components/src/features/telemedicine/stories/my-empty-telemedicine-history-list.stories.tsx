import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Box } from "../../../user-interfaces";
import { MyEmptyTelemedicineHistoryList } from "..";

export default {
  title: "Features / Telemedicine / My Empty Telemedicine History List",
  component: MyEmptyTelemedicineHistoryList,
} as Meta;

type MyEmptyTelemedicineHistoryListStory = StoryObj;

export const Desktop: MyEmptyTelemedicineHistoryListStory = {
  render: () => (
    <Box width="760px">
      <MyEmptyTelemedicineHistoryList />
    </Box>
  ),
};

export const Mobile: MyEmptyTelemedicineHistoryListStory = {
  render: () => (
    <Box width="328px">
      <MyEmptyTelemedicineHistoryList isMobile />
    </Box>
  ),
};
