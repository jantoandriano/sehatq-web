import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Wrap, Flex, Text } from "..";
import * as icons from "../icons";

const iconList = {
  ...icons,
};

export default {
  title: "UI / Icons",
  component: icons.AddIcon,
} as Meta;

type ButtonStory = StoryObj<unknown>;

export const Basic: ButtonStory = {
  render: () => (
    <Wrap spacing={5} shouldWrapChildren>
      {Object.keys(iconList).map((iconName) => {
        return (
          <Flex
            key={iconName}
            direction="column"
            align="center"
            justify="center"
            borderRadius={6}
            border="1px solid"
            borderColor="veryLightPink"
            w="200px"
            h="100px"
          >
            <icons.Icon
              as={iconList[iconName]}
              color="main.500"
              marginBottom={2}
              boxSize="10"
            />
            <Text fontSize="xs" fontWeight="semibold">
              {iconName}
            </Text>
          </Flex>
        );
      })}
    </Wrap>
  ),
  args: {
    children: "Click Here",
    colorScheme: "blue",
    variant: "solid",
  },
};
