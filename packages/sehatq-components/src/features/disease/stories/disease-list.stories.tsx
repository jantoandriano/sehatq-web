import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { DiseaseList, DiseaseListProps } from "../disease-list";
import { Box } from "../../../user-interfaces";

export default {
  title: "Features / Disease / Disease List",
  component: DiseaseList,
} as Meta;

type HeadlineStory = StoryObj<DiseaseListProps>;

export const Desktop: HeadlineStory = {
  render: (args) => (
    <Box width="756px" bg="white">
      <DiseaseList {...args} />
    </Box>
  ),
  args: {
    isMobile: false,
    categorySlug: "infeksi",
    alphabetSlug: "",
  },
};

export const Mobile: HeadlineStory = {
  render: (args) => (
    <Box width="360px" bg="white">
      <DiseaseList {...args} />
    </Box>
  ),
  args: {
    ...Desktop.args,
    isMobile: true,
  },
};
