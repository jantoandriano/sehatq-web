import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Flex } from "../../../user-interfaces";
import {
  SimpleHealthCareProfessionalCard,
  SimpleHealthCareProfessionalCardProps,
  SimpleHealthCareProfessionalCardSkeleton,
} from "..";
export default {
  title:
    "Features / Health Care Professional / Simple Health Care Professional Card",
  component: SimpleHealthCareProfessionalCard,
} as Meta;

type HealthCareProfessionalCardStory =
  StoryObj<SimpleHealthCareProfessionalCardProps>;

const defaultArgs = {
  doctorName: "dr. Adriandi, Sp.M",
  doctorSlug: "dr-adriandi-spm",
  speciality: "Psikolog",
  hcfName: "RS Jiwa Dharmawangsa",
  hcfAddress: "Kebayoran Baru, Jakarta Selatan",
  imageUrl:
    "https://cms.sehatq.com/cdn-cgi/image/f=auto,width=96,fit=pad,background=white,quality=100/public/img/doctor_img/dr-rani-indira-sari-sp-m.jpg",
  imageAlt: "test",
};

export const Desktop: HealthCareProfessionalCardStory = {
  render: (args) => (
    <Flex width="760px">
      <SimpleHealthCareProfessionalCard {...args} />
      <SimpleHealthCareProfessionalCardSkeleton />
    </Flex>
  ),
  args: { ...defaultArgs },
};

export const Mobile: HealthCareProfessionalCardStory = {
  render: (args) => (
    <Flex width="760px">
      <SimpleHealthCareProfessionalCard {...args} isMobile />
      <SimpleHealthCareProfessionalCardSkeleton isMobile />
    </Flex>
  ),
  args: { ...defaultArgs },
};
