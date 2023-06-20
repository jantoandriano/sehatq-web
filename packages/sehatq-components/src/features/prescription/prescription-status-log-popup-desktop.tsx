import React from "react";
import { formatDate, parseToDate } from "@sehatq/utils";
import {
  Text,
  Modal,
  ModalOverlay,
  ModalBody,
  ModalContent,
  ModalHeader,
  Skeleton,
  ModalCloseButton,
  Button,
  Box,
  Flex,
} from "../../user-interfaces";
import { TimelineUI } from "../general";
import {
  PrescriptionStatusCode,
  PRESCRIPTION_STATUS,
} from "./prescription-constant";

export type PrescriptionStatusLogPopupDesktopProps = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  prescriptionHistories?: {
    id: number;
    status: PrescriptionStatusCode;
    histories: {
      id: string;
      name: string;
      createdAt: string;
    }[];
  };
};

export function PrescriptionStatusLogPopupDesktop(
  props: PrescriptionStatusLogPopupDesktopProps
) {
  const { onOpen, isOpen, onClose, prescriptionHistories } = props;
  return (
    <>
      <Button
        variant="fit"
        fontSize="xs"
        lineHeight="5"
        color="sea.500"
        fontWeight="semibold"
        onClick={onOpen}
      >
        Lihat Status
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="xl" trapFocus={false}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontFamily="poppins"
            fontWeight="semibold"
            fontSize="md"
            textAlign="center"
            borderBottom="1px solid"
            borderColor="veryLightPink"
          >
            Riwayat Status
          </ModalHeader>
          <ModalCloseButton
            boxSize={4}
            top="5"
            color="sea.500"
            fontWeight="semibold"
          />
          {prescriptionHistories && (
            <ModalBody p={6}>
              <Text fontSize="xs" lineHeight="4" color="brownGrey.500">
                Status Pesanan
              </Text>
              <Text
                fontSize="sm"
                fontWeight="semibold"
                lineHeight="5"
                color={
                  PRESCRIPTION_STATUS[prescriptionHistories.status].case ===
                  "positive"
                    ? "sea.500"
                    : "#D63B3B"
                }
                mt={0.5}
              >
                {PRESCRIPTION_STATUS[prescriptionHistories.status].name}
              </Text>
              <Box boxShadow="base" borderRadius="xl" p={4} mt={3}>
                <TimelineUI
                  isMobile={false}
                  color={
                    PRESCRIPTION_STATUS[prescriptionHistories.status].case ===
                    "positive"
                      ? "sea.500"
                      : "#D63B3B"
                  }
                  steps={prescriptionHistories.histories.map((step, i) => {
                    return {
                      id: step.id,
                      active: i === 0,
                      child: (
                        <Flex
                          flexDirection="column"
                          flexWrap="unset"
                          width="full"
                        >
                          <Text
                            fontSize="xs"
                            mb={1}
                            {...(i === 0 && {
                              fontWeight: "semibold",
                              mb: 1,
                              color:
                                PRESCRIPTION_STATUS[
                                  prescriptionHistories.status
                                ].case === "positive"
                                  ? "sea.500"
                                  : "#D63B3B",
                            })}
                            isTruncated
                            name={step.name}
                          >
                            {step.name}
                          </Text>
                          <Text
                            fontSize="xxs"
                            color="brownGrey.500"
                            {...(i <
                              prescriptionHistories.histories.length - 1 && {
                              borderBottom: "0.5px solid",
                              borderColor: "veryLightPink",
                              pb: "15.5px",
                            })}
                          >
                            {formatDate(
                              parseToDate(step.createdAt, "iso"),
                              "EEEE, dd MMMM yyyy, HH.mm 'WIB'"
                            )}
                          </Text>
                        </Flex>
                      ),
                    };
                  })}
                />
              </Box>
            </ModalBody>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export function PrescriptionStatusLogPopupSkeletonDesktop() {
  return (
    <>
      <Skeleton width="69px" height="20px" />
    </>
  );
}
