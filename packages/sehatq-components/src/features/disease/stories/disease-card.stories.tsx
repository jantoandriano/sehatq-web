import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";

import { DiseaseCardSkeleton, DiseaseCard, DiseaseCardProps } from "..";

export default {
  title: "Features / Disease / Disease Card",
  component: DiseaseCard,
} as Meta;

type DiseaseCardStory = StoryObj<DiseaseCardProps>;
export const Desktop: DiseaseCardStory = {
  render: (args) => (
    <Box width="760px">
      <DiseaseCard {...args} />
    </Box>
  ),
  args: {
    slug: "adenoiditis",
    title: "Adenoiditis",
    introduction:
      "Adenoiditis adalah istilah medis untuk peradangan kelenjar adenoid. Kelenjar ini terletak pada langit-langit mulut sebelah dalam, yaitu di belakang rongga hidung.",
    imageUrl:
      "https://cms.sehatq.com/public/img/disease_thumb/adenoiditis-thumb-1570785879.jpg",
    imageAlt: "Adenoiditis",
  },
};

export const Mobile: DiseaseCardStory = {
  render: (args) => (
    <Box width="360px">
      <DiseaseCard {...args} />
    </Box>
  ),
  args: {
    ...Desktop.args,
  },
};

export const Skeleton = {
  render: () => (
    <Box width="360px">
      <DiseaseCardSkeleton />
    </Box>
  ),
};
