import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import { DiseaseContent, DiseaseContentProps } from "../disease-content";

export default {
  title: "Features / Disease / Disease Content",
  component: DiseaseContent,
} as Meta;

type DiseaseContentStory = StoryObj<DiseaseContentProps>;
export const Desktop: DiseaseContentStory = {
  render: (args) => (
    <Box width="760px" bg="white">
      <DiseaseContent {...args} />
    </Box>
  ),
  args: {
    slug: "alergi-makanan",
  },
};

export const Mobile: DiseaseContentStory = {
  render: (args) => (
    <Box width="400px" bg="white">
      <DiseaseContent {...args} />
    </Box>
  ),
  args: {
    ...Desktop.args,
    isMobile: true,
  },
};
