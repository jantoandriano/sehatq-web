import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import { InfographicCard, InfographicCardProps } from "..";

export default {
  title: "Features / Article / Infographic Card",
  component: InfographicCard,
} as Meta;

type InfographicCardStory = StoryObj<InfographicCardProps>;

const defaultArgs = {
  id: 2027,
  slug: "bolehkah-ibu-hamil-minum-es",
  title: "Bolehkah Ibu Hamil Minum Es? Ini Penjelasan Medisnya",
  date: "15 Mar 2022",
  imageUrl:
    "https://cms-dev.sehatq.com/public/img/article_thumb/bolehkah-ibu-hamil-minum-es-ini-penjelasan-medisnya-thumb-1563184145.jpg",
  imageAlt: "Ada mitos yang melarang ibu hamil minum es",
};
export const Mobile: InfographicCardStory = {
  render: (args) => (
    <Box width="150px">
      <InfographicCard {...args} isMobile />
    </Box>
  ),
  args: {
    ...defaultArgs,
  },
};

export const Desktop: InfographicCardStory = {
  render: (args) => (
    <Box width="240px">
      <InfographicCard {...args} />
    </Box>
  ),
  args: {
    ...defaultArgs,
  },
};
