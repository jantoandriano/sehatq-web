import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import { ClinicProduct, ClinicProductProps } from "../clinic-product";

export default {
  title: "Features / Landing Page / Clinic Product",
  component: ClinicProduct,
} as Meta;

type ClinicProductStory = StoryObj<ClinicProductProps>;

const clinicProductArgs: Omit<ClinicProductProps, "isMobile"> = {
  sortBy: "bestseller",
  categorySlug: "ibu-bayi",
  productsNavigation: {
    name: "EXTERNAL_CATEGORY",
    query: { slugUrl: "ibu-bayi" },
  },
};

export const Desktop: ClinicProductStory = {
  render: (args) => (
    <Box width="1160px">
      <ClinicProduct {...args} />
    </Box>
  ),
  args: {
    isMobile: false,
    ...clinicProductArgs,
  },
};

export const Mobile: ClinicProductStory = {
  render: (args) => (
    <Box width="360px">
      <ClinicProduct {...args} />
    </Box>
  ),
  args: {
    isMobile: true,
    ...clinicProductArgs,
  },
};
