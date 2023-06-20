import React from "react";
import { useAssets } from "@sehatq/utils";

import {
  Text,
  Modal,
  ModalBody,
  ModalHeader,
  ModalContent,
  ModalOverlay,
  ModalCloseButton,
  HStack,
  VStack,
  Image,
  Button,
  Divider,
} from "../../user-interfaces";
import { Consultation } from "./consultation-model";

export type DoctorNotePopupDesktopProps = {
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

export function DoctorNotePopupDesktop(props: DoctorNotePopupDesktopProps) {
  const { isOpen, isDownloading, onClose, consultation, downloadDoctorNote } =
    props;

  const ASSETS = useAssets(["SEHATQ_WITH_TEXT"]);
  return consultation ? (
    <>
      <Modal size="2xl" isOpen={isOpen} onClose={onClose} trapFocus={false}>
        <ModalOverlay />
        <ModalContent borderRadius="xl" width="632px">
          <ModalCloseButton h={6} w={6} top="3" color="brownGrey.500" />
          <ModalHeader fontFamily="poppins" paddingBottom={0} paddingTop={9}>
            Catatan Dokter
          </ModalHeader>
          <ModalBody paddingX={6} paddingBottom={6} paddingTop={4}>
            <HStack
              justify="space-between"
              borderRadius="base"
              background="paleBlue.500"
              px={5}
              py={3.5}
            >
              <Text fontWeight="semibold" fontSize="xs">
                {consultation.startedAt}
              </Text>
              <Text fontSize="xs">Durasi {consultation.duration} Menit</Text>
            </HStack>
            <HStack justify="space-between" my={4}>
              <Image
                alt="sehatq logo"
                src={ASSETS.SEHATQ_WITH_TEXT}
                width={164}
                layout="fixed"
                wrapperProps={{
                  marginBottom: "30px",
                }}
              />
              <Button
                isLoading={isDownloading}
                variant="solid"
                colorScheme="main"
                onClick={downloadDoctorNote}
              >
                Simpan sebagai PDF
              </Button>
            </HStack>
            <Divider borderColor="veryLightPink" border="solid 0.5px" />
            <HStack align="flex-start" mt={5}>
              <VStack spacing={3} align="flex-start" flex="1">
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
              </VStack>
              <VStack spacing={3} align="flex-start" flex="1">
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
            </HStack>
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
        value.map((icds) => (
          <HStack key={icds.code} spacing={3}>
            <Text fontSize="sm">{icds.code}</Text>
            <Text fontSize="sm">{icds.disease}</Text>
          </HStack>
        ))
      ) : (
        <Text fontSize="sm">-</Text>
      )}
    </VStack>
  );
}
