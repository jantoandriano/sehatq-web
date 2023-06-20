import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import {
  DiseaseCategoryFilter,
  DiseaseCategoryFilterProps,
} from "../disease-category-filter";

export default {
  title: "Features / Disease / Disease Category Filter",
  component: DiseaseCategoryFilter,
} as Meta;

type DiseaseCategoryFilterStory = StoryObj<DiseaseCategoryFilterProps>;
export const Desktop: DiseaseCategoryFilterStory = {
  render: (args) => (
    <Box width="760px">
      <DiseaseCategoryFilter {...args} />
    </Box>
  ),
  args: {
    currentCategorySlug: "",
  },
};

export const Mobile: DiseaseCategoryFilterStory = {
  render: (args) => (
    <Box width="360px">
      <DiseaseCategoryFilter {...args} />
    </Box>
  ),
  args: {
    ...Desktop.args,
    isMobile: true,
  },
};
