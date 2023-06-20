import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import { TagHeadline, TagHeadlineProps } from "..";

export default {
  title: "Features / Tag / Tag Headline",
  component: TagHeadline,
} as Meta;

const tagSlug = "coronavirus";

type TagHeadlineStory = StoryObj<TagHeadlineProps>;
export const Mobile: TagHeadlineStory = {
  render: (args) => (
    <Box width="328px">
      <TagHeadline {...args} isMobile />
    </Box>
  ),
  args: {
    tagSlug,
  },
};

export const Desktop: TagHeadlineStory = {
  render: (args) => (
    <Box width="760px">
      <TagHeadline {...args} />
    </Box>
  ),
  args: {
    tagSlug,
  },
};
