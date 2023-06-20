import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Box, AspectRatio, AspectRatioProps } from "..";

export default {
  title: "UI / Aspect Ratio",
  component: AspectRatio,
} as Meta;

type AspectRatioStory = StoryObj<AspectRatioProps>;

export const Desktop: AspectRatioStory = {
  render: (args) => (
    <Box width="760px">
      <AspectRatio {...args}>
        <Box>
          Kamu tidak dapat memberikan rating dan review lebih dari 8 hari
          setelah waktu konsultasi.
        </Box>
      </AspectRatio>
    </Box>
  ),
  args: {
    backgroundColor: "red",
    ratio: 16 / 9,
  },
};

export const Mobile: AspectRatioStory = {
  render: (args) => (
    <Box width="360px">
      <AspectRatio {...args}>
        <Box>
          Kamu tidak dapat memberikan rating dan review lebih dari 8 hari
          setelah waktu konsultasi.
        </Box>
      </AspectRatio>
    </Box>
  ),
  args: {
    ...Desktop.args,
  },
};
