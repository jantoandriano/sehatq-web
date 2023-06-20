import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { PaginationButton, PaginationButtonProps } from "..";

export default {
  title: "UI / Pagination Button",
  component: PaginationButton,
} as Meta;

type ButtonStory = StoryObj<PaginationButtonProps>;

export const Basic: ButtonStory = {
  render: (args) => <PaginationButton {...args} />,
  args: {
    page: 6,
    maxPage: 10,
    onChangePage: (value: number) => console.log(value),
  },
};
