import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { NavigationBlock, NavigationBlockProps, SimpleBlock } from "..";
import { Box, Button } from "../../../user-interfaces";

export default {
  title: "Features / Layout / Navigation Block",
  component: NavigationBlock,
} as Meta;

type NavigationBlockStory = StoryObj<NavigationBlockProps>;

export const Desktop: NavigationBlockStory = {
  render: (args) => (
    <SimpleBlock>
      <NavigationBlock {...args} />
    </SimpleBlock>
  ),
  args: {
    tailElement: (
      <Button
        as="a"
        w="full"
        href="https://wa.me/6281288588167"
        fontFamily="Poppins"
        fontSize="sm"
      >
        Hubungi Kami
      </Button>
    ),
    sections: [
      <Box key={1} width="100%" height="670px" background="grey.500" />,
      <Box key={2} width="100%" height="500px" background="main.500" />,
      <Box key={3} width="100%" height="370px" background="grey.500" />,
      <Box key={4} width="100%" height="500px" background="main.500" />,
      <Box key={4} width="100%" height="800px" background="grey.500" />,
    ],
    navigations: [
      [1, "Nav 1"],
      [2, "Nav 2"],
      [4, "Nav 3"],
    ],
    stackProps: {
      spacing: 5,
    },
    assetUrl: "/images/pediatric-nav-logo.svg",
    initialFontColor: "sea.500",
  },
};

export const Mobile: NavigationBlockStory = {
  render: (args) => (
    <Box width="360px">
      <NavigationBlock {...args} />
    </Box>
  ),
  args: {
    tailElement: (
      <Button
        as="a"
        w="full"
        href="https://wa.me/6281288588167"
        fontFamily="Poppins"
        fontSize="sm"
      >
        Hubungi Kami
      </Button>
    ),
    sections: [
      <Box key={1} width="100%" height="670px" background="grey.500" />,
      <Box key={2} width="100%" height="500px" background="main.500" />,
      <Box key={3} width="100%" height="370px" background="grey.500" />,
      <Box key={4} width="100%" height="500px" background="main.500" />,
      <Box key={4} width="100%" height="800px" background="grey.500" />,
    ],
    navigations: [
      [1, "Nav 1"],
      [2, "Nav 2"],
      [4, "Nav 3"],
    ],
    stackProps: {
      spacing: 5,
    },
    assetUrl: "/images/pediatric-nav-logo.svg",
    initialFontColor: "sea.500",
    isMobile: true,
  },
};
