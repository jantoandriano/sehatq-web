import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import {
  FormControl,
  FormControlProps,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
} from "../form-control";
import { Box } from "../box";
import { Input } from "../input";

export default {
  title: "UI / Form Control",
  component: FormControl,
} as Meta;

type FormControlStory = StoryObj<FormControlProps>;

const isError = true;

export const Basic: FormControlStory = {
  render: () => (
    <Box w="320px" background="paleBlue.500" p={4}>
      <FormControl isInvalid={isError}>
        <FormLabel htmlFor="email">Email address</FormLabel>
        <Input id="email" type="email" background="white" />
        {!isError ? (
          <FormHelperText>
            Enter the email you`d like to receive the newsletter on.
          </FormHelperText>
        ) : (
          <FormErrorMessage>Email is required.</FormErrorMessage>
        )}
      </FormControl>
    </Box>
  ),
  args: {},
};
