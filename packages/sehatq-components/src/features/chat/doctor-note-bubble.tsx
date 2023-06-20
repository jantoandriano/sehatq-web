import React from "react";
import { useDisclosure } from "../../user-interfaces";
import { DoctorNoteBubbleDesktop } from "./doctor-note-bubble-desktop";
import { DoctorNoteBubbleMobile } from "./doctor-note-bubble-mobile";

export type DoctorNoteBubbleProps = {
  isMobile?: boolean;
  consultationId?: string;
};

export function DoctorNoteBubble(props: DoctorNoteBubbleProps) {
  const { isMobile, consultationId } = props;
  const doctorNotePopup = useDisclosure();

  const otherProps = {
    consultationId,
    doctorNotePopup,
  };

  if (isMobile) {
    return <DoctorNoteBubbleMobile {...otherProps} />;
  }

  return <DoctorNoteBubbleDesktop {...otherProps} />;
}
