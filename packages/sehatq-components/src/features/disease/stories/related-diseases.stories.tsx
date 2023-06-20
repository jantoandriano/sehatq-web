import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { RelatedDiseasesProps, RelatedDiseases } from "../related-diseases";
import { Box } from "../../../user-interfaces";

export default {
  title: "Features / Disease / Related Diseases",
  component: RelatedDiseases,
} as Meta;

type RelatedDiseasesStory = StoryObj<RelatedDiseasesProps>;

export const Desktop: RelatedDiseasesStory = {
  render: (args) => (
    <Box width="760px">
      <RelatedDiseases {...args} />
    </Box>
  ),
  args: {
    tagId: "73,1478",
  },
};

export const Mobile: RelatedDiseasesStory = {
  render: (args) => (
    <Box width="360px">
      <RelatedDiseases {...args} />
    </Box>
  ),
  args: {
    ...Desktop.args,
    isMobile: true,
  },
};
