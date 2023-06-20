import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box, Text } from "../../../user-interfaces";
import { ClinicArticle, ClinicArticleProps } from "../clinic-article";

export default {
  title: "Features / Landing Page / Clinic Article",
  component: ClinicArticle,
} as Meta;

type ClinicArticleStory = StoryObj<ClinicArticleProps>;
export const Desktop: ClinicArticleStory = {
  render: (args) => (
    <Box width="1160px">
      <ClinicArticle {...args} />
    </Box>
  ),
  args: {
    isMobile: false,
    title: (
      <Text fontSize="32px" fontFamily="poppins" maxW="570px" fontWeight="bold">
        Perbanyak{" "}
        <Text as="span" color="#2B8E8E">
          Wawasan
        </Text>{" "}
        demi Tumbuh Kembang si Kecil yang Lebih Baik
      </Text>
    ),
    articlesNavigation: {
      name: "ARTICLE",
      query: {
        slugs: ["parenting"],
      },
    },
    perPage: "12",
    tagSlug: "",
  },
};

export const Mobile: ClinicArticleStory = {
  render: (args) => (
    <Box width="360px">
      <ClinicArticle {...args} />
    </Box>
  ),
  args: {
    isMobile: true,
    title: (
      <Text fontSize="24px" fontFamily="poppins" fontWeight="bold" mb="32px">
        Perbanyak{" "}
        <Text as="span" color="main.500">
          wawasan
        </Text>{" "}
        demi Tumbuh Kembang si Kecil yang Lebih Baik
      </Text>
    ),
    perPage: "12",
    tagSlug: "",
  },
};
