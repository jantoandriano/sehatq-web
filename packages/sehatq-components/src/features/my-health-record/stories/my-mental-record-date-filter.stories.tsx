import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { MyMentalRecordDateFilter, MyMentalRecordDateFilterProps } from "..";
import { Box } from "../../../user-interfaces";

export default {
  title: "Features / My Health Record / My Mental Record Date Filter",
  component: MyMentalRecordDateFilter,
} as Meta;

type MyMentalRecordDateFilterStory = StoryObj<MyMentalRecordDateFilterProps>;

export const Desktop: MyMentalRecordDateFilterStory = {
  render: (args) => (
    <Box overflowY="auto">
      <MyMentalRecordDateFilter {...args} />
    </Box>
  ),
  args: {
    userId: "947",
  },
};

export const Mobile: MyMentalRecordDateFilterStory = {
  ...Desktop,
  args: {
    ...Desktop.args,
    isMobile: true,
  },
};
