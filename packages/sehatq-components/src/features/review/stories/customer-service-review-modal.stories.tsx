import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box, useDisclosure } from "../../../user-interfaces";
import {
  CustomerServiceReviewModal,
  CustomerServiceReviewModalProps,
} from "..";

export default {
  title: "Features / Review / Customer Service Review",
  component: CustomerServiceReviewModal,
} as Meta;

type CustomerServiceReviewModalStory = StoryObj<
  CustomerServiceReviewModalProps & { defaultIsOpen: boolean }
>;

function Wraper(props: { isMobile?: boolean; defaultIsOpen: boolean }) {
  const { isOpen, onClose } = useDisclosure({
    defaultIsOpen: props.defaultIsOpen,
  });
  return (
    <CustomerServiceReviewModal
      {...props}
      isOpen={isOpen}
      onClose={onClose}
      bookingId="BSQ3461"
      onSuccessSubmit={console.log}
    />
  );
}
export const Desktop: CustomerServiceReviewModalStory = {
  render: (args) => (
    <Box width="1366px">
      <Wraper defaultIsOpen={args.defaultIsOpen} />
    </Box>
  ),
  args: {
    defaultIsOpen: true,
  },
};

export const Mobile: CustomerServiceReviewModalStory = {
  render: (args) => (
    <Box width="360px">
      <Wraper isMobile defaultIsOpen={args.defaultIsOpen} />
    </Box>
  ),
  args: {
    defaultIsOpen: true,
  },
};
