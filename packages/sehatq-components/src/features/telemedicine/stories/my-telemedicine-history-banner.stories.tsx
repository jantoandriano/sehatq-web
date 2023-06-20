import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Box } from "../../../user-interfaces";
import {
  MyTelemedicineHistoryBanner,
  MyTelemedicineHistoryBannerProps,
} from "..";
export default {
  title: "Features / Telemedicine / My Telemedicine History Banner",
  component: MyTelemedicineHistoryBanner,
} as Meta;

type MyTelemedicineHistoryBannerStory =
  StoryObj<MyTelemedicineHistoryBannerProps>;

export const Desktop: MyTelemedicineHistoryBannerStory = {
  render: (args) => (
    <Box width="760px">
      <MyTelemedicineHistoryBanner {...args} />
    </Box>
  ),
  args: {},
};

export const Mobile: MyTelemedicineHistoryBannerStory = {
  render: (args) => (
    <Box width="328px">
      <MyTelemedicineHistoryBanner {...args} isMobile />
    </Box>
  ),
  args: {},
};
