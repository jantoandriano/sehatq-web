import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import { InfographicList, InfographicListProps } from "..";

export default {
  title: "Features / Article / Infographic List",
  component: InfographicList,
} as Meta;

type InfographicListStory = StoryObj<InfographicListProps>;

const defaultArgs = {
  page: 1,
  perPage: 10,
};
export const Mobile: InfographicListStory = {
  render: (args) => (
    <Box width="328px">
      <InfographicList {...args} isMobile />
    </Box>
  ),
  args: {
    ...defaultArgs,
  },
};

export const Desktop: InfographicListStory = {
  render: (args) => (
    <Box width="760px">
      <InfographicList {...args} />
    </Box>
  ),
  args: {
    ...defaultArgs,
  },
};
