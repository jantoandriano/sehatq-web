import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { MyMentalRecordCardProps, MyMentalRecordCard } from "..";
import { Box } from "../../../user-interfaces";

export default {
  title: "Features / My Health Record / My Mental Record Card",
  component: MyMentalRecordCard,
} as Meta;

type MyMentalRecordCardStory = StoryObj<MyMentalRecordCardProps>;

export const Desktop: MyMentalRecordCardStory = {
  render: (args) => (
    <Box width="720px">
      <MyMentalRecordCard {...args} />
    </Box>
  ),
  args: {
    createdAt: "12 Mei, 13.15",
    diagnosisName: "Depresi Minimal",
    description: "Kamu belum membutuhkan perawatan",
    userId: "947",
    mentalId: "16",
  },
};

export const Mobile: MyMentalRecordCardStory = {
  render: (args) => (
    <Box width="328px">
      <MyMentalRecordCard {...args} />
    </Box>
  ),
  args: {
    ...Desktop.args,
    isMobile: true,
  },
};
