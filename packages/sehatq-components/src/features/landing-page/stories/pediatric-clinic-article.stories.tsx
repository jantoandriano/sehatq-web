import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import {
  PediatricClinicArticle,
  PediatricClinicArticleProps,
} from "../pediatric-clinic-article";

export default {
  title: "Features / Landing Page / Pediatric Clinic Article",
  component: PediatricClinicArticle,
} as Meta;

type PediatricClinicArticleStory = StoryObj<PediatricClinicArticleProps>;
export const Desktop: PediatricClinicArticleStory = {
  render: (args) => (
    <Box width="1160px">
      <PediatricClinicArticle {...args} />
    </Box>
  ),
  args: {
    isMobile: false,
  },
};

export const Mobile: PediatricClinicArticleStory = {
  render: (args) => (
    <Box width="360px">
      <PediatricClinicArticle {...args} />
    </Box>
  ),
  args: {
    isMobile: true,
  },
};
