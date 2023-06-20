import React from "react";
import {
  HStack,
  Text,
  ChevronRightIcon,
  Button,
  ReplyDoctorNoteIcon,
} from "../../user-interfaces";
import { DoctorNotePopup } from "../telemedicine";

export type DoctorNoteBubbleDesktopProps = {
  consultationId?: string;
  doctorNotePopup: {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
  };
};

export function DoctorNoteBubbleDesktop(props: DoctorNoteBubbleDesktopProps) {
  const { consultationId, doctorNotePopup } = props;

  return (
    <>
      <Button
        isFullWidth
        rightIcon={<ChevronRightIcon color="charcoalGrey" boxSize={5} />}
        variant="fit"
        color="charcoalGrey"
        justifyContent="space-between"
        borderRadius="lg"
        boxShadow="base"
        minW="260px"
        onClick={doctorNotePopup.onOpen}
        p={3}
      >
        <HStack spacing={2.5}>
          <ReplyDoctorNoteIcon boxSize="24px" />
          <Text
            fontSize="sm"
            color="charcoalGrey"
            fontWeight="semibold"
            lineHeight="6"
          >
            Catatan Dokter
          </Text>
        </HStack>
      </Button>
      {consultationId && (
        <DoctorNotePopup consultationId={consultationId} {...doctorNotePopup} />
      )}
    </>
  );
}
