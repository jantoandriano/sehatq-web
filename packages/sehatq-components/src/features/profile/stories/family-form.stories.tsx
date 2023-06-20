import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { FamilyForm, FamilyFormProps } from "..";
import { Box } from "../../../user-interfaces";

export default {
  title: "Features / Profile / Family Form",
  component: FamilyForm,
} as Meta;

type FamilyInputStory = StoryObj<FamilyFormProps>;

export const Desktop: FamilyInputStory = {
  render: () => (
    <Box width="760px">
      <FamilyForm isMobile={false} />
    </Box>
  ),
};

export const Mobile: FamilyInputStory = {
  render: () => (
    <Box width="328px">
      <FamilyForm isMobile />
    </Box>
  ),
};
