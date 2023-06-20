import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import {
  DiseaseAlphabetFilter,
  DiseaseAlphabetFilterProps,
} from "../disease-alphabet-filter";

export default {
  title: "Features / Disease / Disease Alphabet Filter",
  component: DiseaseAlphabetFilter,
} as Meta;

type DiseaseAlphabetFilterStory = StoryObj<DiseaseAlphabetFilterProps>;
export const Desktop: DiseaseAlphabetFilterStory = {
  render: (args) => (
    <Box width="756px">
      <DiseaseAlphabetFilter {...args} />
    </Box>
  ),
  args: {
    alphabetSlug: "b",
    diseaseCategorySlug: "",
  },
};

export const Mobile: DiseaseAlphabetFilterStory = {
  render: (args) => (
    <Box w="15px">
      <DiseaseAlphabetFilter {...args} />
    </Box>
  ),
  args: {
    ...Desktop.args,
    isMobile: true,
  },
};
