import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import {
  CardiacClinicArticle,
  CardiacClinicArticleProps,
} from "../cardiac-clinic-article";

export default {
  title: "Features / Landing Page / Cardiac Clinic Article",
  component: CardiacClinicArticle,
} as Meta;

type CardiacClinicArticleStory = StoryObj<CardiacClinicArticleProps>;
export const Desktop: CardiacClinicArticleStory = {
  render: (args) => (
    <Box width="1160px">
      <CardiacClinicArticle {...args} />
    </Box>
  ),
  args: {
    isMobile: false,
  },
};

export const Mobile: CardiacClinicArticleStory = {
  render: (args) => (
    <Box width="360px">
      <CardiacClinicArticle {...args} />
    </Box>
  ),
  args: {
    isMobile: true,
  },
};
