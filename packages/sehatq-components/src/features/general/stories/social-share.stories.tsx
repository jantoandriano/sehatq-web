import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import { SocialShare, SocialShareProps } from "..";

export default {
  title: "Features / General / Social Share",
  component: SocialShare,
} as Meta;

type SocialShareStory = StoryObj<SocialShareProps>;

export const DesktopWithTitleShare: SocialShareStory = {
  render: (args) => (
    <Box width="760px">
      <SocialShare {...args} />
    </Box>
  ),
  args: {
    url: "https://dev2.sehatq.com/artikel/hidup-sehat-apakah-menyiksa-jika-dijalankan-dengan-optimis",
    title: "Hidup Sehat apakah menyiksa jika dijalankan dengan Optimis?",
    sizeIcon: "38px",
    hideTitleShare: false,
    hideTitleSocial: true,
    spacing: 5,
    px: 6,
    py: 4,
  },
};

export const DesktopWithoutTitleShare: SocialShareStory = {
  render: (args) => (
    <Box width="434px">
      <SocialShare {...args} />
    </Box>
  ),
  args: {
    ...DesktopWithTitleShare.args,
    hideTitleShare: true,
    hideTitleSocial: true,
    spacing: 3.5,
    px: 3,
    py: 2,
  },
};

export const Mobile: SocialShareStory = {
  render: (args) => (
    <Box width="360px">
      <SocialShare {...args} />
    </Box>
  ),
  args: {
    ...DesktopWithTitleShare.args,
    hideTitleShare: true,
    hideTitleSocial: true,
    sizeIcon: "34px",
    spacing: 4,
    px: 3,
    py: 4,
    isMobile: true,
  },
};
