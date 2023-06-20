import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import {
  InternistClinicArticle,
  InternistClinicArticleProps,
} from "../internist-clinic-article";

export default {
  title: "Features / Landing Page / Internist Clinic Article",
  component: InternistClinicArticle,
} as Meta;

type InternistClinicArticleStory = StoryObj<InternistClinicArticleProps>;
export const Desktop: InternistClinicArticleStory = {
  render: (args) => (
    <Box width="1160px">
      <InternistClinicArticle {...args} />
    </Box>
  ),
  args: {
    isMobile: false,
  },
};

export const Mobile: InternistClinicArticleStory = {
  render: (args) => (
    <Box width="360px">
      <InternistClinicArticle {...args} />
    </Box>
  ),
  args: {
    isMobile: true,
  },
};
