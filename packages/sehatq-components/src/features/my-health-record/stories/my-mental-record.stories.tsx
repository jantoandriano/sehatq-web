import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import { MyMentalRecord, MyMentalRecordProps } from "..";

export default {
  title: "Features / My Health Record / My Health Record",
  component: MyMentalRecord,
} as Meta;

type MyMentalRecordStory = StoryObj<MyMentalRecordProps>;

export const Desktop: MyMentalRecordStory = {
  render: (args) => (
    <Box width="760px">
      <MyMentalRecord {...args} />
    </Box>
  ),
  args: {
    mentalId: "68",
  },
};

export const Mobile: MyMentalRecordStory = {
  render: (args) => (
    <Box width="360px">
      <MyMentalRecord {...args} />
    </Box>
  ),
  args: {
    ...Desktop.args,
    isMobile: true,
  },
};
