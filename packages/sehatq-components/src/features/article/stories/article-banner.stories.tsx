import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import { ArticleBanner, ArticleBannerProps } from "../article-banner";

export default {
  title: "Features / Article / Banner",
  component: ArticleBanner,
} as Meta;

type ArticleBannerStory = StoryObj<ArticleBannerProps>;
export const Desktop: ArticleBannerStory = {
  render: (args) => (
    <Box width="760px">
      <ArticleBanner {...args} />
    </Box>
  ),
  args: {
    id: 3,
    imageUrl:
      "https://cms.sehatq.com/public/img/article_img/apa-yang-harus-dilakukan-setelah-vaksin-corona-ini-langkah-tepatnya-1610630802.jpg",
    title: "Inilah Prosedur Cuci Darah dengan BPJS yang Perlu Diketahui",
    slug: "inilah-prosedur-cuci-darah-dengan-bpjs-yang-perlu-diketahui",
    date: "30 Jul 2019",
    author: { name: "Maria Yuniar", slug: "dr-shqlife-anak-qaqshq-spa" },
    category: { name: "BPJS", slug: "penyakit" },
  },
};

export const Mobile: ArticleBannerStory = {
  render: (args) => (
    <Box width="360px">
      <ArticleBanner {...args} />
    </Box>
  ),
  args: {
    ...Desktop.args,
    isMobile: true,
  },
};
