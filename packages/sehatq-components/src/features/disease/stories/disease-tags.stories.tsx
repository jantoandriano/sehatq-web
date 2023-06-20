import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import { DiseaseTags, DiseaseTagsProps } from "../disease-tags";

export default {
  title: "Features / Disease / Disease Tags",
  component: DiseaseTags,
} as Meta;

type DiseaseTagsStory = StoryObj<DiseaseTagsProps>;
export const Desktop: DiseaseTagsStory = {
  render: (args) => (
    <Box width="760px">
      <DiseaseTags {...args} />
    </Box>
  ),
  args: {
    slug: "hematoma-epidural",
  },
};

export const Mobile: DiseaseTagsStory = {
  render: (args) => (
    <Box width="360px">
      <DiseaseTags {...args} />
    </Box>
  ),
  args: {
    ...Desktop.args,
    isMobile: true,
  },
};
