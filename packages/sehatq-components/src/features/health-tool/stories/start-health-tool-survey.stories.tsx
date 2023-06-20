import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { StartHealthToolSurvey, StartHealthToolProps } from "..";
import { Box } from "../../../user-interfaces";

export default {
  title: "Features / Health Tool / Start Health Tool Survey",
  component: StartHealthToolSurvey,
} as Meta;

type StartHealthToolSurveyStory = StoryObj<StartHealthToolProps>;

export const Desktop: StartHealthToolSurveyStory = {
  render: (args) => (
    <Box width="1070px">
      <StartHealthToolSurvey {...args} />
    </Box>
  ),
  args: {
    isMobile: false,
    slug: "test-sembilan-edit",
  },
};

export const Mobile: StartHealthToolSurveyStory = {
  render: (args) => (
    <Box width="360px">
      <StartHealthToolSurvey {...args} />
    </Box>
  ),
  args: {
    isMobile: true,
    slug: "test-sembilan-edit",
  },
};
