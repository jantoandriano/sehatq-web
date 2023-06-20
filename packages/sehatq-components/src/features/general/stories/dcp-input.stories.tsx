import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Flex } from "../../../user-interfaces";
import { DCPInput, DCPInputProps } from "..";

export default {
  title: "Features / General / DCP Input",
  component: DCPInput,
} as Meta;

type DCPInputStory = StoryObj<DCPInputProps>;

const defaultArgs = {
  onChange: (value: {
    subdistrict: string;
    district: string;
    city: string;
    province: string;
    zipCode: string;
  }) => console.log(value),
  value: {
    subdistrict: "Watestanjung",
    district: "Wringin Anom",
    city: "Gresik",
    province: "Jawa Timur",
    zipCode: "61176",
  },
};
export const Desktop: DCPInputStory = {
  render: (args) => (
    <Flex width="760px" justifyContent="center">
      <DCPInput {...args} />
    </Flex>
  ),
  args: {
    ...defaultArgs,
  },
};

export const Mobile: DCPInputStory = {
  render: (args) => (
    <Flex width="360px" justifyContent="end">
      <DCPInput {...args} />
    </Flex>
  ),
  args: {
    ...defaultArgs,
    isMobile: true,
  },
};
