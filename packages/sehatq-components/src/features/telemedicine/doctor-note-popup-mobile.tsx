import React from "react";
import { useAssets } from "@sehatq/utils";

import {
  Text,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  HStack,
  VStack,
  Image,
  Button,
  Divider,
  Box,
  Flex,
  IconButton,
  ArrowBackIcon,
} from "../../user-interfaces";
import { Consultation } from "./consultation-model";

export type DoctorNotePopupMobileProps = {
  isOpen: boolean;
  onClose: () => void;
  isDownloading: boolean;
  downloadDoctorNote: () => void;
  consultation?: { patientName: string } & Pick<
    Consultation,
    | "id"
    | "doctor"
    | "duration"
    | "startedAt"
    | "doctorNote"
    | "consultationDate"
  >;
};

export function DoctorNotePopupMobile(props: DoctorNotePopupMobileProps) {
  const { isOpen, isDownloading, onClose, consultation, downloadDoctorNote } =
    props;

  const ASSETS = useAssets(["SEHATQ_WITH_TEXT"]);
  return consultation ? (
    <>
      <Modal size="full" isOpen={isOpen} onClose={onClose} trapFocus={false}>
        <ModalOverlay />
        <ModalContent borderRadius="none">
          <ModalBody p={0} background="iceBlue.500">
            <Flex
              p={2}
              align="center"
              background="white"
              position="sticky"
              zIndex="docked"
              top={0}
              left={0}
              boxShadow="base"
            >
              <IconButton
                variant="fit"
                onClick={onClose}
                aria-label="back icon"
                icon={
                  <ArrowBackIcon width="28px" height="28px" colot="sea.500" />
                }
              />
              <Text
                marginLeft={2}
                fontFamily="poppins"
                fontSize="md"
                fontWeight="semibold"
              >
                Catatan Dokter
              </Text>
            </Flex>
            <Flex
              px={4}
              py={1.5}
              align="center"
              justify="space-between"
              background="paleBlue.500"
            >
              <Text fontSize="xs">{consultation.startedAt}</Text>
              <Text fontSize="xs">Durasi {consultation.duration} Menit</Text>
            </Flex>
            <Text
              marginRight={2}
              fontFamily="poppins"
              fontWeight="semibold"
              marginX={4}
              marginTop={4}
              marginBottom={3}
            >
              Catatan Dokter
            </Text>
            <Box
              borderRadius="lg"
              boxShadow="base"
              background="white"
              paddingX={5}
              paddingY={4}
              marginX={4}
              marginBottom={4}
            >
              <Image
                alt="sehatq logo"
                src={ASSETS.SEHATQ_WITH_TEXT}
                width={118}
                layout="fixed"
                wrapperProps={{
                  marginBottom: "30px",
                }}
              />
              <Divider
                my={4}
                borderColor="veryLightPink"
                border="solid 0.5px"
              />
              <VStack spacing={3} align="flex-start">
                <PatientInfoItem
                  label="Nama Pasien"
                  value={consultation.patientName}
                />
                <PatientInfoItem
                  label="Nama Dokter"
                  value={consultation.doctor?.name}
                />
                <PatientInfoItem
                  label="No. SIP"
                  value={consultation.doctor?.sip}
                />
                <PatientInfoItem
                  label="Tempat Praktik"
                  value={consultation.doctor?.hospital?.name}
                />
                <PatientInfoItem
                  label="Tanggal Konsultasi"
                  value={consultation.consultationDate}
                />
                <PatientInfoItem
                  label="ID Konsultasi"
                  value={consultation.id}
                />
                <PatientInfoItem
                  label="Keluhan"
                  value={consultation.doctorNote?.complaint}
                />
                <PatientInfoItem
                  label="Diagnosa"
                  value={consultation.doctorNote?.icds}
                />
                <PatientInfoItem
                  label="Tindakan"
                  value={consultation.doctorNote?.action}
                />
                {consultation.doctorNote?.note ? (
                  <PatientInfoItem
                    label="Catatan"
                    value={consultation.doctorNote.note}
                  />
                ) : null}
              </VStack>
            </Box>
            <Box
              padding={4}
              background="white"
              position="sticky"
              bottom={0}
              left={0}
              boxShadow="base"
            >
              <Button
                isFullWidth
                variant="solid"
                colorScheme="main"
                isLoading={isDownloading}
                onClick={downloadDoctorNote}
              >
                Simpan sebagai PDF
              </Button>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  ) : null;
}

type ICDSProps = {
  code: string;
  disease: string;
};

type PatientInfoItemProps = {
  label: string;
  value?: number | string | ICDSProps[];
};

function PatientInfoItem(props: PatientInfoItemProps) {
  const { label, value } = props;
  return (
    <VStack spacing={1} align="flex-start">
      <Text fontFamily="poppins" fontWeight="semibold" fontSize="xs">
        {label}
      </Text>
      {typeof value === "string" || typeof value === "number" ? (
        <Text fontSize="sm">{value || "-"}</Text>
      ) : typeof value === "object" && value.length > 0 ? (
        <Box>
          {value.map((icds) => (
            <HStack key={icds.code} spacing={3}>
              <Text fontSize="sm">{icds?.code}</Text>
              <Text fontSize="sm">{icds?.disease}</Text>
            </HStack>
          ))}
        </Box>
      ) : (
        <Text fontSize="sm">-</Text>
      )}
    </VStack>
  );
}
