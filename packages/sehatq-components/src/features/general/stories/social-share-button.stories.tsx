import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Flex } from "../../../user-interfaces";
import { SocialShareButton, SocialShareButtonProps } from "..";

export default {
  title: "Features / General / Social Share Button",
  component: SocialShareButton,
} as Meta;

type SocialShareButtonStory = StoryObj<SocialShareButtonProps>;

export const Desktop: SocialShareButtonStory = {
  render: (args) => (
    <Flex width="760px" justifyContent="center">
      <SocialShareButton {...args} />
    </Flex>
  ),
  args: {
    shareUrl:
      "https://dev2.sehatq.com/artikel/hidup-sehat-apakah-menyiksa-jika-dijalankan-dengan-optimis",
    title: "Hidup Sehat apakah menyiksa jika dijalankan dengan Optimis?",
  },
};

export const Mobile: SocialShareButtonStory = {
  render: (args) => (
    <Flex width="360px" justifyContent="end">
      <SocialShareButton {...args} />
    </Flex>
  ),
  args: {
    ...Desktop.args,
    isMobile: true,
  },
};
