import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import { ImagesInput, ImagesInputProps } from "..";

export default {
  title: "Features / General / Images Input",
  component: ImagesInput,
} as Meta;

const defaultArgs = {
  maxFile: 5,
  onChange: (
    values: {
      key: string;
      file: File;
      preview: string;
    }[]
  ) => console.log(values),
};
type ImagesInputStory = StoryObj<ImagesInputProps>;

export const Desktop: ImagesInputStory = {
  render: (args) => (
    <Box width="760px">
      <ImagesInput {...args} />
    </Box>
  ),
  args: { ...defaultArgs },
};

export const Mobile: ImagesInputStory = {
  render: (args) => {
    return (
      <Box width="360px">
        <ImagesInput {...args} />
      </Box>
    );
  },
  args: {
    ...defaultArgs,
  },
};
