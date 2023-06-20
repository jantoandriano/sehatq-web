import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Box } from "../../../user-interfaces";
import { OvoPage, OvoPageProps } from "../ovo";

export default {
  title: "Features / Waiting Payment / Ovo",
  component: OvoPage,
} as Meta;

type OvoPageStory = StoryObj<OvoPageProps>;

const args = {
  orderDetail: {
    currency: "Rp",
    paymentTimeout: "60",
    coNumber: "TQ1122EHB0SS",
    paymentType: "ovo",
    vaNumbers: "",
    grandTotal: "25000",
  },
  paymentGuidances: [
    {
      id: "1",
      title: "Aplikasi Ovo",
      description:
        "<ol class='payment-guidance-ol'><li>Buka aplikasi OVO</li><li>Tap lonceng di bagian kanan atas</li><li>Pilih notifikasi tagihan pembayaran SehatQ</li><li>Tap bayar</li><li>Selesai! Pesananmu segera diprose</li></ol>",
    },
  ],
};

export const Desktop: OvoPageStory = {
  render: (args) => (
    <Box width="834px">
      <OvoPage {...args} />
    </Box>
  ),
  args,
};

export const Mobile: OvoPageStory = {
  render: (args) => (
    <Box width="328px">
      <OvoPage {...args} isMobile />
    </Box>
  ),
  args,
};
