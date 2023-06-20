import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { RelatedForumsProps, RelatedForums } from "../related-forums";
import { Box } from "../../../user-interfaces";

export default {
  title: "Features / Forum / Related Forums",
  component: RelatedForums,
} as Meta;

type RelatedForumsStory = StoryObj<RelatedForumsProps>;

export const Desktop: RelatedForumsStory = {
  render: (args) => (
    <Box width="760px">
      <RelatedForums {...args} />
    </Box>
  ),
  args: {
    tagId: "73,1478",
  },
};

export const Mobile: RelatedForumsStory = {
  render: (args) => (
    <Box width="360px">
      <RelatedForums {...args} />
    </Box>
  ),
  args: {
    ...Desktop.args,
    isMobile: true,
  },
};
