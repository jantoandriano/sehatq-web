import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import { SimpleArticleCard, SimpleArticleCardProps } from "..";

export default {
  title: "Features / Article / Simple Card",
  component: SimpleArticleCard,
} as Meta;

type SimpleArticleCardStory = StoryObj<SimpleArticleCardProps>;

const defaultArgs = {
  slug: "bolehkah-ibu-hamil-minum-es",
  title: "Bolehkah Ibu Hamil Minum Es? Ini Penjelasan Medisnya",
  category: {
    name: "Kehamilan",
    slug: "kehamilan",
  },
  date: "15 Mar 2022",
  imageUrl:
    "https://cms-dev.sehatq.com/public/img/article_thumb/bolehkah-ibu-hamil-minum-es-ini-penjelasan-medisnya-thumb-1563184145.jpg",
  imageAlt: "Ada mitos yang melarang ibu hamil minum es",
};
export const Mobile: SimpleArticleCardStory = {
  render: (args) => (
    <Box width="144px">
      <SimpleArticleCard {...args} isMobile />
    </Box>
  ),
  args: {
    ...defaultArgs,
  },
};

export const Desktop: SimpleArticleCardStory = {
  render: (args) => (
    <Box width="144px">
      <SimpleArticleCard {...args} />
    </Box>
  ),
  args: {
    ...defaultArgs,
  },
};
