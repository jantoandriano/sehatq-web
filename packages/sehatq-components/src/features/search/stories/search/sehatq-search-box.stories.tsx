import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { SehatqSearchBox } from "../..";
import { Box } from "../../../../user-interfaces";
import { SehatqSearchBoxProps } from "../../sehatq-search-box";

export default {
  title: "Features / Search / Sehatq Search Box ",
  component: SehatqSearchBox,
} as Meta;

type SehatqSearchBoxStory = StoryObj<SehatqSearchBoxProps>;

export const Desktop: SehatqSearchBoxStory = {
  render: (args) => (
    <Box width="528px">
      <SehatqSearchBox {...args} />
    </Box>
  ),
  args: {
    placeholderSearch: "Cari",
    searchNavigation: {
      name: "SEARCH",
    },
  },
};

export const Mobile: SehatqSearchBoxStory = {
  render: (args) => (
    <Box width="360px">
      <SehatqSearchBox {...args} />
    </Box>
  ),
  args: {
    ...Desktop.args,
    isMobile: true,
  },
};
