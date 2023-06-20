import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import {
  ForumTagsProps,
  ForumTags,
  ForumTagsSkeletonProps,
  ForumTagsSkeleton,
} from "..";
import { Box } from "../../../user-interfaces";

export default {
  title: "Features / Forum / Forum Tags",
  component: ForumTags,
} as Meta;

type ForumTagsStory = StoryObj<ForumTagsProps>;
type ForumTagsSkeletonStory = StoryObj<ForumTagsSkeletonProps>;

export const Desktop: ForumTagsStory = {
  render: (args) => (
    <Box width="760px" background="white">
      <ForumTags {...args} />
    </Box>
  ),
  args: {
    forumSlug: "demam-pada-anak-saat-malam-hari",
  },
};

export const Mobile: ForumTagsStory = {
  render: (args) => (
    <Box width="328px" background="white">
      <ForumTags {...args} />
    </Box>
  ),
  args: {
    ...Desktop.args,
    isMobile: true,
  },
};

export const SkeletonDesktop: ForumTagsSkeletonStory = {
  render: (args) => (
    <Box width="760px" background="white">
      <ForumTagsSkeleton {...args} />
    </Box>
  ),
  args: {},
};

export const SkeletonMobile: ForumTagsSkeletonStory = {
  render: (args) => (
    <Box width="328px" background="white">
      <ForumTagsSkeleton {...args} />
    </Box>
  ),
  args: {
    isMobile: true,
  },
};
