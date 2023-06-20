import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Skeleton, SkeletonProps, Text } from "..";

export default {
  title: "UI / Skeleton",
  component: Skeleton,
} as Meta;

type SkeletonStory = StoryObj<SkeletonProps>;

export const Basic: SkeletonStory = {
  render: (args) => <Skeleton {...args} />,
  args: {
    height: 4,
    width: 200,
    colorScheme: "blue",
  },
};

export const LoadComponent: SkeletonStory = {
  render: (args) => (
    <Skeleton {...args}>
      <Text fontWeight="semibold" textAlign="center">
        Now You
      </Text>
      <Text fontWeight="semibold" textAlign="center">
        See Me
      </Text>
    </Skeleton>
  ),
  args: {
    isLoaded: false,
  },
};
