import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { SkeletonCircle, SkeletonCircleProps } from "..";

export default {
  title: "UI / Skeleton Circle",
  component: SkeletonCircle,
} as Meta;

type SkeletonCircleStory = StoryObj<SkeletonCircleProps>;

export const Basic: SkeletonCircleStory = {
  render: (args) => <SkeletonCircle {...args} />,
  args: {
    size: "10",
  },
};
