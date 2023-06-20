import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { MyActivitiesProps, MyActivities } from "../my-activities";
import { Box } from "../../../user-interfaces";

export default {
  title: "Features / Profile / My Activities",
  component: MyActivities,
} as Meta;

type MyActivitiesStory = StoryObj<MyActivitiesProps>;

export const Desktop: MyActivitiesStory = {
  render: () => (
    <Box width="360px" background="iceBlue.500" py={4}>
      <MyActivities isMobile={false} />
    </Box>
  ),
};

export const Mobile: MyActivitiesStory = {
  ...Desktop,
  args: {
    ...Desktop.args,
    isMobile: true,
  },
};
