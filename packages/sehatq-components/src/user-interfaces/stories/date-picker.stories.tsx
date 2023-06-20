import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Box, DatePicker, DatePickerProps } from "..";

export default {
  title: "UI / Date Picker",
  component: DatePicker,
} as Meta;

type DatePickerStory = StoryObj<DatePickerProps>;

export const Desktop: DatePickerStory = {
  render: (args) => <DatePicker {...args} />,
  args: {
    value: new Date(),
    onChange: console.log,
    isMobile: false,
  },
};

export const Mobile: DatePickerStory = {
  render: (args) => (
    <Box width="328px">
      <DatePicker {...args} />
    </Box>
  ),
  args: {
    value: new Date(),
    onChange: console.log,
    isMobile: true,
  },
};
