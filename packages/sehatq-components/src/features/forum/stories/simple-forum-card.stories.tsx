import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { SimpleForumCardProps, SimpleForumCard } from "../simple-forum-card";
import { Box } from "../../../user-interfaces";

export default {
  title: "Features / Forum / Simple Forum Card",
  component: SimpleForumCard,
} as Meta;

type SimpleForumCardStory = StoryObj<SimpleForumCardProps>;

export const Desktop: SimpleForumCardStory = {
  render: (args) => (
    <Box width="244px">
      <SimpleForumCard {...args} />
    </Box>
  ),
  args: {
    title:
      "Larut dalam kesedihan dan merasa hidup tidak berguna. Apakah merupakan tanda depresi?",
    slug: "apakah-berbahaya-mengaplikasikan-tanning-oil-pada-wajah",
    answeredBy: "dr. Vina Liliana",
    date: "03 Des 2020",
    category: {
      slug: "kandungan",
      name: "Kandungan",
    },
  },
};

export const Mobile: SimpleForumCardStory = {
  ...Desktop,
  args: {
    ...Desktop.args,
    isMobile: true,
    title: "Dampak positif dan negatif jika setiap hari minum jus buah?",
  },
};
