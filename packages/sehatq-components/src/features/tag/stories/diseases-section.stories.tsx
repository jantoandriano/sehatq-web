import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { DiseasesSectionProps, DiseasesSection } from "../diseases-section";
import { Box } from "../../../user-interfaces";

export default {
  title: "Features / Tag / Diseases Section",
  component: DiseasesSection,
} as Meta;

type DiseasesSectionStory = StoryObj<DiseasesSectionProps>;

export const Desktop: DiseasesSectionStory = {
  render: (args) => (
    <Box width="352px">
      <DiseasesSection {...args} />
    </Box>
  ),
  args: {
    tag: "batuk",
  },
};

export const Mobile: DiseasesSectionStory = {
  render: (args) => (
    <Box width="360px">
      <DiseasesSection {...args} />
    </Box>
  ),
  args: {
    ...Desktop.args,
    isMobile: true,
  },
};
