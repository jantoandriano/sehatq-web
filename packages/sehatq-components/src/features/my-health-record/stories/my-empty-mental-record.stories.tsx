import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import {
  MyEmptyMentalRecordProps,
  MyEmptyMentalRecord,
} from "../my-empty-mental-record";
import { Box } from "../../../user-interfaces";

export default {
  title: "Features / My Health Record / My Empty Mental Record",
  component: MyEmptyMentalRecord,
} as Meta;

type MyEmptyMentalRecordStory = StoryObj<MyEmptyMentalRecordProps>;

export const Desktop: MyEmptyMentalRecordStory = {
  render: (args) => (
    <Box width="760px">
      <MyEmptyMentalRecord {...args} />
    </Box>
  ),
};

export const Mobile: MyEmptyMentalRecordStory = {
  render: (args) => (
    <Box width="360px">
      <MyEmptyMentalRecord {...args} />
    </Box>
  ),
  args: {
    isMobile: true,
  },
};
