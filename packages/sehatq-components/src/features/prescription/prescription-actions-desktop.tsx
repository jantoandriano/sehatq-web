import React from "react";
import { useNavigation } from "@sehatq/utils";
import {
  Button,
  Link,
  SimpleGrid,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  ModalCloseButton,
  VStack,
  Text,
} from "../../user-interfaces";

export type PrescriptionActionsDesktopProps = {
  doctorSlug: string | null;
  consultationId: number | null;
  channel: {
    id: number;
    name: string;
    code:
      | "ConsultationBooking"
      | "ConsultationPublic"
      | "ConsultationPrivate"
      | "ConsultationApp";
  } | null;
  createPrescriptionCart: () => void;
  isCreatingPrescriptionCart: boolean;
  recreatePrescription: () => void;
  isRecreatingPrescription: boolean;
  status: "created" | "approved" | "expired" | "request_expired" | "rejected";
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export function PrescriptionActionsDesktop(
  props: PrescriptionActionsDesktopProps
) {
  const {
    doctorSlug,
    status,
    consultationId,
    channel,
    createPrescriptionCart,
    isCreatingPrescriptionCart,
    recreatePrescription,
    isRecreatingPrescription,
    isOpen,
    onOpen,
    onClose,
  } = props;
  const { Navigate } = useNavigation();
  if (status === "created") {
    return (
      <Navigate
        name="PRESCRIPTION_FORM"
        query={consultationId ? { consultationId } : undefined}
      >
        <Link variant="solid" colorScheme="main" width="full">
          Lanjut Tebus Resep
        </Link>
      </Navigate>
    );
  }
  if (status === "approved") {
    return (
      <Button
        isFullWidth
        onClick={createPrescriptionCart}
        isLoading={isCreatingPrescriptionCart}
      >
        Tebus Sekarang
      </Button>
    );
  }
  if (status === "expired") {
    return consultationId && channel ? (
      <ChatUlangResep doctorSlug={doctorSlug} channel={channel} />
    ) : (
      <UploadUlangResep />
    );
  }
  if (status === "request_expired") {
    return consultationId ? (
      <TebusUlangResep
        recreatePrescription={recreatePrescription}
        isRecreatingPrescription={isRecreatingPrescription}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
      />
    ) : (
      <UploadUlangResep />
    );
  }
  return (
    <SimpleGrid columns={2} spacing={3} w="100%">
      <Navigate name="PRESCRIPTION_FORM">
        <Link width="full" variant="outline">
          Upload Ulang
        </Link>
      </Navigate>
      <Navigate name="TELEMEDICINES">
        <Link variant="solid" colorScheme="main" width="full">
          Chat Dokter
        </Link>
      </Navigate>
    </SimpleGrid>
  );
}

function UploadUlangResep() {
  const { Navigate } = useNavigation();
  return (
    <Navigate name="PRESCRIPTION_FORM">
      <Link variant="solid" colorScheme="main" width="full">
        Upload Ulang Resep
      </Link>
    </Navigate>
  );
}

export type ChatUlangResepProps = {
  doctorSlug: string | null;
  channel: {
    id: number;
    name: string;
    code:
      | "ConsultationBooking"
      | "ConsultationPublic"
      | "ConsultationPrivate"
      | "ConsultationApp";
  };
};

function ChatUlangResep(props: ChatUlangResepProps) {
  const { Navigate } = useNavigation();
  const { doctorSlug, channel } = props;
  return (
    <>
      {channel.code === "ConsultationPrivate" ||
      channel.code === "ConsultationBooking" ? (
        <Navigate name="TELEMED_HCP_PROFILE" query={{ slug: doctorSlug }}>
          <Link variant="solid" colorScheme="main" width="full">
            Chat Ulang Dokter
          </Link>
        </Navigate>
      ) : (
        channel.code === "ConsultationPublic" && (
          <Navigate name="TELEMED_GENERAL_CHAT_FORM">
            <Link variant="solid" colorScheme="main" width="full">
              Chat Ulang Dokter
            </Link>
          </Navigate>
        )
      )}
    </>
  );
}

export type TebusUlangResepProps = {
  recreatePrescription: () => void;
  isRecreatingPrescription: boolean;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

function TebusUlangResep(props: TebusUlangResepProps) {
  const {
    recreatePrescription,
    isRecreatingPrescription,
    isOpen,
    onOpen,
    onClose,
  } = props;
  return (
    <>
      <Button isFullWidth onClick={onOpen}>
        Tebus Ulang Resep
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="md" trapFocus={false}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton boxSize={4} top="3" color="charcoalGrey" />
          <ModalBody padding={5}>
            <VStack spacing={4} width="full" mt={2}>
              <Text
                color="charcoalGrey"
                fontSize="md"
                fontFamily="poppins"
                fontWeight="semibold"
                width="full"
                lineHeight="7"
                textAlign="center"
              >
                Mau tebus ulang resep ini?
              </Text>
              <Button
                isFullWidth
                variant="solid"
                colorScheme="main"
                fontSize="sm"
                fontWeight="semibold"
                height="38px"
                borderRadius="base"
                onClick={recreatePrescription}
                isLoading={isRecreatingPrescription}
              >
                Ya, tebus ulang
              </Button>
              <Button
                isFullWidth
                variant="fit"
                fontWeight="semibold"
                color="sea.500"
                fontSize="sm"
                height="38px"
                onClick={onClose}
              >
                Tidak
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
