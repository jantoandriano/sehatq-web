import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { ListGroup, ListGroupProps } from "..";

export default {
  title: "UI / List Group",
  component: ListGroup,
} as Meta;

interface Item {
  id: number;
  label: string;
}

// Create an array of data
const list = [
  {
    id: 0,
    label: "Semua Keluarga",
  },

  {
    id: 1,
    label: "Nicole Rania",
  },

  {
    id: 2,
    label: "Sultan Andara",
  },
];

type ListGroupStory = StoryObj<ListGroupProps<Item>>;

export const Basic: ListGroupStory = {
  render: (args) => <ListGroup {...args} />,
  args: {
    list,
    activeItems: [1],
    colorScheme: "main.600",
    width: "328px",
  },
};
