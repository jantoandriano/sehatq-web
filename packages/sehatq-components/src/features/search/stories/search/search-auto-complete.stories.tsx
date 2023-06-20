import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Provider } from "jotai";
import {
  inputSearchAtom,
  SearchAutoComplete,
  SearchAutoCompleteProps,
} from "../..";
import { Box } from "../../../../user-interfaces";

export default {
  title: "Features / Search / Search Auto Complete ",
  component: SearchAutoComplete,
} as Meta;

type SearchAutoCompleteStory = StoryObj<
  SearchAutoCompleteProps & { inputSearch: string }
>;

export const Desktop: SearchAutoCompleteStory = {
  render: ({ inputSearch }) => (
    <Box width="528px">
      <Provider initialValues={[[inputSearchAtom, inputSearch]]}>
        <SearchAutoComplete />
      </Provider>
    </Box>
  ),
  args: {
    inputSearch: "panadol",
  },
};

export const Mobile: SearchAutoCompleteStory = {
  render: ({ inputSearch }) => (
    <Box width="294px">
      <Provider initialValues={[[inputSearchAtom, inputSearch]]}>
        <SearchAutoComplete />
      </Provider>
    </Box>
  ),
  args: {
    inputSearch: "panadol",
    isMobile: true,
  },
};
