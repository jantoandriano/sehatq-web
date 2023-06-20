import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import { DiseaseReference, DiseaseReferenceProps } from "../disease-reference";

export default {
  title: "Features / Disease / Disease Reference",
  component: DiseaseReference,
} as Meta;

type DiseaseReferenceStory = StoryObj<DiseaseReferenceProps>;

export const Desktop: DiseaseReferenceStory = {
  render: (args) => (
    <Box width="760px">
      <DiseaseReference {...args} />
    </Box>
  ),
  args: {
    isMobile: false,
    slug: "abses-hati-piogenik",
  },
};

export const Mobile: DiseaseReferenceStory = {
  render: (args) => (
    <Box width="328px">
      <DiseaseReference {...args} />
    </Box>
  ),
  args: {
    ...Desktop.args,
    isMobile: true,
  },
};
