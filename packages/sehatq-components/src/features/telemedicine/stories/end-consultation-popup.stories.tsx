import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Button, useDisclosure } from "../../../user-interfaces";
import { EndConsultationPopup, EndConsultationPopupProps } from "..";

export default {
  title: "Features / Telemedicine / End Consultation Popup",
  component: EndConsultationPopup,
} as Meta;

type EndConsultationPopupStory = StoryObj<EndConsultationPopupProps>;

function Wrapper(props: EndConsultationPopupProps) {
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
      <EndConsultationPopup {...otherProps} />
    </>
  );
}

export const Desktop: EndConsultationPopupStory = {
  render: (args) => <Wrapper {...args} />,
  args: {
    consultationId: "12973",
    goToBuyPrescription: () => console.log("buy prescription"),
    goToRatingForm: () => console.log("rating form"),
  },
};

export const Mobile: EndConsultationPopupStory = {
  ...Desktop,
  args: {
    ...Desktop.args,
    isMobile: true,
  },
};
