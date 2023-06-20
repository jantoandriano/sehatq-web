import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import { HealthToolList, HealthToolListProps } from "..";

export default {
  title: "Features / Health Tool / Health Tool List",
  component: HealthToolList,
} as Meta;

type HealthToolListStory = StoryObj<HealthToolListProps>;

const defaultArgs = {
  page: "1",
  perPage: "10",
  keyword: "",
};

export const Desktop: HealthToolListStory = {
  render: (args) => (
    <Box width="760px">
      <HealthToolList {...args} />
    </Box>
  ),
  args: {
    ...defaultArgs,
  },
};

export const Mobile: HealthToolListStory = {
  render: (args) => (
    <Box width="328px">
      <HealthToolList {...args} isMobile />
    </Box>
  ),
  args: {
    ...defaultArgs,
  },
};
