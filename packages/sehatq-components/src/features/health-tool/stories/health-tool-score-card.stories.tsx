import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { HealthToolScoreCard, HealthToolScoreCardProps } from "..";
import { Box } from "../../../user-interfaces";

export default {
  title: "Features / Health Tool / Score Card",
  component: HealthToolScoreCard,
} as Meta;

type HealthToolScoreCardStory = StoryObj<HealthToolScoreCardProps>;

export const Desktop: HealthToolScoreCardStory = {
  render: (args) => (
    <Box width="1080px">
      <HealthToolScoreCard {...args} />
    </Box>
  ),
  args: {
    isMobile: false,
    title: "Depresi Berat",
    description: "Umurmu tidak lama lagi",
    descriptionColor: "FF0000",
    healthToolSlug: "kesehatan-mental",
    healthToolName: "Kesehatan Mental",
    healthToolScoreId: 7,
    createdAt: "2021-02-16 15:38:00",
    userId: "1",
  },
};

export const Mobile: HealthToolScoreCardStory = {
  render: (args) => (
    <Box width="360px">
      <HealthToolScoreCard {...args} />
    </Box>
  ),
  args: {
    isMobile: false,
    title: "Depresi Berat",
    description: "Umurmu tidak lama lagi",
    descriptionColor: "FF0000",
    healthToolSlug: "kesehatan-mental",
    healthToolName: "Kesehatan Mental",
    healthToolScoreId: 7,
    createdAt: "2021-02-16 15:38:00",
    userId: "1",
  },
};
