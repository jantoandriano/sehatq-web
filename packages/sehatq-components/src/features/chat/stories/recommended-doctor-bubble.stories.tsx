import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import {
  RecommendedDoctorBubble,
  RecommendedDoctorBubbleProps,
  BubbleContainer,
  BubbleContainerProps,
} from "..";

export default {
  title: "Features / Chat / Recommended Doctor Bubble",
  component: RecommendedDoctorBubble,
} as Meta;

type RecommendedDoctorBubbleStory = StoryObj<
  RecommendedDoctorBubbleProps & BubbleContainerProps
>;

export const DesktopRecommendedDoctorBubbleSender: RecommendedDoctorBubbleStory =
  {
    render: (args) => (
      <BubbleContainer {...args}>
        <RecommendedDoctorBubble {...args} />
      </BubbleContainer>
    ),
    args: {
      isMobile: false,
      type: "sender",
      recommendDoctors: [
        {
          doctorImgSrc:
            "https://s3.ap-southeast-1.amazonaws.com/static.sehatq.com/telemed/profile/telemedregularchatphoto.jpg",
          doctorName: "Prof.dr.Zubairi Djoerban Sp.PD-KHOM",
          doctorId: 1723,
          specialityName: "Dokter Penyakit Dalam",
          hospitalName: "Pertamina Cirebon",
          scheduleDay: "Sabtu, 27 Februari 2022",
          scheduleTime: "16.00 WIB - Selesai",
        },
        {
          doctorImgSrc:
            "https://s3.ap-southeast-1.amazonaws.com/static.sehatq.com/telemed/profile/telemedregularchatphoto.jpg",
          doctorName: "Dasril Daud Sp.A(K)",
          doctorId: 1713,
          specialityName: "Dokter Onkologi",
          hospitalName: "Eka Hospital BSD",
          scheduleDay: "Sabtu, 27 Februari 2022",
          scheduleTime: "16.00 WIB - Selesai",
        },
      ],
    },
  };

export const MobileRecommendedDoctorBubbleSender: RecommendedDoctorBubbleStory =
  {
    ...DesktopRecommendedDoctorBubbleSender,
    args: {
      ...DesktopRecommendedDoctorBubbleSender.args,
      isMobile: true,
    },
  };
