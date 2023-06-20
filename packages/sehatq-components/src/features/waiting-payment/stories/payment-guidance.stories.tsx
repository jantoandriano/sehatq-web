import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Box } from "../../../user-interfaces";
import { PaymentGuidance, PaymentGuidanceProps } from "../payment-guidance";

export default {
  title: "Features / Waiting Payment / Payment Guidance",
  component: PaymentGuidance,
  argTypes: {
    paymentMethod: {
      options: ["gopay", "e-Banking (Mandiri Online)"],
      control: { type: "radio" },
    },
    paymentGuidanceHtml: {
      options: [
        "<ol class='payment-guidance-ol'><li>Buka aplikasi gojek</li> <li>Klik bayar dan scan QR code</li> <li>Periksa kembali total tagihan anda dan klik bayar</li><li>Masukan PIN Gopay dan transaksi selesai</li></ol>",
        "<ol class='payment-guidance-ol'><li>Login Mandiri Online dengan memasukan username dan password</li> <li>Pilih menu 'Bayar'</li><li>Pilih 'Buat Pembayaran Baru'</li><li>Pilih menu 'Multipayment'</li><li>Pilih penyedia jasa 'Midtrans'</li><li>Masukan nomor virtual account tanpa 70012</li><li>Pilih lanjut</><li>Pilih jumlah tagihan kemudian pilih lanjut</li><li>Setelah muncul tagihan, pilih konfirmasi</li><li>Masukan MPIN</li></ol>",
      ],
      control: { type: "select" },
    },
  },
} as Meta;

const defaultArgs = {
  paymentMethod: "Gopay",
  paymentGuidanceHtml:
    "<ol class='payment-guidance-ol'><li>Buka aplikasi gojek</li> <li>Klik bayar dan scan QR code</li> <li>Periksa kembali total tagihan anda dan klik bayar</li><li>Masukan PIN Gopay dan transaksi selesai</li></ol>",
};

type PaymentGuidanceStory = StoryObj<PaymentGuidanceProps>;

export const Desktop: PaymentGuidanceStory = {
  render: (args) => (
    <Box width="834px">
      <PaymentGuidance {...args} />
    </Box>
  ),
  args: { ...defaultArgs },
};

export const Mobile: PaymentGuidanceStory = {
  render: (args) => (
    <Box width="328px">
      <PaymentGuidance {...args} isMobile />
    </Box>
  ),
  args: { ...defaultArgs },
};
