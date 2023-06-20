import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Box } from "../../../user-interfaces";
import { MyPrescriptionsFilters, MyPrescriptionsFiltersProps } from "..";

export default {
  title: "Features / My Prescription / My Prescription Filters",
  component: MyPrescriptionsFilters,
} as Meta;

type MyPrescriptionsFiltersStory = StoryObj<MyPrescriptionsFiltersProps>;

export const Desktop: MyPrescriptionsFiltersStory = {
  render: (args) => (
    <Box width="722px">
      <MyPrescriptionsFilters {...args} />
    </Box>
  ),
  args: {},
};

export const Mobile: MyPrescriptionsFiltersStory = {
  render: (args) => (
    <Box width="328px">
      <MyPrescriptionsFilters {...args} />
    </Box>
  ),
  args: {
    isMobile: true,
  },
};
