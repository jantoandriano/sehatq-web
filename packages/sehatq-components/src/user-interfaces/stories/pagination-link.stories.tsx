import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { PaginationLink, PaginationLinkProps } from "..";

export default {
  title: "UI / Pagination Link",
  component: PaginationLink,
} as Meta;

type ButtonStory = StoryObj<PaginationLinkProps>;

export const Basic: ButtonStory = {
  render: (args) => <PaginationLink {...args} />,
  args: {
    page: 5,
    maxPage: 217,
    navigateName: "ARTICLE",
    // size: "small",
    // variant: "circle",
  },
};
