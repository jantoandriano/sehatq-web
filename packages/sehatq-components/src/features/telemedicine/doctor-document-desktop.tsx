import React from "react";
import { useAssets } from "@sehatq/utils";
import {
  Flex,
  HStack,
  Skeleton,
  Text,
  SehatQDownloadIcon,
  Button,
  useImage,
  VStack,
  Box,
} from "../../user-interfaces";
import { GoToPrescriptionDetail } from "../prescription";
import { DoctorNotePopup } from "./doctor-note-popup";

export type DoctorDocumentDesktopProps = {
  hasPrescription?: boolean;
  consultationId: string;
  hasDoctorNote?: boolean;
  doctorNotePopup: {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
  };
};

export function DoctorDocumentDesktop(props: DoctorDocumentDesktopProps) {
  const Image = useImage();
  const ASSETS = useAssets(["DOCTOR_NOTE_BLUE"]);
  const { hasPrescription, consultationId, hasDoctorNote, doctorNotePopup } =
    props;
  return (
    <Flex
      direction="column"
      justify="space-between"
      background="white"
      borderRadius="lg"
      boxShadow="base"
      py={4}
      px={3}
    >
      <Text
        color="charcoalGrey"
        fontSize="md"
        lineHeight="5"
        fontWeight="semibold"
        fontFamily="poppins"
      >
        Dokumen dari Dokter
      </Text>
      <VStack spacing={4} pt={4}>
        {hasPrescription && (
          <GoToPrescriptionDetail consultationId={consultationId} />
        )}
        {hasDoctorNote && (
          <Box
            borderTop="0.5px solid"
            borderColor="veryLightPink"
            width="full"
            pt={3}
          >
            <Button
              isFullWidth
              rightIcon={
                <SehatQDownloadIcon color="charcoalGrey" boxSize={6} />
              }
              variant="fit"
              color="charcoalGrey"
              justifyContent="space-between"
              onClick={doctorNotePopup.onOpen}
              height="24px"
              p={0}
            >
              <HStack>
                <Image
                  src={ASSETS.DOCTOR_NOTE_BLUE}
                  alt="Doctor Note"
                  width={24}
                  height={24}
                  layout="fixed"
                  priority
                />
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
            <DoctorNotePopup
              consultationId={consultationId}
              {...doctorNotePopup}
            />
          </Box>
        )}
      </VStack>
    </Flex>
  );
}

export function DoctorDocumentSkeletonDesktop() {
  return (
    <Flex
      direction="column"
      justify="space-between"
      background="white"
      borderRadius="lg"
      boxShadow="base"
      py={4}
      px={3}
    >
      <Text
        color="charcoalGrey"
        fontSize="md"
        lineHeight="5"
        fontWeight="semibold"
        fontFamily="poppins"
      >
        Dokumen dari Dokter
      </Text>
      <VStack spacing={4} pt={4}>
        <Skeleton width="full" height="24px" />
      </VStack>
    </Flex>
  );
}
