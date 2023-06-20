import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Box } from "../../../user-interfaces";
import { PopularForumsProps, PopularForums } from "..";

export default {
  title: "Features / Forum / Popular Forums",
  component: PopularForums,
} as Meta;

type PopularForumsStory = StoryObj<PopularForumsProps>;

export const Desktop: PopularForumsStory = {
  render: (args) => (
    <Box width="960px">
      <PopularForums {...args} />
    </Box>
  ),
};

export const Mobile: PopularForumsStory = {
  render: (args) => (
    <Box width="360px">
      <PopularForums {...args} isMobile />
    </Box>
  ),
};
