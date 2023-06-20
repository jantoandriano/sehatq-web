import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import {
  MyMedicalRecordCardProps,
  MyMedicalRecordCard,
} from "../my-medical-record-card";
import { Box } from "../../../user-interfaces";

export default {
  title: "Features / Profile / My Medical Record Card",
  component: MyMedicalRecordCard,
} as Meta;

type MyMedicalRecordCardStory = StoryObj<MyMedicalRecordCardProps>;

export const Desktop: MyMedicalRecordCardStory = {
  render: (args) => (
    <Box width="320px" background="white" p={4}>
      <MyMedicalRecordCard {...args} />
    </Box>
  ),
  args: {
    textLabel: "Ayo Cek Kesehatanmu Secara Rutin",
  },
};

export const Mobile: MyMedicalRecordCardStory = {
  ...Desktop,
  args: {
    ...Desktop.args,
    isMobile: true,
  },
};
