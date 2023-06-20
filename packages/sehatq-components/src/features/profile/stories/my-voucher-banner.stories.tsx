import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { MyVoucherBannerProps, MyVoucherBanner } from "../my-voucher-banner";
import { Box } from "../../../user-interfaces";

export default {
  title: "Features / Profile / My Voucher Banner",
  component: MyVoucherBanner,
} as Meta;

type MyVoucherBannerStory = StoryObj<MyVoucherBannerProps>;

export const Desktop: MyVoucherBannerStory = {
  render: (args) => (
    <Box width="320px" background="white" p={4}>
      <MyVoucherBanner {...args} />
    </Box>
  ),
  args: {
    textLabel: "Cek Voucher Yang Kamu Miliki",
  },
};

export const Mobile: MyVoucherBannerStory = {
  ...Desktop,
  args: {
    ...Desktop.args,
    isMobile: true,
  },
};
