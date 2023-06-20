import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Box } from "../../../user-interfaces";
import { VirtualAccount, VirtualAccountProps } from "../virtual-account";

export default {
  title: "Features / Waiting Payment / Virtual Account",
  component: VirtualAccount,
} as Meta;

type VirtualAccountStory = StoryObj<VirtualAccountProps>;

const args = {
  orderDetail: {
    currency: "Rp",
    paymentTimeout: "2020-07-30T11:37:03.827+07:00",
    paymentType: "Bank Mandiri",
    coNumber: "TQ1122EHB0SS",
    vaNumbers: "VANUMBERS10101",
    grandTotal: "25000",
  },
  paymentGuidances: [
    {
      id: "1",
      title: "Outle Mandiri",
      description:
        "<ol class='payment-guidance-ol'><li>Login Mandiri Online dengan memasukan username dan password</li> <li>Pilih menu 'Bayar'</li><li>Pilih 'Buat Pembayaran Baru'</li><li>Pilih menu 'Multipayment'</li><li>Pilih penyedia jasa 'Midtrans'</li><li>Masukan nomor virtual account tanpa 70012</li><li>Pilih lanjut</><li>Pilih jumlah tagihan kemudian pilih lanjut</li><li>Setelah muncul tagihan, pilih konfirmasi</li><li>Masukan MPIN</li></ol>",
    },
  ],
};

export const Desktop: VirtualAccountStory = {
  render: (args) => (
    <Box width="834px">
      <VirtualAccount {...args} />
    </Box>
  ),
  args,
};

export const Mobile: VirtualAccountStory = {
  render: (args) => (
    <Box width="328px">
      <VirtualAccount {...args} isMobile />
    </Box>
  ),
  args,
};
