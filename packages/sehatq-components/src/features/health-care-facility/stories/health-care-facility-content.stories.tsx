import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { HCFContentProps, HCFContent } from "..";
import { Box } from "../../../user-interfaces";

export default {
  title: "Features / Health Care Facility / Health Care Facility Content",
  component: HCFContent,
} as Meta;

type HCFContentStory = StoryObj<HCFContentProps>;

const defaultArgs = {
  hcfTypeSlug: "faskes",
};

export const Desktop: HCFContentStory = {
  render: (args) => (
    <Box width="760px">
      <HCFContent {...args} />
    </Box>
  ),
  args: defaultArgs,
};

export const Mobile: HCFContentStory = {
  render: (args) => (
    <Box width="360px">
      <HCFContent {...args} />
    </Box>
  ),
  args: {
    ...defaultArgs,
    isMobile: true,
  },
};
