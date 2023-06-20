import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import { MyMentalRecords, MyMentalRecordsProps } from "..";

export default {
  title: "Features / My Health Record / My Health Records",
  component: MyMentalRecords,
} as Meta;

type MyMentalRecordsStory = StoryObj<MyMentalRecordsProps>;

const defaultArgs = {
  page: "1",
  perPage: "5",
  userId: "947",
  dateRange: "last_months",
};

export const Desktop: MyMentalRecordsStory = {
  render: (args) => (
    <Box width="760px">
      <MyMentalRecords {...args} />
    </Box>
  ),
  args: {
    ...defaultArgs,
  },
};

export const Mobile: MyMentalRecordsStory = {
  render: (args) => (
    <Box width="360px">
      <MyMentalRecords {...args} isMobile />
    </Box>
  ),
  args: {
    ...defaultArgs,
  },
};
