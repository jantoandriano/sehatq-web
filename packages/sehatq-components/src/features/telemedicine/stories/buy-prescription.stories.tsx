import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Button, useDisclosure } from "../../../user-interfaces";
import { BuyPrescriptionPopup, BuyPrescriptionPopupProps } from "..";

export default {
  title: "Features / Telemedicine / Buy Prescription",
  component: BuyPrescriptionPopup,
} as Meta;

type BuyPrescriptionPopupStory = StoryObj<BuyPrescriptionPopupProps>;

function Wrapper(props: BuyPrescriptionPopupProps) {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const otherProps = {
    ...props,
    isOpen,
    onClose,
    onOpen,
  };
  return (
    <>
      <Button onClick={onOpen}>Click Me</Button>
      <BuyPrescriptionPopup {...otherProps} />
    </>
  );
}

export const Desktop: BuyPrescriptionPopupStory = {
  render: (args) => <Wrapper {...args} />,
  args: {
    consultationId: "12975",
  },
};

export const Mobile: BuyPrescriptionPopupStory = {
  ...Desktop,
  args: {
    ...Desktop.args,
    isMobile: true,
  },
};
