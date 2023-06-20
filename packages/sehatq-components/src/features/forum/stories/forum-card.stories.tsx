import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { ForumCardProps, ForumCard } from "..";
import { Box } from "../../../user-interfaces";

export default {
  title: "Features / Forum / Forum Card",
  component: ForumCard,
} as Meta;

type ForumCardStory = StoryObj<ForumCardProps>;

export const Desktop: ForumCardStory = {
  render: (args) => (
    <Box width="760px">
      <ForumCard {...args} />
    </Box>
  ),
  args: {
    id: 29,
    question:
      "Halo dok, nama saya Anya Sofrina Maretha Larasati, usia saya 16 tahun. Saya ingin bertanya apakah Alter ego berbahaya?dan saya salah satu nya. Kebetulan saya belum pasti mengerti tentang itu",
    date: "03 Agt 2019, 10:17",
    title: "Apakah maksud dari alter ego?",
    slug: "maksud-dari-alter-ego-q55898",
    user: {
      id: 910,
      email: "michael@sehatq.com",
      nameInitial: "BW",
      gender: "m",
      genderName: "Wanita",
      genderNameBg: "squash.500",
      age: 21,
    },
    category: {
      id: 1,
      name: "Mata 3",
      slug: "mata-3",
    },
    answeredBy: "dr. Dwiana Ardianti",
    viewsCount: 91,
    commentsCount: 2,
    doctorAuthorSlug: "dr-dwiana-ardianti",
  },
};

export const Mobile: ForumCardStory = {
  render: (args) => (
    <Box width="328px">
      <ForumCard {...args} />
    </Box>
  ),
  args: {
    ...Desktop.args,
    isMobile: true,
  },
};
