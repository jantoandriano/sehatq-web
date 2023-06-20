import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { SehatQFooter, SehatQFooterProps } from "..";
import { Box } from "../../../user-interfaces";

export default {
  title: "Features / Layout / SehatQ Footer",
  component: SehatQFooter,
} as Meta;

type SehatQFooterStory = StoryObj<SehatQFooterProps>;

export const Desktop: SehatQFooterStory = {
  render: (args) => (
    <Box width="100%">
      <SehatQFooter {...args} />
    </Box>
  ),
  args: {},
};

export const Mobile: SehatQFooterStory = {
  render: (args) => (
    <Box width="320px" px={4} backgroundColor="white">
      <SehatQFooter {...args} />
    </Box>
  ),
  args: {
    ...Desktop.args,
    isMobile: true,
  },
};
