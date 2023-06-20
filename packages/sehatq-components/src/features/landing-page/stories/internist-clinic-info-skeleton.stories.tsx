import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import {
  InternistClinicInfoSkeleton,
  InternistClinicInfoSkeletonProps,
} from "../internist-clinic-info";

export default {
  title: "Features / Landing Page / Internist Clinic Info Skeleton",
  component: InternistClinicInfoSkeleton,
} as Meta;

type InternistClinicInfoSkeletonStory =
  StoryObj<InternistClinicInfoSkeletonProps>;

export const Desktop: InternistClinicInfoSkeletonStory = {
  render: (args) => (
    <Box width="1160px">
      <InternistClinicInfoSkeleton {...args} />
    </Box>
  ),
};

export const Mobile: InternistClinicInfoSkeletonStory = {
  render: (args) => (
    <Box width="360px">
      <InternistClinicInfoSkeleton {...args} isMobile />
    </Box>
  ),
};
