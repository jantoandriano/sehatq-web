import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Box } from "../../../user-interfaces";
import { HealthToolListHeadline, HealthToolListHeadlineProps } from "..";
export default {
  title: "Features / Health Tool / Health Tool List Headline",
  component: HealthToolListHeadline,
} as Meta;

type HealthToolListHeadlineStory = StoryObj<HealthToolListHeadlineProps>;

export const Desktop: HealthToolListHeadlineStory = {
  render: (args) => (
    <Box width="1366px">
      <HealthToolListHeadline {...args} />
    </Box>
  ),
  args: {},
};
