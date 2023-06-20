import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Box } from "../../../user-interfaces";
import { MyTelemedicineHistoryList, MyTelemedicineHistoryListProps } from "..";
export default {
  title: "Features / Telemedicine / My Telemedicine History List",
  component: MyTelemedicineHistoryList,
} as Meta;

type MyTelemedicineHistoryListStory = StoryObj<MyTelemedicineHistoryListProps>;

const defaultArgs = {
  page: "1",
  perPage: "10",
  userId: "",
};

export const Desktop: MyTelemedicineHistoryListStory = {
  render: (args) => (
    <Box width="760px">
      <MyTelemedicineHistoryList {...args} />
    </Box>
  ),
  args: {
    ...defaultArgs,
  },
};

export const Mobile: MyTelemedicineHistoryListStory = {
  render: (args) => (
    <Box width="328px">
      <MyTelemedicineHistoryList {...args} isMobile />
    </Box>
  ),
  args: {
    ...defaultArgs,
  },
};
