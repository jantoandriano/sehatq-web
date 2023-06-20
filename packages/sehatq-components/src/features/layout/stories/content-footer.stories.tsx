import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { ContentFooter, ContentFooterProps } from "..";
import { Box } from "../../../user-interfaces";

export default {
  title: "Features / Layout / Content Footer",
  component: ContentFooter,
} as Meta;

type ContentFooterStory = StoryObj<ContentFooterProps>;

export const Desktop: ContentFooterStory = {
  render: (args) => (
    <Box width="700px">
      <ContentFooter {...args} />
    </Box>
  ),
  args: { isMobile: false },
};

export const Mobile: ContentFooterStory = {
  render: (args) => (
    <Box width="320px" px={4} backgroundColor="white">
      <ContentFooter {...args} />
    </Box>
  ),
  args: {
    ...Desktop.args,
    isMobile: true,
  },
};
