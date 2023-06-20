import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import { DoctorDocument, DoctorDocumentProps } from "..";

export default {
  title: "Features / Telemedicine / Doctor Document",
  component: DoctorDocument,
} as Meta;

type DoctorDocumentStory = StoryObj<DoctorDocumentProps>;

export const Desktop: DoctorDocumentStory = {
  render: (args) => (
    <Box width="300px">
      <DoctorDocument {...args} />
    </Box>
  ),
  args: {
    consultationId: "15247",
  },
};

export const Mobile: DoctorDocumentStory = {
  render: (args) => (
    <Box width="328px">
      <DoctorDocument {...args} />
    </Box>
  ),
  args: {
    ...Desktop.args,
    isMobile: true,
  },
};
