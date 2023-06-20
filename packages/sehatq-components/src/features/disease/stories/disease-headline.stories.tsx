import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import { DiseaseHeadline, DiseaseHeadlineProps } from "../disease-headline";

export default {
  title: "Features / Disease / Disease Headline",
  component: DiseaseHeadline,
} as Meta;

type DiseaseHeadlineStory = StoryObj<DiseaseHeadlineProps>;
export const Desktop: DiseaseHeadlineStory = {
  render: (args) => (
    <Box width="760px">
      <DiseaseHeadline {...args} />
    </Box>
  ),
  args: {
    slug: "hematoma-epidural",
  },
};

export const Mobile: DiseaseHeadlineStory = {
  render: (args) => (
    <Box width="328px">
      <DiseaseHeadline {...args} />
    </Box>
  ),
  args: {
    ...Desktop.args,
    isMobile: true,
  },
};
