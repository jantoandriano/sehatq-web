import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import { ClinicForum, ClinicForumProps } from "../clinic-forum";

export default {
  title: "Features / Landing Page / Clinic Forum",
  component: ClinicForum,
} as Meta;

type ClinicForumStory = StoryObj<ClinicForumProps>;
const clinicForumArgs: Omit<ClinicForumProps, "isMobile"> = {
  title: "Forum Penyakit Dalam",
  description: "Cari jawaban yang kamu butuhkan dari ahlinya",
  link: {
    label: "Kunjungi Forum",
    value: {
      name: "FORUM",
      query: { slugs: ["anak"], sort: "newest" },
    },
  },
};

export const Desktop: ClinicForumStory = {
  render: (args) => (
    <Box width="1160px">
      <ClinicForum {...args} />
    </Box>
  ),
  args: {
    isMobile: false,
    ...clinicForumArgs,
  },
};

export const Mobile: ClinicForumStory = {
  render: (args) => (
    <Box width="328px">
      <ClinicForum {...args} />
    </Box>
  ),
  args: {
    isMobile: true,
    ...clinicForumArgs,
  },
};
