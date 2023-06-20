import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Slider, SliderProps, Box, Flex } from "..";

export default {
  title: "UI / Slider",
  component: Slider,
} as Meta;

interface Item {
  id: number;
  width: number;
}

const slides = [
  { id: 1, width: 100 },
  { id: 2, width: 50 },
  { id: 3, width: 80 },
  { id: 4, width: 200 },
  { id: 5, width: 300 },
  { id: 6, width: 400 },
  { id: 7, width: 50 },
  { id: 8, width: 90 },
];

type SliderStory = StoryObj<SliderProps<Item>>;

export const Basic: SliderStory = {
  render: (args) => (
    <Box width={450}>
      <Slider {...args} />
    </Box>
  ),
  args: {
    slides,
    slidesToShow: 2,
    renderSlide: ({ slide }) => (
      <Flex
        key={slide.id}
        height={100}
        background="blue.400"
        justifyContent="center"
        alignItems="center"
      >
        {slide.id}
      </Flex>
    ),
  },
};

export const VariableWidth: SliderStory = {
  ...Basic,
  args: {
    slides,
    renderSlide: ({ slide }) => (
      <Flex
        key={slide.id}
        height={100}
        width={slide.width}
        justifyContent="center"
        background="blue.400"
        alignItems="center"
      >
        {slide.id}
      </Flex>
    ),
  },
};
