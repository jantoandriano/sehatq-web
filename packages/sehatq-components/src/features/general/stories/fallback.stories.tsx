import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { ASSETS } from "@sehatq/constants";
import { Fallback, FallbackProps } from "..";

export default {
  title: "Features / General / Fallback",
  component: Fallback,
} as Meta;

type FallbackStory = StoryObj<FallbackProps>;

export const Desktop: FallbackStory = {
  render: (args) => <Fallback {...args} />,
  args: {
    isMobile: false,
    image: {
      src: ASSETS.EMPTY,
      width: 500,
      height: 344,
    },
    title: "Halaman yang Kamu Cari Tidak Ditemukan",
    description: "Coba cek rekomendasi berikut ini atau kembali ke beranda",
  },
};

export const Mobile: FallbackStory = {
  render: (args) => <Fallback {...args} />,
  args: {
    isMobile: true,
    image: {
      src: ASSETS.EMPTY,
      width: 500,
      height: 344,
    },
    title: "Halaman yang Kamu Cari Tidak Ditemukan",
    description: "Coba cek rekomendasi berikut ini atau kembali ke beranda",
  },
};
