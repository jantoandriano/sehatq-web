import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import {
  ForumQuestionProps,
  ForumQuestion,
  ForumQuestionSkeletonProps,
  ForumQuestionSkeleton,
} from "..";
import { Box } from "../../../user-interfaces";

export default {
  title: "Features / Forum / Forum Question",
  component: ForumQuestion,
} as Meta;

type ForumQuestionStory = StoryObj<ForumQuestionProps>;
type ForumQuestionSkeletonStory = StoryObj<ForumQuestionSkeletonProps>;

export const Desktop: ForumQuestionStory = {
  render: (args) => (
    <Box width="760px" background="white">
      <ForumQuestion {...args} />
    </Box>
  ),
  args: {
    forumSlug: "demam-pada-anak-saat-malam-hari",
  },
};

export const Mobile: ForumQuestionStory = {
  render: (args) => (
    <Box width="328px" background="white">
      <ForumQuestion {...args} />
    </Box>
  ),
  args: {
    ...Desktop.args,
    isMobile: true,
  },
};

export const SkeletonDesktop: ForumQuestionSkeletonStory = {
  render: (args) => (
    <Box width="760px" background="white">
      <ForumQuestionSkeleton {...args} />
    </Box>
  ),
  args: {},
};

export const SkeletonMobile: ForumQuestionSkeletonStory = {
  render: (args) => (
    <Box width="328px" background="white">
      <ForumQuestionSkeleton {...args} />
    </Box>
  ),
  args: {
    isMobile: true,
  },
};
