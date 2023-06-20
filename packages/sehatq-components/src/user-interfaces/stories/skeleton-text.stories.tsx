import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { SkeletonText, SkeletonTextProps } from "..";

export default {
  title: "UI / Skeleton Text",
  component: SkeletonText,
} as Meta;

type SkeletonTextStory = StoryObj<SkeletonTextProps>;

export const Basic: SkeletonTextStory = {
  render: (args) => <SkeletonText {...args} />,
  args: {
    width: 300,
    noOfLines: 4,
    spacing: "4",
  },
};
