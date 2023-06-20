import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import {
  RecommendedTelemedicinesBubble,
  RecommendedTelemedicinesBubbleProps,
  BubbleContainer,
  BubbleContainerProps,
} from "..";

export default {
  title: "Features / Chat / Recommended Telemedicines Bubble",
  component: RecommendedTelemedicinesBubble,
} as Meta;

type RecommendedTelemedicinesBubbleStory = StoryObj<
  RecommendedTelemedicinesBubbleProps & BubbleContainerProps
>;

export const DesktopRecommendedTelemedicinesBubbleSender: RecommendedTelemedicinesBubbleStory =
  {
    render: (args) => (
      <BubbleContainer {...args}>
        <RecommendedTelemedicinesBubble {...args} />
      </BubbleContainer>
    ),
    args: {
      isMobile: false,
      type: "sender",
      recommendTelemedicines: [
        {
          doctorImgSrc:
            "https://s3.ap-southeast-1.amazonaws.com/static.sehatq.com/telemed/profile/telemedregularchatphoto.jpg",
          doctorName: "drg. Aristy Riyanti, Sp.Ort",
          doctorSlug: "aristy",
          specialityName: "Dokter Gigi",
          hospitalName: "Klinik Gigi Sehat Margonda",
          ratingAverage: 4.6,
          ratingTotal: 16,
          experience: "8 Tahun",
          doctorRecommendationId: 378,
        },
        {
          doctorImgSrc:
            "https://s3.ap-southeast-1.amazonaws.com/static.sehatq.com/telemed/profile/telemedregularchatphoto.jpg",
          doctorName: "Uci Pitra Ariesta Shinta Dewi Sp.M",
          doctorSlug: "pitra-ariesta",
          specialityName: "Dokter Mata",
          hospitalName: "Eka Hospital Pekanbaru",
          ratingAverage: 3.2,
          ratingTotal: 39,
          experience: "5 Tahun",
          doctorRecommendationId: 377,
        },
      ],
    },
  };

export const MobileRecommendedTelemedicinesBubbleSender: RecommendedTelemedicinesBubbleStory =
  {
    ...DesktopRecommendedTelemedicinesBubbleSender,
    args: {
      ...DesktopRecommendedTelemedicinesBubbleSender.args,
      isMobile: true,
    },
  };
