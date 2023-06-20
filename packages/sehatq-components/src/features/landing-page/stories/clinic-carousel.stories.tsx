import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Box, Flex } from "../../../user-interfaces";

import { ClinicCarousel, ClinicCarouselProps } from "../clinic-carousel";

export default {
  title: "Features / Landing Page / Clinic Carousel",
  component: ClinicCarousel,
} as Meta;
interface Item {
  id: number;
}

const slides = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 },
  { id: 7 },
  { id: 8 },
];

type ClinicCarouselStory = StoryObj<ClinicCarouselProps<Item>>;

export const Desktop: ClinicCarouselStory = {
  render: (args) => (
    <Box width="750px">
      <ClinicCarousel {...args} />
    </Box>
  ),
  args: {
    slides,
    slidesToShow: 3,
    slideGap: 3,
    renderSlide: ({ slide }) => (
      <Flex
        key={slide.id}
        height={100}
        background="blue.400"
        justifyContent="center"
        alignItems="center"
        color="white"
      >
        {slide.id}
      </Flex>
    ),
  },
};
