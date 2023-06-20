import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Link, LinkProps, LinkBox, LinkBoxProps, LinkOverlay } from "..";

export default {
  title: "UI / Link",
  component: Link,
} as Meta;

type LinkStory = StoryObj<LinkProps>;

export const Basic: LinkStory = {
  render: (args) => <Link {...args} />,
  args: {
    variant: "solid",
    children: "Finding customers for your new business",
    href: "#",
  },
};

type LinkBoxStory = StoryObj<LinkBoxProps>;

export const WithLinkOverlay: LinkBoxStory = {
  render: () => (
    <LinkBox
      borderWidth="1px"
      bg="white"
      p="4"
      rounded="lg"
      as="article"
      _hover={{ shadow: "lg" }}
    >
      <h2>
        <LinkOverlay href="google.com">Some blog post</LinkOverlay>
      </h2>
      <p>
        As a side note, using quotation marks around an attribute value is
        required only if this value is not a valid identifier.
      </p>
    </LinkBox>
  ),
};
