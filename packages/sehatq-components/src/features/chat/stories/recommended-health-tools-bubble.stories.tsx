import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import {
  RecommendedHealthToolsBubble,
  RecommendedHealthToolsBubbleProps,
  BubbleContainer,
  BubbleContainerProps,
} from "..";

export default {
  title: "Features / Chat / Recommended Health Tools Bubble",
  component: RecommendedHealthToolsBubble,
} as Meta;

type RecommendedHealthToolsBubbleStory = StoryObj<
  RecommendedHealthToolsBubbleProps & BubbleContainerProps
>;

export const DesktopRecommendedHealthToolsBubbleSender: RecommendedHealthToolsBubbleStory =
  {
    render: (args) => (
      <BubbleContainer {...args}>
        <RecommendedHealthToolsBubble {...args} />
      </BubbleContainer>
    ),
    args: {
      isMobile: false,
      type: "sender",
      recommendHealthTools: [
        {
          id: 3,
          iconSrc:
            "https://static.sehatq.com/healthtools/icon/TK_ResikoJantung@4x.png",
          iconUrl:
            "https://www.sehatq.com/tes-kesehatan/cek-risiko-penyakit-jantung",
          title: "Cek Risiko Penyakit Jantung",
        },
        {
          id: 2,
          iconSrc:
            "https://static.sehatq.com/healthtools/icon/TK_ResikoDiabet@4x.png",
          iconUrl: "https://www.sehatq.com/tes-kesehatan/cek-risiko-diabetes",
          title: "Cek Risiko Diabetes",
        },
      ],
    },
  };

export const MobileRecommendedHealthToolsBubbleSender: RecommendedHealthToolsBubbleStory =
  {
    ...DesktopRecommendedHealthToolsBubbleSender,
    args: {
      ...DesktopRecommendedHealthToolsBubbleSender.args,
      isMobile: true,
    },
  };
