import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { TagContentProps, TagContent } from "../tag-content";
import { Box } from "../../../user-interfaces";

export default {
  title: "Features / Tag / Tag Content",
  component: TagContent,
} as Meta;

type TagContentStory = StoryObj<TagContentProps>;

export const Desktop: TagContentStory = {
  render: (args) => (
    <Box width="720px">
      <TagContent {...args} />
    </Box>
  ),
  args: {
    slug: "coronavirus",
  },
};

export const Mobile: TagContentStory = {
  render: (args) => (
    <Box width="360px">
      <TagContent {...args} />
    </Box>
  ),
  args: {
    ...Desktop.args,
    isMobile: true,
  },
};
