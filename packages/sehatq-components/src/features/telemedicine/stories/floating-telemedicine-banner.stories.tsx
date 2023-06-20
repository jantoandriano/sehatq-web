import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import {
  FloatingTelemedicineBanner,
  FloatingTelemedicineBannerProps,
} from "../floating-telemedicine-banner";

export default {
  title: "Features / Chat / Floating Banner",
  component: FloatingTelemedicineBanner,
} as Meta;

type FloatingTelemedicineBannerStory =
  StoryObj<FloatingTelemedicineBannerProps>;

export const Basic: FloatingTelemedicineBannerStory = {
  render: (args) => <FloatingTelemedicineBanner {...args} />,
  args: {
    bottom: "100px",
    right: "30px",
  },
};
