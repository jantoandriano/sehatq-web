import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import {
  LinkBubble,
  LinkBubbleProps,
  BubbleContainer,
  BubbleContainerProps,
} from "..";

export default {
  title: "Features / Chat / Link Bubble",
  component: LinkBubble,
} as Meta;

type LinkBubbleStory = StoryObj<LinkBubbleProps & BubbleContainerProps>;

export const DesktopLinkBubbleSender: LinkBubbleStory = {
  render: (args) => (
    <BubbleContainer {...args}>
      <LinkBubble {...args} />
    </BubbleContainer>
  ),
  args: {
    isMobile: false,
    type: "sender",
    messageType: "link",
    metaData: {
      link: "https://cookpad.com/id/resep/2486550-sambal-bawang-rawit-ijo-simple",
      image: {
        url: "https://img-global.cpcdn.com/recipes/570d99842ab94560/680x482cq70/sambal-bawang-rawit-ijo-simple-foto-resep-utama.jpg",
        alt: "sambal bawang",
      },
      title: "Resep Sambal bawang rawit ijo simple oleh Nurul",
      description: "Lihat Selengkapnya",
    },
  },
};

export const MobileLinkBubbleSender: LinkBubbleStory = {
  ...DesktopLinkBubbleSender,
  args: {
    ...DesktopLinkBubbleSender.args,
    isMobile: true,
  },
};

export const DesktopLinkBubbleReceiver: LinkBubbleStory = {
  ...DesktopLinkBubbleSender,
  args: {
    isMobile: false,
    type: "receiver",
    messageType: "link",
    metaData: {
      link: "https://cookpad.com/id/resep/2486550-sambal-bawang-rawit-ijo-simple",
      image: {
        url: "https://img-global.cpcdn.com/recipes/570d99842ab94560/680x482cq70/sambal-bawang-rawit-ijo-simple-foto-resep-utama.jpg",
        alt: "sambal bawang",
      },
      title: "Resep Sambal bawang rawit ijo simple oleh Nurul",
      description: "Lihat Selengkapnya",
    },
  },
};

export const MobileLinkBubbleReceiver: LinkBubbleStory = {
  ...DesktopLinkBubbleSender,
  args: {
    ...DesktopLinkBubbleReceiver.args,
    isMobile: true,
  },
};
