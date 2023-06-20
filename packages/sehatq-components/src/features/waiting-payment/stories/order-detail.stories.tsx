import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Box } from "../../../user-interfaces";
import { OrderDetail, OrderDetailProps } from "../order-detail";

export default {
  title: "Features / Waiting Payment / Order Detail",
  component: OrderDetail,
} as Meta;

type OrderDetailStory = StoryObj<OrderDetailProps>;

const defaultArgs = {
  expiredTime: "Selasa, 22 November 2022 13:17 WIB",
  orderId: "TQ1122EHB0SS",
  paymentMethod: "Mandiri Virtual Account",
  noVirtualAccount: "199758209945",
  total: "25000",
};

export const Desktop: OrderDetailStory = {
  render: (args) => (
    <Box width="834px">
      <OrderDetail {...args} />
    </Box>
  ),
  args: {
    ...defaultArgs,
  },
};

export const Mobile: OrderDetailStory = {
  render: (args) => (
    <Box width="328px">
      <OrderDetail {...args} isMobile />
    </Box>
  ),
  args: {
    ...defaultArgs,
  },
};
