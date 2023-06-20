import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import {
  PediatricClinicInfoSkeleton,
  PediatricClinicInfoSkeletonProps,
} from "../pediatric-clinic-info";

export default {
  title: "Features / Landing Page / Pediatric Clinic Info Skeleton",
  component: PediatricClinicInfoSkeleton,
} as Meta;

type PediatricClinicInfoSkeletonStory =
  StoryObj<PediatricClinicInfoSkeletonProps>;

export const Desktop: PediatricClinicInfoSkeletonStory = {
  render: (args) => (
    <Box width="1160px">
      <PediatricClinicInfoSkeleton {...args} />
    </Box>
  ),
};

export const Mobile: PediatricClinicInfoSkeletonStory = {
  render: (args) => (
    <Box width="360px">
      <PediatricClinicInfoSkeleton {...args} isMobile />
    </Box>
  ),
};
