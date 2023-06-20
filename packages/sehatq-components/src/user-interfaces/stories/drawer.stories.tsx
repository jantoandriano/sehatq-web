import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import {
  Drawer,
  DrawerProps,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
} from "..";

export default {
  title: "UI / Drawer",
  component: Drawer,
} as Meta;

type DrawerStory = StoryObj<DrawerProps>;

export const Basic: DrawerStory = {
  render: (args) => (
    <Drawer {...args}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerBody>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  ),
  args: {
    placement: "bottom",
    isOpen: true,
  },
};
