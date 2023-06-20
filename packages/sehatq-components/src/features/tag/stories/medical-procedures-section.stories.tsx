import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import {
  MedicalProceduresSectionProps,
  MedicalProceduresSection,
} from "../medical-procedures-section";
import { Box } from "../../../user-interfaces";

export default {
  title: "Features / Tag / MedicalProcedures Section",
  component: MedicalProceduresSection,
} as Meta;

type MedicalProceduresSectionStory = StoryObj<MedicalProceduresSectionProps>;

export const Desktop: MedicalProceduresSectionStory = {
  render: (args) => (
    <Box width="352px">
      <MedicalProceduresSection {...args} />
    </Box>
  ),
  args: {
    tagSlug: "operasi-caesar",
  },
};

export const Mobile: MedicalProceduresSectionStory = {
  render: (args) => (
    <Box width="360px">
      <MedicalProceduresSection {...args} />
    </Box>
  ),
  args: {
    ...Desktop.args,
    isMobile: true,
  },
};
