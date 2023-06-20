import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Box } from "../../../user-interfaces";
import { GoogleMapInput, GoogleMapInputProps } from "..";

export default {
  title: "Features / General / Google Map Input",
  component: GoogleMapInput,
} as Meta;

type GoogleMapInputStory = StoryObj<GoogleMapInputProps>;
const defaultArgs = {
  onChange: (placeId: string) => console.log(placeId),
};

export const Desktop: GoogleMapInputStory = {
  render: (args) => (
    <Box width="760px">
      <GoogleMapInput {...args} />
    </Box>
  ),
  args: {
    ...defaultArgs,
  },
};

export const Mobile: GoogleMapInputStory = {
  render: (args) => {
    return (
      <Box width="360px">
        <GoogleMapInput {...args} isMobile />
      </Box>
    );
  },
  args: {
    ...defaultArgs,
  },
};
