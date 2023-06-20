import React from "react";
import { useAssets } from "@sehatq/utils";
import {
  Text,
  Skeleton,
  Button,
  Box,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  SehatQDownloadIcon,
  VStack,
  HStack,
  ChevronUpIcon,
  useImage,
  useDisclosure,
} from "../../user-interfaces";
import { GoToPrescriptionDetail } from "../prescription";
import { DoctorNotePopup } from "./doctor-note-popup";

export type DoctorDocumentMobileProps = {
  hasPrescription?: boolean;
  consultationId: string;
  hasDoctorNote?: boolean;
  doctorNotePopup: {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
  };
};

export function DoctorDocumentMobile(props: DoctorDocumentMobileProps) {
  const Image = useImage();
  const ASSETS = useAssets(["DOCTOR_NOTE_BLUE"]);
  const { onOpen, onClose, isOpen } = useDisclosure();
  const { hasPrescription, consultationId, hasDoctorNote, doctorNotePopup } =
    props;
  return (
    <>
      <Button
        isFullWidth
        variant="fit"
        color="sea.500"
        onClick={onOpen}
        boxShadow="base"
        borderRadius="xl"
        rightIcon={<ChevronUpIcon color="charcoalGrey" boxSize={6} />}
        justifyContent="space-between"
        height="52px"
        background="white"
        padding={4}
      >
        <Text color="charcoalGrey" fontSize="sm" lineHeight="5">
          Lihat{" "}
          <Text
            as="span"
            borderRadius="full"
            background="sea.500"
            px={1}
            fontSize="xs"
            textAlign="center"
            align="center"
            color="white"
          >
            {hasPrescription && hasDoctorNote
              ? 2
              : (hasPrescription || hasDoctorNote) && 1}
          </Text>{" "}
          Dokumen dari Dokter
        </Text>
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="bottom"
        onClose={onClose}
        trapFocus={false}
      >
        <DrawerOverlay>
          <DrawerContent borderTopRadius="lg">
            <DrawerBody px={4} py={5}>
              <Text
                fontFamily="poppins"
                fontWeight="semibold"
                fontSize="md"
                lineHeight="7"
                mb={4}
              >
                Dokumen Dari Dokter
              </Text>
              <VStack spacing={3} align="flex-start">
                {hasPrescription && (
                  <Box
                    boxShadow="base"
                    borderRadius="xl"
                    px={4}
                    py={6}
                    width="full"
                  >
                    <GoToPrescriptionDetail
                      isMobile
                      consultationId={consultationId}
                    />
                  </Box>
                )}
                {hasDoctorNote && (
                  <Box
                    boxShadow="base"
                    borderRadius="xl"
                    px={4}
                    py={6}
                    width="full"
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
                      isMobile
                      consultationId={consultationId}
                      {...doctorNotePopup}
                    />
                  </Box>
                )}
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
}

export function DoctorDocumentSkeletonMobile() {
  return (
    <Box p={4} boxShadow="base" borderRadius="xl" background="white">
      <Skeleton width="full" height="24px" />
    </Box>
  );
}
