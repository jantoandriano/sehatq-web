import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import { DiseaseBanner, DiseaseBannerProps } from "../disease-banner";

export default {
  title: "Features / Disease / Banner",
  component: DiseaseBanner,
} as Meta;

type ArticleBannerStory = StoryObj<DiseaseBannerProps>;
export const Desktop: ArticleBannerStory = {
  render: (args) => (
    <Box width="760px">
      <DiseaseBanner {...args} />
    </Box>
  ),
  args: {
    slug: "inilah-prosedur-cuci-darah-dengan-bpjs-yang-perlu-diketahui",
    title: "Virus Corona (COVID-19)",
    reviewer: { name: "Maria Yuniar", slug: "" },
    imageUrl:
      "https://cms-dev.sehatq.com/public/img/disease_img/covid-19-1584526138.jpg",
    imageAlt: "image-banner",
  },
};

export const Mobile: ArticleBannerStory = {
  render: (args) => (
    <Box width="360px">
      <DiseaseBanner {...args} />
    </Box>
  ),
  args: {
    ...Desktop.args,
    isMobile: true,
  },
};
