import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Box } from "../../../user-interfaces";
import { EWallet, EWalletProps } from "../e-wallet";

export default {
  title: "Features / Waiting Payment / E-Wallet",
  component: EWallet,
  argTypes: {
    paymentType: {
      options: ["gopay", "shopeepay"],
      control: { type: "radio" },
    },
    paymentTimeout: {
      options: ["2020-07-30T11:37:03.827+07:00"],
      control: { type: "select" },
    },
  },
} as Meta;

const args = {
  orderDetail: {
    currency: "Rp",
    paymentTimeout: "2020-07-30T11:37:03.827+07:00",
    paymentType: "gopay",
    coNumber: "TQ1122EHB0SS",
    vaNumbers: "",
    grandTotal: "25000",
  },
  paymentGuidances: [
    {
      id: "1",
      title: "Aplikasi Gojek",
      description:
        "<ol class='payment-guidance-ol'> <li>Buka aplikasi gojek</li> <li>Klik bayar dan scan QR code</li> <li>Periksa kembali total tagihan anda dan klik bayar</li><li>Masukan PIN Gopay dan transaksi selesai</li></ol>",
    },
  ],
};

type EWalletStory = StoryObj<EWalletProps>;

export const Desktop: EWalletStory = {
  render: (args) => (
    <Box width="834px">
      <EWallet {...args} />
    </Box>
  ),
  args,
};

export const Mobile: EWalletStory = {
  render: (args) => (
    <Box width="328px">
      <EWallet {...args} isMobile />
    </Box>
  ),
  args,
};
