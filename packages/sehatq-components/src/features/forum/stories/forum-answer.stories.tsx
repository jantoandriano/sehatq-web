import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import {
  ForumAnswerProps,
  ForumAnswer,
  ForumAnswerSkeletonProps,
  ForumAnswerSkeleton,
} from "..";
import { Box } from "../../../user-interfaces";

export default {
  title: "Features / Forum / Forum Answer",
  component: ForumAnswer,
} as Meta;

type ForumAnswerStory = StoryObj<ForumAnswerProps>;
type ForumAnswerSkeletonStory = StoryObj<ForumAnswerSkeletonProps>;

export const Desktop: ForumAnswerStory = {
  render: (args) => (
    <Box width="760px" background="white">
      <ForumAnswer {...args} />
    </Box>
  ),
  args: {
    forumSlug: "demam-pada-anak-saat-malam-hari",
    forumId: 1648,
  },
};

export const Mobile: ForumAnswerStory = {
  render: (args) => (
    <Box width="328px" background="white">
      <ForumAnswer {...args} />
    </Box>
  ),
  args: {
    ...Desktop.args,
    isMobile: true,
  },
};

export const SkeletonDesktop: ForumAnswerSkeletonStory = {
  render: (args) => (
    <Box width="760px" background="white">
      <ForumAnswerSkeleton {...args} />
    </Box>
  ),
  args: {},
};

export const SkeletonMobile: ForumAnswerSkeletonStory = {
  render: (args) => (
    <Box width="328px" background="white">
      <ForumAnswerSkeleton {...args} />
    </Box>
  ),
  args: {
    isMobile: true,
  },
};
