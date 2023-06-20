import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Container, ContainerProps } from "..";

export default {
  title: "UI / Container",
  component: Container,
} as Meta;

type ContainerStory = StoryObj<ContainerProps>;

export const Basic: ContainerStory = {
  render: (args) => (
    <Container {...args}>
      There are many benefits to a joint design and development system. Not only
      does it bring benefits to the design team, but it also brings benefits to
      engineering teams. It makes sure that our experiences have a consistent
      look and feel, not just in our design specs, but in production
    </Container>
  ),
  args: {
    background: "paleBlue.500",
  },
};
