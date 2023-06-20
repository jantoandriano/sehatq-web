import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Box } from "../../../user-interfaces";
import {
  CreditCardPage,
  CreditCardPageProps,
} from "../../../../../../apps/paymentq/src/components/features/waiting-payment/credit-card";

export default {
  title: "Features / Waiting Payment / Credit Card ",
  component: CreditCardPage,
} as Meta;

type CreditCardStory = StoryObj<CreditCardPageProps>;

export const Desktop: CreditCardStory = {
  render: (args) => (
    <Box minW="2xl">
      <CreditCardPage {...args} />
    </Box>
  ),
};

export const Mobile: CreditCardStory = {
  render: (args) => (
    <Box width="328px">
      <CreditCardPage {...args} isMobile />
    </Box>
  ),
};
