import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import { ForumRatingInput, ForumRatingInputProps } from "..";

export default {
  title: "Features / Forum / Forum Rating Input",
  component: ForumRatingInput,
} as Meta;

type ForumRatingInputStory = StoryObj<ForumRatingInputProps>;
export const Mobile: ForumRatingInputStory = {
  render: (args) => (
    <Box width="328px">
      <ForumRatingInput {...args} isMobile />
    </Box>
  ),
  args: {
    forumId: 4250,
  },
};

export const Desktop: ForumRatingInputStory = {
  render: (args) => (
    <Box width="760px">
      <ForumRatingInput {...args} />
    </Box>
  ),
  args: {
    forumId: 4250,
  },
};
