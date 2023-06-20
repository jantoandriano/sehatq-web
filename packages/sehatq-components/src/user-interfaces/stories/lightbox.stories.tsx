import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Box, LightBox, LightBoxProps } from "..";

export default {
  title: "UI / Lightbox",
  component: LightBox,
} as Meta;

type LightBoxStory = StoryObj<LightBoxProps>;

const imageUrls = [
  "https://cdn.pixabay.com/photo/2020/05/31/16/53/bookmarks-5243253_960_720.jpg",
  "https://bit.ly/sage-adebayo",
  "https://bit.ly/code-beast",
];

export const Basic: LightBoxStory = {
  render: (args) => (
    <Box>
      <LightBox {...args} />
    </Box>
  ),
  args: {
    isOpen: true,
    onClose: () => null,
    imageUrls,
  },
};
