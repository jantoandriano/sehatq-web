import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import {
  SimpleDiseaseCard,
  SimpleDiseaseCardProps,
} from "../simple-disease-card";

export default {
  title: "Features / Disease / Simple Disease Card",
  component: SimpleDiseaseCard,
} as Meta;

type SimpleDiseaseCardStory = StoryObj<SimpleDiseaseCardProps>;
export const Desktop: SimpleDiseaseCardStory = {
  render: (args) => (
    <Box w="174px">
      <SimpleDiseaseCard {...args} />
    </Box>
  ),
  args: {
    slug: "flu-babi",
    name: "Flu Babi",
    imageUrl:
      "https://cms-dev.sehatq.com/public/img/disease_img/flu-babi-1561087131.jpg",
    imageAlt: "image-banner",
  },
};

export const Mobile: SimpleDiseaseCardStory = {
  render: (args) => (
    <Box width="130px">
      <SimpleDiseaseCard {...args} />
    </Box>
  ),
  args: {
    ...Desktop.args,
    isMobile: true,
  },
};
