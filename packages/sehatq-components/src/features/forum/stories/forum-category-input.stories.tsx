import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { ForumCategoryInputProps, ForumCategoryInput } from "..";
import { Box } from "../../../user-interfaces";

export default {
  title: "Features / Forum / Forum Category Input",
  component: ForumCategoryInput,
} as Meta;

type ForumCategoryInputStory = StoryObj<ForumCategoryInputProps>;

export const Desktop: ForumCategoryInputStory = {
  render: (args) => (
    <Box width="760px">
      <ForumCategoryInput {...args} />
    </Box>
  ),
  args: {
    onChange: (selected: { value: number; name: string }) =>
      console.log(selected),
    isMobile: false,
  },
};

export const Mobile: ForumCategoryInputStory = {
  render: (args) => (
    <Box width="328px">
      <ForumCategoryInput {...args} />
    </Box>
  ),
  args: {
    onChange: (selected: { value: number; name: string }) =>
      console.log(selected),
    isMobile: true,
  },
};
