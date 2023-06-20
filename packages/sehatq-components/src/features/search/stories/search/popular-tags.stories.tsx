import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { PopularTags } from "../..";
import { Box } from "../../../../user-interfaces";

export default {
  title: "Features / Search / Popular Tags ",
  component: PopularTags,
} as Meta;

type PopularTagsStory = StoryObj<unknown>;

export const Desktop: PopularTagsStory = {
  render: () => (
    <Box width="528px">
      <PopularTags />
    </Box>
  ),
};

export const Mobile: PopularTagsStory = {
  render: () => (
    <Box width="360px">
      <PopularTags />
    </Box>
  ),
  args: {
    isMobile: true,
  },
};
