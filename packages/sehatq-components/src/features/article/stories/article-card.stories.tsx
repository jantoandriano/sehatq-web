import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import { ArticleCard, ArticleCardProps } from "..";

export default {
  title: "Features / Article / Card",
  component: ArticleCard,
} as Meta;

type ArticleCardStory = StoryObj<ArticleCardProps>;

const defaultArgs = {
  id: 2027,
  slug: "bolehkah-ibu-hamil-minum-es",
  title: "Bolehkah Ibu Hamil Minum Es? Ini Penjelasan Medisnya",
  category: {
    name: "Kehamilan",
    slug: "kehamilan",
  },
  meta: "Ada sebuah mitos yang menyatakan bahwa ibu hamil tidak boleh minum es karena bisa membuat bayi yang lahir menjadi besar. Benarkah demikian? Sebenarnya, bolehkah ibu hamil minum es menurut kesehatan?",
  date: "15 Mar 2022",
  imageUrl:
    "https://cms-dev.sehatq.com/public/img/article_thumb/bolehkah-ibu-hamil-minum-es-ini-penjelasan-medisnya-thumb-1563184145.jpg",
  imageAlt: "Ada mitos yang melarang ibu hamil minum es",
  author: {
    name: "Dina Rahmawati",
    slug: "dina-rahmawati",
  },
  rating: {
    average: 5,
    totalReview: 10,
  },
};
export const Mobile: ArticleCardStory = {
  render: (args) => (
    <Box width="328px">
      <ArticleCard {...args} isMobile />
    </Box>
  ),
  args: {
    ...defaultArgs,
  },
};

export const Desktop: ArticleCardStory = {
  render: (args) => (
    <Box width="760px">
      <ArticleCard {...args} />
    </Box>
  ),
  args: {
    ...defaultArgs,
  },
};
